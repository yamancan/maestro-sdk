import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

export interface FactoryState {
  admin: PublicKey;
  pendingAdmin: PublicKey;
  treasury: PublicKey;
  creationFeeLamports: BN;
  totalVaultsCreated: BN;
  isPaused: boolean;
  policyEngineProgram: PublicKey;
  bump: number;
}

export interface VaultRegistry {
  owner: PublicKey;
  vault: PublicKey;
  vaultIndex: BN;
  createdAt: BN;
  label: number[];
  isActive: boolean;
  bump: number;
}

export interface OwnerIndex {
  owner: PublicKey;
  vaultCount: BN;
  bump: number;
}

export interface UpdateFactoryConfigParams {
  treasury: PublicKey | null;
  creationFeeLamports: BN | null;
  isPaused: boolean | null;
  policyEngineProgram: PublicKey | null;
}
