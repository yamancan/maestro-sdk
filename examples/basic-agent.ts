/**
 * Basic Agent Example — Maestro SDK
 *
 * Demonstrates how an AI agent uses the SDK to operate a policy-controlled vault.
 *
 * Prerequisites:
 *   1. Vault created by owner with session key for this agent
 *   2. Agent keypair at ./agent-key.json
 *   3. Vault funded with USDC on devnet
 *
 * Usage:
 *   OWNER=<owner_address> pnpm tsx sdk/examples/basic-agent.ts
 */
import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { readFileSync } from "fs";
import * as path from "path";

import {
  AgentWallet,
  resolveRecipientAccount,
  parseError,
} from "../src";
import type { AgentPolicyEngine } from "../src";

// ── Config ──────────────────────────────────────────────────────────
const DEVNET_RPC = "https://api.devnet.solana.com";
const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
const USDC_DECIMALS = 6;

async function main() {
  // 1. Setup provider
  const ownerPubkey = new PublicKey(process.env.OWNER!);
  const agentKeypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(readFileSync(path.join(__dirname, "agent-key.json"), "utf-8")))
  );

  const connection = new Connection(DEVNET_RPC, "confirmed");
  const wallet = new anchor.Wallet(agentKeypair);
  const provider = new anchor.AnchorProvider(connection, wallet, { commitment: "confirmed" });
  const idl = JSON.parse(
    readFileSync(path.join(__dirname, "..", "idl", "agent_policy_engine.json"), "utf-8")
  );
  const program = new anchor.Program<AgentPolicyEngine>(idl, provider);

  // 2. Create AgentWallet
  const agent = new AgentWallet(program, agentKeypair.publicKey, ownerPubkey);

  // 3. Init daily spending tracker (idempotent — will fail gracefully if exists)
  let trackerPda: PublicKey;
  try {
    const result = await agent.initTracker();
    trackerPda = result.trackerPda;
    console.log("Tracker initialized:", result.tx);
  } catch (err: any) {
    // Already initialized today — derive the PDA manually
    const { findTrackerPda, currentDayEpoch } = await import("../src");
    [trackerPda] = findTrackerPda(agent.vaultPda, currentDayEpoch());
    console.log("Tracker already exists for today");
  }

  // 4. Find active session key
  const sessionKeys = await agent.findAllSessionKeys(connection);
  const vault = await agent.fetchVault();
  const now = Math.floor(Date.now() / 1000);

  const activeKey = sessionKeys.find(
    (k) =>
      !k.account.isRevoked &&
      k.account.nonce.eq(vault.globalSessionNonce) &&
      k.account.validAfter.toNumber() <= now &&
      k.account.validUntil.toNumber() > now
  );

  if (!activeKey) {
    console.error("No active session key found for this agent");
    process.exit(1);
  }
  console.log("Using session key:", activeKey.pubkey.toBase58());

  // 5. Execute a typed transfer
  const recipient = new PublicKey("3f7Ho9R5b3pTWCFjS4pwzrH6E6M3YDjS69LeZ7XgJxCp");
  const amount = new anchor.BN(10_000); // 0.01 USDC

  const resolved = await resolveRecipientAccount(connection, agent.vaultPda, recipient);
  if (!resolved) {
    console.error("Recipient not whitelisted and no policy found");
    process.exit(1);
  }

  try {
    const tx = await agent.executeTransfer(
      { amount, decimals: USDC_DECIMALS, recipient },
      activeKey.pubkey,
      trackerPda,
      await getAssociatedTokenAddress(USDC_MINT, agent.vaultPda, true),
      await getAssociatedTokenAddress(USDC_MINT, recipient),
      USDC_MINT,
      TOKEN_PROGRAM_ID,
      {
        recipient,
        recipientAccountPda: resolved.pda,
        recipientAccountWritable: resolved.writable,
      },
    );
    console.log("Transfer successful:", tx);
  } catch (err) {
    const parsed = parseError(err, "policy_engine");
    if (parsed) {
      console.error(`Policy violation: ${parsed.name} — ${parsed.message}`);
    } else {
      throw err;
    }
  }

  // 6. Check vault state
  const config = await agent.fetchVaultConfig();
  console.log("Vault config:", {
    perTxLimit: `$${Number(config.perTxLimitUsdc) / 1e6}`,
    dailyLimit: `$${Number(config.dailyLimitUsdc) / 1e6}`,
    frozen: vault.isFrozen,
  });
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
