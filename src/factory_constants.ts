import { PublicKey } from "@solana/web3.js";

export const FACTORY_PROGRAM_ID = new PublicKey(
  "4uYWVucabDeyC8c4CncQjwi6RjBcM46TVePhmob9tRP2"
);

export const SEED_FACTORY = Buffer.from("factory");
export const SEED_REGISTRY = Buffer.from("registry");
export const SEED_OWNER_INDEX = Buffer.from("owner_index");
