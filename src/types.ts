import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

export interface UpdateVaultConfigParams {
  perTxLimitUsdc: BN | null;
  dailyLimitUsdc: BN | null;
  operatingHoursStart: number | null;
  operatingHoursEnd: number | null;
  cooldownSeconds: number | null;
  cooldownThresholdUsdc: BN | null;
  tier2ThresholdUsdc: BN | null;
  requireCosignNewRecipient: boolean | null;
  swapRequirePairPolicy: boolean | null;
  requireTypedTransfers: boolean | null;
}

export interface ExecuteActionParams {
  instructionData: Buffer;
  usdcAmount: BN;
  recipient: PublicKey | null;
  tokenMint: PublicKey | null;
}

export interface Vault {
  owner: PublicKey;
  usdcMint: PublicKey;
  vaultIndex: BN;
  globalSessionNonce: BN;
  isFrozen: boolean;
  sessionCounter: BN;
  bump: number;
}

export interface VaultConfig {
  vault: PublicKey;
  perTxLimitUsdc: BN;
  dailyLimitUsdc: BN;
  operatingHoursStart: number;
  operatingHoursEnd: number;
  cooldownSeconds: number;
  cooldownThresholdUsdc: BN;
  lastCooldownTrigger: BN;
  tier2ThresholdUsdc: BN;
  requireCosignNewRecipient: boolean;
  swapRequirePairPolicy: boolean;
  requireTypedTransfers: boolean;
  bump: number;
}

export interface SessionKey {
  vault: PublicKey;
  agent: PublicKey;
  nonce: BN;
  validAfter: BN;
  validUntil: BN;
  spendingLimitUsdc: BN;
  amountSpentUsdc: BN;
  isRevoked: boolean;
  bump: number;
}

export interface SpendingTracker {
  vault: PublicKey;
  dayEpoch: BN;
  totalSpentUsdc: BN;
  bump: number;
}

export interface GreenlistEntry {
  vault: PublicKey;
  pubkey: PublicKey;
  bump: number;
  swapOnly: boolean;
}

export interface WhitelistEntry {
  vault: PublicKey;
  address: PublicKey;
  bump: number;
}

export interface BlacklistEntry {
  vault: PublicKey;
  address: PublicKey;
  bump: number;
}

export interface RecipientPolicy {
  vault: PublicKey;
  recipient: PublicKey;
  perTxLimitUsdc: BN;
  dailyLimitUsdc: BN;
  totalSpentToday: BN;
  dayEpoch: BN;
  mode: number;
  bump: number;
}

export interface SwapPairPolicy {
  vault: PublicKey;
  mintA: PublicKey;
  mintB: PublicKey;
  bump: number;
}

export interface ExecuteTransferParams {
  amount: BN;
  decimals: number;
  recipient: PublicKey;
}
