import { PublicKey } from "@solana/web3.js";

export const PROGRAM_ID = new PublicKey(
  "BFLP2j3M32pvmnhuF6uDrGPAL7DYctWQqG1UwgzXdrSt"
);

export const SEED_VAULT = Buffer.from("vault");
export const SEED_VAULT_CONFIG = Buffer.from("vault_config");
export const SEED_GREENLIST = Buffer.from("greenlist");
export const SEED_WHITELIST = Buffer.from("whitelist");
export const SEED_BLACKLIST = Buffer.from("blacklist");
export const SEED_SESSION = Buffer.from("session");
export const SEED_TRACKER = Buffer.from("tracker");
export const SEED_RECIPIENT_POLICY = Buffer.from("recipient_policy");
export const SEED_SWAP_PAIR = Buffer.from("swap_pair");

export const SECONDS_PER_DAY = 86400;
