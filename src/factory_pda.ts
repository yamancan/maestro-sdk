import { PublicKey } from "@solana/web3.js";
import {
  FACTORY_PROGRAM_ID,
  SEED_FACTORY,
  SEED_REGISTRY,
  SEED_OWNER_INDEX,
} from "./factory_constants";

export function findFactoryPda(
  programId: PublicKey = FACTORY_PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [SEED_FACTORY],
    programId
  );
}

export function findRegistryPda(
  vault: PublicKey,
  programId: PublicKey = FACTORY_PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [SEED_REGISTRY, vault.toBuffer()],
    programId
  );
}

export function findOwnerIndexPda(
  owner: PublicKey,
  programId: PublicKey = FACTORY_PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [SEED_OWNER_INDEX, owner.toBuffer()],
    programId
  );
}
