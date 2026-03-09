/**
 * Error code enums and parser for the Agent Policy Engine and Vault Factory programs.
 *
 * Anchor `#[error_code]` assigns codes starting at 6000, incrementing by 1 per variant.
 */

// Policy Engine errors (from programs/agent_policy_engine/src/errors.rs)

export enum PolicyEngineError {
  // Vault state
  VaultFrozen = 6000,

  // Session key
  SessionKeyRevoked = 6001,
  SessionKeyNonceMismatch = 6002,
  SessionKeyAgentMismatch = 6003,
  SessionKeyNotYetValid = 6004,
  SessionKeyExpired = 6005,

  // Time controls
  OutsideOperatingHours = 6006,
  CooldownActive = 6007,

  // Three-list enforcement
  AddressBlacklisted = 6008,
  ProgramNotGreenlisted = 6009,
  TokenNotGreenlisted = 6010,
  RecipientNotWhitelisted = 6011,
  RecipientRequiresCosign = 6012,

  // Spending limits
  PerTxLimitExceeded = 6013,
  DailyLimitExceeded = 6014,
  SessionLimitExceeded = 6015,
  Tier2ThresholdExceeded = 6016,

  // Math
  ArithmeticOverflow = 6017,

  // Tracker
  InvalidDayEpoch = 6018,
  TrackerDayMismatch = 6019,
  TrackerNotExpired = 6020,

  // Session key creation
  InvalidSessionKeyWindow = 6021,
  InvalidSessionKeySpendingLimit = 6022,

  // Vault config
  InvalidOperatingHoursStart = 6023,
  InvalidOperatingHoursEnd = 6024,

  // Transfer amount verification
  UsdcAmountMismatch = 6025,

  // Remaining accounts
  InsufficientRemainingAccounts = 6026,

  // Token instruction safety (CRITICAL-001)
  TokenInstructionNotAllowed = 6027,
  TokenMintRequired = 6028,

  // Post-CPI balance verification (MEDIUM-004)
  UsdcSpentExceedsDeclared = 6029,

  // Swap instruction safety (Phase B)
  UseExecuteActionForTokenTransfers = 6030,
  SystemProgramNotAllowedInSwap = 6031,
  TokenAccountAuthorityChanged = 6032,
  OutputBelowMinimum = 6033,
  InvalidTokenAccount = 6034,
  InputMintMismatch = 6035,
  OutputMintMismatch = 6036,

  // Recipient policy (Phase C)
  RecipientNotAllowed = 6037,
  RecipientPerTxLimitExceeded = 6038,
  RecipientDailyLimitExceeded = 6039,

  // Swap pair policy (Phase C)
  SwapPairNotAllowed = 6040,
  InvalidSwapPairOrder = 6041,

  // Recipient policy validation (Phase C hardening)
  InvalidRecipientPolicyData = 6042,
  InvalidRecipientPolicyMode = 6043,

  // Recipient policy cosign required (Phase C cleanup)
  RecipientPolicyCosignRequired = 6044,

  // CPI account verification (HIGH-003)
  RecipientMismatch = 6045,
  TokenMintMismatch = 6046,

  // Typed transfer lane (Phase D)
  InvalidTokenProgram = 6047,
  SourceMintMismatch = 6048,
  DestinationMintMismatch = 6049,
  DestinationOwnerMismatch = 6050,
}

/** Human-readable messages matching the Rust `#[msg("...")]` attributes. */
const POLICY_ENGINE_MESSAGES: Record<PolicyEngineError, string> = {
  [PolicyEngineError.VaultFrozen]:
    "Vault is frozen \u2014 all agent operations are blocked",
  [PolicyEngineError.SessionKeyRevoked]: "Session key has been revoked",
  [PolicyEngineError.SessionKeyNonceMismatch]:
    "Session key nonce does not match vault global nonce \u2014 key invalidated",
  [PolicyEngineError.SessionKeyAgentMismatch]:
    "Session key signer does not match the agent on the key",
  [PolicyEngineError.SessionKeyNotYetValid]:
    "Session key is not yet valid (valid_after is in the future)",
  [PolicyEngineError.SessionKeyExpired]:
    "Session key has expired (valid_until has passed)",
  [PolicyEngineError.OutsideOperatingHours]:
    "Operation attempted outside allowed operating hours",
  [PolicyEngineError.CooldownActive]:
    "Vault is in cooldown period after a large transaction",
  [PolicyEngineError.AddressBlacklisted]:
    "Target address is blacklisted \u2014 operation permanently denied",
  [PolicyEngineError.ProgramNotGreenlisted]:
    "Target program is not on the greenlist",
  [PolicyEngineError.TokenNotGreenlisted]:
    "Token mint is not on the greenlist",
  [PolicyEngineError.RecipientNotWhitelisted]:
    "Recipient is not on the whitelist",
  [PolicyEngineError.RecipientRequiresCosign]:
    "Recipient is not whitelisted and require_cosign_new_recipient is enabled \u2014 use cosigned",
  [PolicyEngineError.PerTxLimitExceeded]:
    "USDC amount exceeds per-transaction limit",
  [PolicyEngineError.DailyLimitExceeded]:
    "USDC amount would exceed daily spending limit",
  [PolicyEngineError.SessionLimitExceeded]:
    "USDC amount would exceed session key spending limit",
  [PolicyEngineError.Tier2ThresholdExceeded]:
    "USDC amount exceeds Tier 2 threshold \u2014 owner co-sign required",
  [PolicyEngineError.ArithmeticOverflow]:
    "Arithmetic overflow in spending calculation",
  [PolicyEngineError.InvalidDayEpoch]:
    "Provided day_epoch does not match the current UTC day",
  [PolicyEngineError.TrackerDayMismatch]:
    "Spending tracker day_epoch does not match current day",
  [PolicyEngineError.TrackerNotExpired]:
    "Spending tracker has not expired yet \u2014 cannot close",
  [PolicyEngineError.InvalidSessionKeyWindow]:
    "Session key valid_until must be after valid_after",
  [PolicyEngineError.InvalidSessionKeySpendingLimit]:
    "Session key spending limit must be greater than zero",
  [PolicyEngineError.InvalidOperatingHoursStart]:
    "Operating hours start must be less than 86400",
  [PolicyEngineError.InvalidOperatingHoursEnd]:
    "Operating hours end must be less than 86400",
  [PolicyEngineError.UsdcAmountMismatch]:
    "Declared USDC amount does not match actual Token Program transfer amount",
  [PolicyEngineError.InsufficientRemainingAccounts]:
    "Insufficient remaining accounts for policy checks",
  [PolicyEngineError.TokenInstructionNotAllowed]:
    "Only Transfer and TransferChecked are allowed for Token Programs",
  [PolicyEngineError.TokenMintRequired]:
    "token_mint is required when target is a Token Program",
  [PolicyEngineError.UsdcSpentExceedsDeclared]:
    "Actual USDC spent exceeds declared usdc_amount",
  [PolicyEngineError.UseExecuteActionForTokenTransfers]:
    "Use execute_action for direct Token Program transfers, not swap",
  [PolicyEngineError.SystemProgramNotAllowedInSwap]:
    "System Program cannot be targeted by swap instruction",
  [PolicyEngineError.TokenAccountAuthorityChanged]:
    "Token account authority changed during CPI \u2014 possible authority theft",
  [PolicyEngineError.OutputBelowMinimum]:
    "Swap output amount is below declared minimum",
  [PolicyEngineError.InvalidTokenAccount]:
    "Token account data is too short or malformed",
  [PolicyEngineError.InputMintMismatch]:
    "Input token account mint does not match declared input_mint",
  [PolicyEngineError.OutputMintMismatch]:
    "Output token account mint does not match declared output_mint",
  [PolicyEngineError.RecipientNotAllowed]:
    "Recipient is not allowed by any policy or whitelist entry",
  [PolicyEngineError.RecipientPerTxLimitExceeded]:
    "Per-recipient per-transaction USDC limit exceeded",
  [PolicyEngineError.RecipientDailyLimitExceeded]:
    "Per-recipient daily USDC limit exceeded",
  [PolicyEngineError.SwapPairNotAllowed]:
    "Swap pair is not allowed — no SwapPairPolicy exists for this mint pair",
  [PolicyEngineError.InvalidSwapPairOrder]:
    "Swap pair mints must be passed in canonical order (mint_a < mint_b by bytes)",
  [PolicyEngineError.InvalidRecipientPolicyData]:
    "RecipientPolicy account data is too short or malformed",
  [PolicyEngineError.InvalidRecipientPolicyMode]:
    "Invalid recipient policy mode (must be 0=allow or 1=cosign_required)",
  [PolicyEngineError.RecipientPolicyCosignRequired]:
    "Recipient policy requires owner co-sign for this recipient",
  [PolicyEngineError.RecipientMismatch]:
    "CPI destination account owner does not match declared recipient",
  [PolicyEngineError.TokenMintMismatch]:
    "CPI source account mint does not match declared token_mint",
  [PolicyEngineError.InvalidTokenProgram]:
    "Invalid token program: must be SPL Token or Token-2022",
  [PolicyEngineError.SourceMintMismatch]:
    "Source token account mint does not match token_mint",
  [PolicyEngineError.DestinationMintMismatch]:
    "Destination token account mint does not match token_mint",
  [PolicyEngineError.DestinationOwnerMismatch]:
    "Destination token account owner does not match recipient",
};

// Factory errors (from programs/vault_factory/src/errors.rs)
export enum FactoryError {
  FactoryPaused = 6000,
  VaultOwnerMismatch = 6001,
  NoPendingAdmin = 6002,
  NotPendingAdmin = 6003,
  LabelTooLong = 6004,
  VaultAlreadyInactive = 6005,
  ArithmeticOverflow = 6006,
  LabelEmpty = 6007,
}

const FACTORY_MESSAGES: Record<FactoryError, string> = {
  [FactoryError.FactoryPaused]:
    "Factory is paused \u2014 no new vaults can be created",
  [FactoryError.VaultOwnerMismatch]:
    "Vault owner does not match the signer",
  [FactoryError.NoPendingAdmin]:
    "No pending admin transfer to accept",
  [FactoryError.NotPendingAdmin]: "Signer is not the pending admin",
  [FactoryError.LabelTooLong]: "Label exceeds 32 bytes",
  [FactoryError.VaultAlreadyInactive]: "Vault registry is already inactive",
  [FactoryError.ArithmeticOverflow]: "Arithmetic overflow",
  [FactoryError.LabelEmpty]: "Label cannot be empty",
};

// Reverse-lookup maps  (code -> enum name)
const POLICY_ENGINE_NAMES: Record<number, string> = {};
for (const key of Object.keys(PolicyEngineError).filter((k) =>
  isNaN(Number(k))
)) {
  POLICY_ENGINE_NAMES[
    PolicyEngineError[key as keyof typeof PolicyEngineError] as number
  ] = key;
}

const FACTORY_NAMES: Record<number, string> = {};
for (const key of Object.keys(FactoryError).filter((k) => isNaN(Number(k)))) {
  FACTORY_NAMES[FactoryError[key as keyof typeof FactoryError] as number] =
    key;
}

// parseError
export interface ParsedProgramError {
  program: "policy_engine" | "factory";
  code: number;
  name: string;
  message: string;
}

/**
 * Attempt to extract a structured program error from an Anchor/Solana error.
 *
 * Handles the common shapes emitted by Anchor:
 *   - `err.error.errorCode.number` (Anchor >= 0.26 AnchorError)
 *   - `err.code` (legacy ProgramError wrapper)
 *   - `err.logs` string scan for "Error Number: XXXX"
 *
 * Because both programs use the same 6000-based offset, the caller can
 * optionally hint which program they expect. Without a hint, the function
 * tries both maps; if the code exists in both, it defaults to policy_engine.
 *
 * @returns Structured error info, or `null` if the error is not a recognised
 *          program error.
 */
export function parseError(
  err: any,
  programHint?: "policy_engine" | "factory"
): ParsedProgramError | null {
  const code = extractCode(err);
  if (code === null) return null;

  // Try to resolve against the hinted program first, then the other.
  const order: Array<"policy_engine" | "factory"> = programHint
    ? [programHint, programHint === "policy_engine" ? "factory" : "policy_engine"]
    : ["policy_engine", "factory"];

  for (const program of order) {
    if (program === "policy_engine" && POLICY_ENGINE_NAMES[code] !== undefined) {
      return {
        program: "policy_engine",
        code,
        name: POLICY_ENGINE_NAMES[code],
        message:
          POLICY_ENGINE_MESSAGES[code as PolicyEngineError] ??
          "Unknown policy engine error",
      };
    }
    if (program === "factory" && FACTORY_NAMES[code] !== undefined) {
      return {
        program: "factory",
        code,
        name: FACTORY_NAMES[code],
        message:
          FACTORY_MESSAGES[code as FactoryError] ??
          "Unknown factory error",
      };
    }
  }

  return null;
}

// Internal helpers
function extractCode(err: any): number | null {
  if (err == null) return null;

  // Anchor >= 0.26 AnchorError shape
  if (typeof err?.error?.errorCode?.number === "number") {
    return err.error.errorCode.number;
  }

  // Legacy ProgramError / raw code
  if (typeof err?.code === "number") {
    return err.code;
  }

  // Fallback: scan logs for "Error Number: XXXX"
  const logs: string[] | undefined = err?.logs ?? err?.simulationResponse?.logs;
  if (Array.isArray(logs)) {
    for (const line of logs) {
      const match = line.match(/Error Number:\s*(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
  }

  // Fallback: Anchor sometimes wraps as err.message containing the code
  if (typeof err?.message === "string") {
    const match = err.message.match(/custom program error:\s*0x([0-9a-fA-F]+)/);
    if (match) {
      return parseInt(match[1], 16);
    }
  }

  return null;
}
