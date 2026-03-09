import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import {
  PROGRAM_ID,
  SEED_VAULT,
  SEED_VAULT_CONFIG,
  SEED_GREENLIST,
  SEED_WHITELIST,
  SEED_BLACKLIST,
  SEED_SESSION,
  SEED_TRACKER,
  SEED_RECIPIENT_POLICY,
  SEED_SWAP_PAIR,
  SECONDS_PER_DAY,
} from "./constants";

export function findVaultPda(
  owner: PublicKey,
  vaultIndex: BN = new BN(0),
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [SEED_VAULT, owner.toBuffer(), vaultIndex.toArrayLike(Buffer, "le", 8)],
    programId
  );
}

export function findVaultConfigPda(
  vault: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [SEED_VAULT_CONFIG, vault.toBuffer()],
    programId
  );
}

export function findGreenlistPda(
  vault: PublicKey,
  pubkey: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [SEED_GREENLIST, vault.toBuffer(), pubkey.toBuffer()],
    programId
  );
}

export function findWhitelistPda(
  vault: PublicKey,
  address: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [SEED_WHITELIST, vault.toBuffer(), address.toBuffer()],
    programId
  );
}

export function findBlacklistPda(
  vault: PublicKey,
  address: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [SEED_BLACKLIST, vault.toBuffer(), address.toBuffer()],
    programId
  );
}

export function findSessionKeyPda(
  vault: PublicKey,
  agent: PublicKey,
  counter: BN,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      SEED_SESSION,
      vault.toBuffer(),
      agent.toBuffer(),
      counter.toArrayLike(Buffer, "le", 8),
    ],
    programId
  );
}

export function findTrackerPda(
  vault: PublicKey,
  dayEpoch: BN,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      SEED_TRACKER,
      vault.toBuffer(),
      dayEpoch.toArrayLike(Buffer, "le", 8),
    ],
    programId
  );
}

export function findRecipientPolicyPda(
  vault: PublicKey,
  recipient: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      SEED_RECIPIENT_POLICY,
      vault.toBuffer(),
      recipient.toBuffer(),
    ],
    programId
  );
}

/**
 * Derive the SwapPairPolicy PDA for a vault and mint pair.
 * Mints are canonically sorted internally (smaller first by bytes),
 * so callers do not need to pre-sort — passing (mintB, mintA) yields
 * the same PDA as (mintA, mintB).
 */
export function findSwapPairPda(
  vault: PublicKey,
  mintA: PublicKey,
  mintB: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  // Canonical sort: smaller mint first
  const [min, max] =
    Buffer.compare(mintA.toBuffer(), mintB.toBuffer()) <= 0
      ? [mintA, mintB]
      : [mintB, mintA];
  return PublicKey.findProgramAddressSync(
    [SEED_SWAP_PAIR, vault.toBuffer(), min.toBuffer(), max.toBuffer()],
    programId
  );
}

/** Canonically sort two mints (smaller first by bytes). */
export function canonicalSortMints(
  a: PublicKey,
  b: PublicKey
): [PublicKey, PublicKey] {
  return Buffer.compare(a.toBuffer(), b.toBuffer()) <= 0 ? [a, b] : [b, a];
}

export function currentDayEpoch(): BN {
  return new BN(Math.floor(Date.now() / 1000 / SECONDS_PER_DAY));
}
