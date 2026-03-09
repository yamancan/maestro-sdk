import {
  Connection,
  PublicKey,
  SystemProgram,
  AccountMeta,
  Transaction,
} from "@solana/web3.js";
import { Program, BN, utils } from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  findVaultPda,
  findVaultConfigPda,
  findGreenlistPda,
  findWhitelistPda,
  findBlacklistPda,
  findSessionKeyPda,
  findTrackerPda,
  findRecipientPolicyPda,
  findSwapPairPda,
  canonicalSortMints,
  currentDayEpoch,
} from "./pda";
import type {
  UpdateVaultConfigParams,
  ExecuteActionParams,
  Vault,
  VaultConfig,
  SessionKey,
  SpendingTracker,
  RecipientPolicy,
  SwapPairPolicy,
  ExecuteTransferParams,
} from "./types";
import type { AgentPolicyEngine } from "./idl_type";

// Re-export for convenience
export type { AgentPolicyEngine };

export interface RemainingAccountsOptions {
  tokenMint?: PublicKey;
  recipient?: PublicKey;
  /**
   * The recipient account PDA (RecipientPolicy or WhitelistEntry).
   * Use `resolveRecipientAccount()` to determine which one to pass.
   * If omitted, defaults to RecipientPolicy PDA derived from (vault, recipient).
   */
  recipientAccountPda?: PublicKey;
  /** Whether the recipient account needs write access (true for RecipientPolicy with daily limits). */
  recipientAccountWritable?: boolean;
  cosigned?: boolean;
  cpiAccounts: AccountMeta[];
}

export interface SwapRemainingAccountsOptions {
  inputMint: PublicKey;
  outputMint: PublicKey;
  /** When true, appends the SwapPairPolicy PDA after the greenlist checks. */
  includeSwapPairPolicy?: boolean;
  cpiAccounts: AccountMeta[];
}

export interface ExecuteSwapParams {
  instructionData: Buffer;
  usdcAmount: BN;
  inputMint: PublicKey;
  outputMint: PublicKey;
  minimumOutputAmount: BN;
}

/**
 * Build remaining_accounts array for execute_action / execute_action_cosigned.
 *
 * Order must match the Rust parser:
 * 1. If tokenMint -> [blacklist(vault, mint), greenlist(vault, mint)]
 * 2. If recipient && !cosigned -> [blacklist(vault, recipient), policyOrWhitelist]
 *    If recipient && cosigned  -> [blacklist(vault, recipient)]
 * 3. cpiAccounts appended
 *
 * Use `resolveRecipientAccount()` to determine which PDA to pass for the recipient slot.
 */
export function buildRemainingAccounts(
  vault: PublicKey,
  options: RemainingAccountsOptions
): AccountMeta[] {
  const accounts: AccountMeta[] = [];

  if (options.tokenMint) {
    const [tokenBlPda] = findBlacklistPda(vault, options.tokenMint);
    const [tokenGlPda] = findGreenlistPda(vault, options.tokenMint);
    accounts.push(
      { pubkey: tokenBlPda, isWritable: false, isSigner: false },
      { pubkey: tokenGlPda, isWritable: false, isSigner: false }
    );
  }

  if (options.recipient) {
    const [recipBlPda] = findBlacklistPda(vault, options.recipient);
    accounts.push({
      pubkey: recipBlPda,
      isWritable: false,
      isSigner: false,
    });

    if (!options.cosigned) {
      const pda =
        options.recipientAccountPda ??
        findRecipientPolicyPda(vault, options.recipient)[0];
      const isWritable = options.recipientAccountWritable ?? true;
      accounts.push({
        pubkey: pda,
        isWritable,
        isSigner: false,
      });
    }
  }

  accounts.push(...options.cpiAccounts);
  return accounts;
}

/**
 * Resolve which recipient account PDA to pass for execute_action.
 *
 * Checks RecipientPolicy first, falls back to WhitelistEntry.
 * Returns the PDA and whether it needs write access.
 *
 * @returns { pda, writable } or null if neither exists.
 */
export async function resolveRecipientAccount(
  connection: Connection,
  vault: PublicKey,
  recipient: PublicKey
): Promise<{ pda: PublicKey; writable: boolean } | null> {
  const [policyPda] = findRecipientPolicyPda(vault, recipient);
  const [whitelistPda] = findWhitelistPda(vault, recipient);

  const infos = await connection.getMultipleAccountsInfo([policyPda, whitelistPda]);

  if (infos[0] && infos[0].data.length > 0) {
    // RecipientPolicy exists — writable for daily spend write-back
    return { pda: policyPda, writable: true };
  }
  if (infos[1] && infos[1].data.length > 0) {
    // WhitelistEntry exists — read-only
    return { pda: whitelistPda, writable: false };
  }

  return null;
}

/**
 * Build remaining_accounts array for execute_action_swap / execute_action_swap_cosigned.
 *
 * Order must match the Rust parser:
 * 1. [blacklist(vault, inputMint), greenlist(vault, inputMint)]
 * 2. [blacklist(vault, outputMint), greenlist(vault, outputMint)]
 * 3. If includeSwapPairPolicy -> [SwapPairPolicy PDA]
 * 4. cpiAccounts appended
 */
export function buildSwapRemainingAccounts(
  vault: PublicKey,
  options: SwapRemainingAccountsOptions
): AccountMeta[] {
  const accounts: AccountMeta[] = [];

  const [inputBlPda] = findBlacklistPda(vault, options.inputMint);
  const [inputGlPda] = findGreenlistPda(vault, options.inputMint);
  accounts.push(
    { pubkey: inputBlPda, isWritable: false, isSigner: false },
    { pubkey: inputGlPda, isWritable: false, isSigner: false }
  );

  const [outputBlPda] = findBlacklistPda(vault, options.outputMint);
  const [outputGlPda] = findGreenlistPda(vault, options.outputMint);
  accounts.push(
    { pubkey: outputBlPda, isWritable: false, isSigner: false },
    { pubkey: outputGlPda, isWritable: false, isSigner: false }
  );

  if (options.includeSwapPairPolicy) {
    const [pairPda] = findSwapPairPda(
      vault,
      options.inputMint,
      options.outputMint
    );
    accounts.push({
      pubkey: pairPda,
      isWritable: false,
      isSigner: false,
    });
  }

  accounts.push(...options.cpiAccounts);
  return accounts;
}

export interface TransferRemainingAccountsOptions {
  recipient: PublicKey;
  /** The recipient account PDA (RecipientPolicy or WhitelistEntry). If omitted, defaults to RecipientPolicy PDA. */
  recipientAccountPda?: PublicKey;
  /** Whether the recipient account needs write access (true for RecipientPolicy with daily limits). */
  recipientAccountWritable?: boolean;
  /** If true (cosigned variant), only includes blacklist check — no policy/whitelist slot. */
  cosigned?: boolean;
}

/**
 * Build remaining_accounts array for execute_action_transfer / execute_action_transfer_cosigned.
 *
 * Autonomous: [blacklist(vault, recipient), recipientPolicy_or_whitelist]
 * Cosigned:   [blacklist(vault, recipient)]
 */
export function buildTransferRemainingAccounts(
  vault: PublicKey,
  options: TransferRemainingAccountsOptions
): AccountMeta[] {
  const accounts: AccountMeta[] = [];

  const [recipBlPda] = findBlacklistPda(vault, options.recipient);
  accounts.push({ pubkey: recipBlPda, isWritable: false, isSigner: false });

  if (!options.cosigned) {
    const pda =
      options.recipientAccountPda ??
      findRecipientPolicyPda(vault, options.recipient)[0];
    const isWritable = options.recipientAccountWritable ?? true;
    accounts.push({ pubkey: pda, isWritable, isSigner: false });
  }

  return accounts;
}

/** A discovered vault with its best active session key and policy config. */
export interface DiscoveredVault {
  /** Vault PDA address. */
  vault: PublicKey;
  /** Vault owner (who controls policies). */
  owner: PublicKey;
  /** Whether the vault is currently frozen. */
  isFrozen: boolean;
  /** Vault policy configuration. */
  config: VaultConfig;
  /**
   * Best active session key for this agent, or null if none are active.
   * "Active" = not revoked, nonce matches, validAfter <= now, validUntil > now.
   */
  activeSessionKey: { pda: PublicKey; key: SessionKey } | null;
  /** All session keys for this agent on this vault (including expired/revoked). */
  allSessionKeys: { pda: PublicKey; key: SessionKey }[];
}

/**
 * Discover all vaults where the given agent has a session key.
 *
 * Scans on-chain SessionKey accounts where `agent` field matches,
 * groups by vault, and identifies the best active session key for each.
 *
 * **Security note:** Anyone can create a vault and add your agent's pubkey.
 * Always verify the returned `owner` is a trusted address before operating.
 * Use `trustedOwners` param to auto-filter, or confirm with the user.
 *
 * @param trustedOwners - Optional allowlist of owner addresses. If provided,
 *   only vaults owned by these addresses are returned.
 */
export async function discoverVaults(
  connection: Connection,
  program: Program<AgentPolicyEngine>,
  agentPublicKey: PublicKey,
  trustedOwners?: PublicKey[],
): Promise<DiscoveredVault[]> {
  // Find all SessionKey accounts where agent == agentPublicKey
  const sessionKeyDiscriminator = [93, 186, 163, 139, 160, 255, 81, 112];
  const accounts = await connection.getProgramAccounts(program.programId, {
    filters: [
      {
        memcmp: {
          offset: 0,
          bytes: utils.bytes.bs58.encode(Buffer.from(sessionKeyDiscriminator)),
        },
      },
      {
        // agent field at offset 40 (8 discriminator + 32 vault)
        memcmp: {
          offset: 40,
          bytes: agentPublicKey.toBase58(),
        },
      },
    ],
  });

  // Decode all session keys
  const decoded: { pda: PublicKey; key: SessionKey }[] = accounts.map((acct) => ({
    pda: acct.pubkey,
    key: program.coder.accounts.decode(
      "sessionKey",
      acct.account.data
    ) as unknown as SessionKey,
  }));

  // Group by vault
  const byVault = new Map<string, { pda: PublicKey; key: SessionKey }[]>();
  for (const sk of decoded) {
    const vaultStr = sk.key.vault.toBase58();
    if (!byVault.has(vaultStr)) byVault.set(vaultStr, []);
    byVault.get(vaultStr)!.push(sk);
  }

  const now = Math.floor(Date.now() / 1000);
  const trustedSet = trustedOwners
    ? new Set(trustedOwners.map((o) => o.toBase58()))
    : null;

  const results: DiscoveredVault[] = [];

  for (const [vaultStr, sessionKeys] of byVault) {
    const vaultPda = new PublicKey(vaultStr);

    try {
      const vault = await program.account.vault.fetch(vaultPda) as unknown as Vault;

      // Filter by trusted owners
      if (trustedSet && !trustedSet.has(vault.owner.toBase58())) continue;

      const [configPda] = findVaultConfigPda(vaultPda);
      const config = await program.account.vaultConfig.fetch(configPda) as unknown as VaultConfig;

      // Find best active session key
      const activeKeys = sessionKeys.filter((sk) =>
        !sk.key.isRevoked &&
        sk.key.nonce.eq(vault.globalSessionNonce) &&
        sk.key.validAfter.toNumber() <= now &&
        sk.key.validUntil.toNumber() > now
      );

      // Pick the one with the most remaining spending allowance
      let bestActive: { pda: PublicKey; key: SessionKey } | null = null;
      if (activeKeys.length > 0) {
        bestActive = activeKeys.reduce((best, curr) => {
          const bestRemaining = best.key.spendingLimitUsdc.sub(best.key.amountSpentUsdc);
          const currRemaining = curr.key.spendingLimitUsdc.sub(curr.key.amountSpentUsdc);
          return currRemaining.gt(bestRemaining) ? curr : best;
        });
      }

      results.push({
        vault: vaultPda,
        owner: vault.owner,
        isFrozen: vault.isFrozen,
        config,
        activeSessionKey: bestActive,
        allSessionKeys: sessionKeys,
      });
    } catch {
      // Vault may have been closed — skip
    }
  }

  return results;
}

// Anchor's IDL-based type resolver auto-derives PDA accounts and rejects them if passed explicitly. We use `as any` to allow explicit account specification, which is the pattern used throughout the test suite.

// Owner Client
export class OwnerClient {
  readonly vaultIndex: BN;

  constructor(
    readonly program: Program<AgentPolicyEngine>,
    readonly owner: PublicKey,
    vaultIndex: BN = new BN(0)
  ) {
    this.vaultIndex = vaultIndex;
  }

  private get vaultPda(): PublicKey {
    return findVaultPda(this.owner, this.vaultIndex)[0];
  }

  private get vaultConfigPda(): PublicKey {
    return findVaultConfigPda(this.vaultPda)[0];
  }

  // Vault CRUD

  async createVault(usdcMint: PublicKey): Promise<string> {
    return this.program.methods
      .createVault(this.vaultIndex, usdcMint)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        vaultConfig: this.vaultConfigPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async updateVaultConfig(params: UpdateVaultConfigParams): Promise<string> {
    return this.program.methods
      .updateVaultConfig(params as any)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        vaultConfig: this.vaultConfigPda,
      } as any)
      .rpc();
  }

  async closeVault(): Promise<string> {
    return this.program.methods
      .closeVault()
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        vaultConfig: this.vaultConfigPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  /**
   * Close all child PDAs belonging to this vault, then close the vault itself.
   * Current-day SpendingTrackers are skipped (TrackerNotExpired constraint).
   * Returns an array of all transaction signatures.
   */
  async closeVaultWithCleanup(connection: Connection): Promise<string[]> {
    const txSigs: string[] = [];
    const vault = this.vaultPda;

    // Discriminators: sha256("account:<Name>")[0..8]
    const discriminators: Record<string, number[]> = {
      greenlistEntry: [175, 13, 79, 9, 251, 229, 0, 255],
      whitelistEntry: [51, 70, 173, 81, 219, 192, 234, 62],
      blacklistEntry: [218, 179, 231, 40, 141, 25, 168, 189],
      sessionKey: [93, 186, 163, 139, 160, 255, 81, 112],
      spendingTracker: [28, 90, 10, 66, 40, 125, 34, 122],
      recipientPolicy: [182, 177, 146, 52, 243, 77, 166, 188],
      swapPairPolicy: [204, 66, 96, 199, 136, 60, 152, 238],
    };

    const findChildAccounts = async (
      discriminator: number[]
    ): Promise<{ pubkey: PublicKey; data: Buffer }[]> => {
      const accounts = await connection.getProgramAccounts(this.program.programId, {
        filters: [
          {
            memcmp: {
              offset: 0,
              bytes: utils.bytes.bs58.encode(
                Buffer.from(discriminator)
              ),
            },
          },
          {
            memcmp: {
              offset: 8,
              bytes: vault.toBase58(),
            },
          },
        ],
      });
      return accounts.map((a) => ({ pubkey: a.pubkey, data: Buffer.from(a.account.data) }));
    };

    // 1. Find all child accounts in parallel
    const [greenlists, whitelists, blacklists, sessionKeys, trackers, recipientPolicies, swapPairs] =
      await Promise.all([
        findChildAccounts(discriminators.greenlistEntry),
        findChildAccounts(discriminators.whitelistEntry),
        findChildAccounts(discriminators.blacklistEntry),
        findChildAccounts(discriminators.sessionKey),
        findChildAccounts(discriminators.spendingTracker),
        findChildAccounts(discriminators.recipientPolicy),
        findChildAccounts(discriminators.swapPairPolicy),
      ]);

    // 2. Build removal/close instructions
    const ixs: any[] = [];

    for (const { pubkey: pda, data } of greenlists) {
      const entryPubkey = new PublicKey(data.subarray(8 + 32, 8 + 32 + 32));
      ixs.push(
        await this.program.methods
          .removeGreenlist(entryPubkey)
          .accounts({
            owner: this.owner,
            vault,
            greenlistEntry: pda,
          } as any)
          .instruction()
      );
    }

    for (const { pubkey: pda, data } of whitelists) {
      const address = new PublicKey(data.subarray(8 + 32, 8 + 32 + 32));
      ixs.push(
        await this.program.methods
          .removeWhitelist(address)
          .accounts({
            owner: this.owner,
            vault,
            whitelistEntry: pda,
          } as any)
          .instruction()
      );
    }

    for (const { pubkey: pda, data } of blacklists) {
      const address = new PublicKey(data.subarray(8 + 32, 8 + 32 + 32));
      ixs.push(
        await this.program.methods
          .removeBlacklist(address)
          .accounts({
            owner: this.owner,
            vault,
            blacklistEntry: pda,
          } as any)
          .instruction()
      );
    }

    for (const pda of sessionKeys) {
      ixs.push(
        await this.program.methods
          .closeSessionKey()
          .accounts({
            owner: this.owner,
            vault,
            sessionKey: pda,
          } as any)
          .instruction()
      );
    }

    // SpendingTrackers: skip current-day ones (TrackerNotExpired)
    const currentDay = currentDayEpoch();
    for (const { pubkey: pda, data } of trackers) {
      const dayEpochBytes = data.subarray(40, 48);
      const dayEpoch = new BN(dayEpochBytes, "le");
      if (dayEpoch.gte(currentDay)) continue;
      ixs.push(
        await this.program.methods
          .closeSpentTracker()
          .accounts({
            payer: this.owner,
            vault,
            spendingTracker: pda,
          } as any)
          .instruction()
      );
    }

    // RecipientPolicies: read recipient at offset 40
    for (const { pubkey: pda, data } of recipientPolicies) {
      const recipient = new PublicKey(data.subarray(40, 72));
      ixs.push(
        await this.program.methods
          .closeRecipientPolicy(recipient)
          .accounts({
            owner: this.owner,
            vault,
            recipientPolicy: pda,
          } as any)
          .instruction()
      );
    }

    // SwapPairPolicies: read mint_a at offset 40, mint_b at offset 72
    for (const { pubkey: pda, data } of swapPairs) {
      const mintA = new PublicKey(data.subarray(40, 72));
      const mintB = new PublicKey(data.subarray(72, 104));
      ixs.push(
        await this.program.methods
          .removeSwapPair(mintA, mintB)
          .accounts({
            owner: this.owner,
            vault,
            swapPairPolicy: pda,
          } as any)
          .instruction()
      );
    }

    // 3. Batch into transactions (~8 per TX)
    const BATCH_SIZE = 8;
    for (let i = 0; i < ixs.length; i += BATCH_SIZE) {
      const batch = ixs.slice(i, i + BATCH_SIZE);
      const tx = new Transaction();
      batch.forEach((ix: any) => tx.add(ix));
      const sig = await this.program.provider.sendAndConfirm!(tx, []);
      txSigs.push(sig);
    }

    // 4. Finally close the vault itself
    const closeSig = await this.closeVault();
    txSigs.push(closeSig);

    return txSigs;
  }

  // List Management

  async addGreenlist(entryPubkey: PublicKey, swapOnly: boolean = false): Promise<string> {
    const [entryPda] = findGreenlistPda(this.vaultPda, entryPubkey);
    return this.program.methods
      .addGreenlist(entryPubkey, swapOnly)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        greenlistEntry: entryPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async removeGreenlist(entryPubkey: PublicKey): Promise<string> {
    const [entryPda] = findGreenlistPda(this.vaultPda, entryPubkey);
    return this.program.methods
      .removeGreenlist(entryPubkey)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        greenlistEntry: entryPda,
      } as any)
      .rpc();
  }

  async addWhitelist(address: PublicKey): Promise<string> {
    const [entryPda] = findWhitelistPda(this.vaultPda, address);
    return this.program.methods
      .addWhitelist(address)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        whitelistEntry: entryPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async removeWhitelist(address: PublicKey): Promise<string> {
    const [entryPda] = findWhitelistPda(this.vaultPda, address);
    return this.program.methods
      .removeWhitelist(address)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        whitelistEntry: entryPda,
      } as any)
      .rpc();
  }

  async addBlacklist(address: PublicKey): Promise<string> {
    const [entryPda] = findBlacklistPda(this.vaultPda, address);
    return this.program.methods
      .addBlacklist(address)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        blacklistEntry: entryPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async removeBlacklist(address: PublicKey): Promise<string> {
    const [entryPda] = findBlacklistPda(this.vaultPda, address);
    return this.program.methods
      .removeBlacklist(address)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        blacklistEntry: entryPda,
      } as any)
      .rpc();
  }

  // Recipient Policy

  async createRecipientPolicy(
    recipient: PublicKey,
    perTxLimitUsdc: BN,
    dailyLimitUsdc: BN,
    mode: number
  ): Promise<string> {
    const [policyPda] = findRecipientPolicyPda(this.vaultPda, recipient);
    return this.program.methods
      .createRecipientPolicy(recipient, perTxLimitUsdc, dailyLimitUsdc, mode)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        recipientPolicy: policyPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async updateRecipientPolicy(
    recipient: PublicKey,
    perTxLimitUsdc: BN,
    dailyLimitUsdc: BN,
    mode: number
  ): Promise<string> {
    const [policyPda] = findRecipientPolicyPda(this.vaultPda, recipient);
    return this.program.methods
      .updateRecipientPolicy(recipient, perTxLimitUsdc, dailyLimitUsdc, mode)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        recipientPolicy: policyPda,
      } as any)
      .rpc();
  }

  async closeRecipientPolicy(recipient: PublicKey): Promise<string> {
    const [policyPda] = findRecipientPolicyPda(this.vaultPda, recipient);
    return this.program.methods
      .closeRecipientPolicy(recipient)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        recipientPolicy: policyPda,
      } as any)
      .rpc();
  }

  // Swap Pair Policy

  async addSwapPair(mintA: PublicKey, mintB: PublicKey): Promise<string> {
    const [sortedA, sortedB] = canonicalSortMints(mintA, mintB);
    const [pairPda] = findSwapPairPda(this.vaultPda, sortedA, sortedB);
    return this.program.methods
      .addSwapPair(sortedA, sortedB)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        swapPairPolicy: pairPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async removeSwapPair(mintA: PublicKey, mintB: PublicKey): Promise<string> {
    const [sortedA, sortedB] = canonicalSortMints(mintA, mintB);
    const [pairPda] = findSwapPairPda(this.vaultPda, sortedA, sortedB);
    return this.program.methods
      .removeSwapPair(sortedA, sortedB)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        swapPairPolicy: pairPda,
      } as any)
      .rpc();
  }

  // Session Keys

  async createSessionKey(
    agent: PublicKey,
    validAfter: BN,
    validUntil: BN,
    spendingLimitUsdc: BN
  ): Promise<{ tx: string; sessionKeyPda: PublicKey }> {
    const vault = await this.program.account.vault.fetch(this.vaultPda);
    const [sessionKeyPda] = findSessionKeyPda(
      this.vaultPda,
      agent,
      vault.sessionCounter
    );

    const tx = await this.program.methods
      .createSessionKey(agent, validAfter, validUntil, spendingLimitUsdc)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        sessionKey: sessionKeyPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();

    return { tx, sessionKeyPda };
  }

  async revokeSessionKey(sessionKeyPda: PublicKey): Promise<string> {
    return this.program.methods
      .revokeSessionKey()
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        sessionKey: sessionKeyPda,
      } as any)
      .rpc();
  }

  async revokeAllSessions(): Promise<string> {
    return this.program.methods
      .revokeAllSessions()
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
      } as any)
      .rpc();
  }

  async closeSessionKey(sessionKeyPda: PublicKey): Promise<string> {
    return this.program.methods
      .closeSessionKey()
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        sessionKey: sessionKeyPda,
      } as any)
      .rpc();
  }

  // Freeze / Unfreeze

  async freezeVault(): Promise<string> {
    return this.program.methods
      .freezeVault()
      .accounts({ owner: this.owner, vault: this.vaultPda } as any)
      .rpc();
  }

  async unfreezeVault(): Promise<string> {
    return this.program.methods
      .unfreezeVault()
      .accounts({ owner: this.owner, vault: this.vaultPda } as any)
      .rpc();
  }

  // Withdraw

  async withdrawSol(
    amount: BN,
    destination: PublicKey
  ): Promise<string> {
    return this.program.methods
      .withdrawSol(amount)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        destination,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async withdrawSpl(
    amount: BN,
    mint: PublicKey,
    vaultTokenAccount: PublicKey,
    destinationTokenAccount: PublicKey,
    tokenProgram: PublicKey = TOKEN_PROGRAM_ID
  ): Promise<string> {
    return this.program.methods
      .withdrawSpl(amount)
      .accounts({
        owner: this.owner,
        vault: this.vaultPda,
        mint,
        vaultTokenAccount,
        destinationTokenAccount,
        tokenProgram,
      } as any)
      .rpc();
  }

  // Account Fetchers

  async fetchVault(): Promise<Vault> {
    return this.program.account.vault.fetch(this.vaultPda) as unknown as Vault;
  }

  async fetchVaultConfig(): Promise<VaultConfig> {
    return this.program.account.vaultConfig.fetch(
      this.vaultConfigPda
    ) as unknown as VaultConfig;
  }
}


// Agent Client
export class AgentWallet {
  readonly vaultPda: PublicKey;
  readonly vaultConfigPda: PublicKey;
  readonly vaultIndex: BN;

  constructor(
    readonly program: Program<AgentPolicyEngine>,
    readonly agent: PublicKey,
    readonly vaultOwner: PublicKey,
    vaultIndex: BN = new BN(0)
  ) {
    this.vaultIndex = vaultIndex;
    [this.vaultPda] = findVaultPda(vaultOwner, vaultIndex);
    [this.vaultConfigPda] = findVaultConfigPda(this.vaultPda);
  }

  async executeAction(
    params: ExecuteActionParams,
    sessionKeyPda: PublicKey,
    trackerPda: PublicKey,
    targetProgram: PublicKey,
    remainingAccountsOptions: RemainingAccountsOptions
  ): Promise<string> {
    const [targetBlPda] = findBlacklistPda(this.vaultPda, targetProgram);
    const [targetGlPda] = findGreenlistPda(this.vaultPda, targetProgram);

    const remaining = buildRemainingAccounts(
      this.vaultPda,
      remainingAccountsOptions
    );

    return this.program.methods
      .executeAction(params as any)
      .accounts({
        agent: this.agent,
        vault: this.vaultPda,
        vaultConfig: this.vaultConfigPda,
        sessionKey: sessionKeyPda,
        spendingTracker: trackerPda,
        targetBlacklistCheck: targetBlPda,
        targetGreenlistCheck: targetGlPda,
        targetProgram,
      } as any)
      .remainingAccounts(remaining)
      .rpc();
  }

  async executeActionCosigned(
    params: ExecuteActionParams,
    sessionKeyPda: PublicKey,
    trackerPda: PublicKey,
    targetProgram: PublicKey,
    remainingAccountsOptions: Omit<RemainingAccountsOptions, "cosigned">
  ): Promise<string> {
    const [targetBlPda] = findBlacklistPda(this.vaultPda, targetProgram);
    const [targetGlPda] = findGreenlistPda(this.vaultPda, targetProgram);

    const remaining = buildRemainingAccounts(this.vaultPda, {
      ...remainingAccountsOptions,
      cosigned: true,
    });

    return this.program.methods
      .executeActionCosigned(params as any)
      .accounts({
        agent: this.agent,
        owner: this.vaultOwner,
        vault: this.vaultPda,
        vaultConfig: this.vaultConfigPda,
        sessionKey: sessionKeyPda,
        spendingTracker: trackerPda,
        targetBlacklistCheck: targetBlPda,
        targetGreenlistCheck: targetGlPda,
        targetProgram,
      } as any)
      .remainingAccounts(remaining)
      .rpc();
  }

  async executeSwap(
    params: ExecuteSwapParams,
    sessionKeyPda: PublicKey,
    trackerPda: PublicKey,
    targetProgram: PublicKey,
    vaultInputTokenAccount: PublicKey,
    vaultOutputTokenAccount: PublicKey,
    swapRemainingAccountsOptions: SwapRemainingAccountsOptions
  ): Promise<string> {
    const [targetBlPda] = findBlacklistPda(this.vaultPda, targetProgram);
    const [targetGlPda] = findGreenlistPda(this.vaultPda, targetProgram);

    const remaining = buildSwapRemainingAccounts(
      this.vaultPda,
      swapRemainingAccountsOptions
    );

    return this.program.methods
      .executeActionSwap(params as any)
      .accounts({
        agent: this.agent,
        vault: this.vaultPda,
        vaultConfig: this.vaultConfigPda,
        sessionKey: sessionKeyPda,
        spendingTracker: trackerPda,
        targetBlacklistCheck: targetBlPda,
        targetGreenlistCheck: targetGlPda,
        targetProgram,
        vaultInputTokenAccount,
        vaultOutputTokenAccount,
      } as any)
      .remainingAccounts(remaining)
      .rpc();
  }

  async executeSwapCosigned(
    params: ExecuteSwapParams,
    sessionKeyPda: PublicKey,
    trackerPda: PublicKey,
    targetProgram: PublicKey,
    vaultInputTokenAccount: PublicKey,
    vaultOutputTokenAccount: PublicKey,
    swapRemainingAccountsOptions: SwapRemainingAccountsOptions
  ): Promise<string> {
    const [targetBlPda] = findBlacklistPda(this.vaultPda, targetProgram);
    const [targetGlPda] = findGreenlistPda(this.vaultPda, targetProgram);

    const remaining = buildSwapRemainingAccounts(
      this.vaultPda,
      swapRemainingAccountsOptions
    );

    return this.program.methods
      .executeActionSwapCosigned(params as any)
      .accounts({
        agent: this.agent,
        owner: this.vaultOwner,
        vault: this.vaultPda,
        vaultConfig: this.vaultConfigPda,
        sessionKey: sessionKeyPda,
        spendingTracker: trackerPda,
        targetBlacklistCheck: targetBlPda,
        targetGreenlistCheck: targetGlPda,
        targetProgram,
        vaultInputTokenAccount,
        vaultOutputTokenAccount,
      } as any)
      .remainingAccounts(remaining)
      .rpc();
  }

  async executeTransfer(
    params: ExecuteTransferParams,
    sessionKeyPda: PublicKey,
    trackerPda: PublicKey,
    vaultSourceAta: PublicKey,
    destinationAta: PublicKey,
    tokenMint: PublicKey,
    tokenProgram: PublicKey,
    remainingOptions: Omit<TransferRemainingAccountsOptions, "cosigned">
  ): Promise<string> {
    const [tokenBlPda] = findBlacklistPda(this.vaultPda, tokenMint);
    const [tokenGlPda] = findGreenlistPda(this.vaultPda, tokenMint);

    const remaining = buildTransferRemainingAccounts(this.vaultPda, {
      ...remainingOptions,
      cosigned: false,
    });

    return this.program.methods
      .executeActionTransfer({
        amount: params.amount,
        decimals: params.decimals,
        recipient: params.recipient,
      } as any)
      .accounts({
        agent: this.agent,
        vault: this.vaultPda,
        vaultConfig: this.vaultConfigPda,
        sessionKey: sessionKeyPda,
        spendingTracker: trackerPda,
        vaultSourceAta,
        destinationAta,
        tokenMint,
        tokenProgram,
        tokenBlacklistCheck: tokenBlPda,
        tokenGreenlistCheck: tokenGlPda,
      } as any)
      .remainingAccounts(remaining)
      .rpc();
  }

  async executeTransferCosigned(
    params: ExecuteTransferParams,
    sessionKeyPda: PublicKey,
    trackerPda: PublicKey,
    vaultSourceAta: PublicKey,
    destinationAta: PublicKey,
    tokenMint: PublicKey,
    tokenProgram: PublicKey,
    remainingOptions: Pick<TransferRemainingAccountsOptions, "recipient">
  ): Promise<string> {
    const [tokenBlPda] = findBlacklistPda(this.vaultPda, tokenMint);
    const [tokenGlPda] = findGreenlistPda(this.vaultPda, tokenMint);

    const remaining = buildTransferRemainingAccounts(this.vaultPda, {
      ...remainingOptions,
      cosigned: true,
    });

    return this.program.methods
      .executeActionTransferCosigned({
        amount: params.amount,
        decimals: params.decimals,
        recipient: params.recipient,
      } as any)
      .accounts({
        agent: this.agent,
        owner: this.vaultOwner,
        vault: this.vaultPda,
        vaultConfig: this.vaultConfigPda,
        sessionKey: sessionKeyPda,
        spendingTracker: trackerPda,
        vaultSourceAta,
        destinationAta,
        tokenMint,
        tokenProgram,
        tokenBlacklistCheck: tokenBlPda,
        tokenGreenlistCheck: tokenGlPda,
      } as any)
      .remainingAccounts(remaining)
      .rpc();
  }

  async initTracker(): Promise<{ tx: string; trackerPda: PublicKey }> {
    const day = currentDayEpoch();
    const [trackerPda] = findTrackerPda(this.vaultPda, day);

    const tx = await this.program.methods
      .initTracker(day)
      .accounts({
        payer: this.agent,
        vault: this.vaultPda,
        spendingTracker: trackerPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();

    return { tx, trackerPda };
  }

  async closeSpentTracker(dayEpoch: BN): Promise<string> {
    const [trackerPda] = findTrackerPda(this.vaultPda, dayEpoch);

    return this.program.methods
      .closeSpentTracker()
      .accounts({
        payer: this.agent,
        vault: this.vaultPda,
        spendingTracker: trackerPda,
      } as any)
      .rpc();
  }

  // Account Fetchers
  async fetchVault(): Promise<Vault> {
    return this.program.account.vault.fetch(
      this.vaultPda
    ) as unknown as Vault;
  }

  async fetchVaultConfig(): Promise<VaultConfig> {
    return this.program.account.vaultConfig.fetch(
      this.vaultConfigPda
    ) as unknown as VaultConfig;
  }

  async fetchSessionKey(pda: PublicKey): Promise<SessionKey> {
    return this.program.account.sessionKey.fetch(
      pda
    ) as unknown as SessionKey;
  }

  async fetchSpendingTracker(pda: PublicKey): Promise<SpendingTracker> {
    return this.program.account.spendingTracker.fetch(
      pda
    ) as unknown as SpendingTracker;
  }

  async findAllSessionKeys(
    connection: Connection
  ): Promise<{ pubkey: PublicKey; account: SessionKey }[]> {
    const accounts = await connection.getProgramAccounts(this.program.programId, {
      filters: [
        // SessionKey discriminator
        {
          memcmp: {
            offset: 0,
            bytes: utils.bytes.bs58.encode(
              Buffer.from([93, 186, 163, 139, 160, 255, 81, 112])
            ),
          },
        },
        // vault field at offset 8
        {
          memcmp: {
            offset: 8,
            bytes: this.vaultPda.toBase58(),
          },
        },
      ],
    });

    return accounts.map((a) => ({
      pubkey: a.pubkey,
      account: this.program.coder.accounts.decode(
        "sessionKey",
        a.account.data
      ) as unknown as SessionKey,
    }));
  }
}
