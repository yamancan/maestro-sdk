/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/agent_policy_engine.json`.
 */
export type AgentPolicyEngine = {
  "address": "BFLP2j3M32pvmnhuF6uDrGPAL7DYctWQqG1UwgzXdrSt",
  "metadata": {
    "name": "agentPolicyEngine",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Agentic Policy Engine on Solana, on-chain policy enforcement for AI agent wallets"
  },
  "instructions": [
    {
      "name": "addBlacklist",
      "discriminator": [
        217,
        13,
        249,
        96,
        5,
        121,
        73,
        110
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault"
        },
        {
          "name": "blacklistEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  97,
                  99,
                  107,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "address"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "addGreenlist",
      "discriminator": [
        114,
        57,
        190,
        160,
        142,
        218,
        118,
        135
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault"
        },
        {
          "name": "greenlistEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  101,
                  101,
                  110,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "entryPubkey"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "entryPubkey",
          "type": "pubkey"
        },
        {
          "name": "swapOnly",
          "type": "bool"
        }
      ]
    },
    {
      "name": "addSwapPair",
      "discriminator": [
        49,
        83,
        237,
        255,
        106,
        125,
        239,
        114
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault"
        },
        {
          "name": "swapPairPolicy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  119,
                  97,
                  112,
                  95,
                  112,
                  97,
                  105,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "mintA"
              },
              {
                "kind": "arg",
                "path": "mintB"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "mintA",
          "type": "pubkey"
        },
        {
          "name": "mintB",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "addWhitelist",
      "discriminator": [
        215,
        46,
        143,
        176,
        108,
        113,
        24,
        1
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault"
        },
        {
          "name": "whitelistEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "address"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "closeRecipientPolicy",
      "discriminator": [
        175,
        169,
        6,
        251,
        26,
        15,
        11,
        36
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "relations": [
            "recipientPolicy"
          ]
        },
        {
          "name": "recipientPolicy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  99,
                  105,
                  112,
                  105,
                  101,
                  110,
                  116,
                  95,
                  112,
                  111,
                  108,
                  105,
                  99,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "recipient"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "recipient",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "closeSessionKey",
      "discriminator": [
        73,
        161,
        117,
        185,
        58,
        70,
        184,
        136
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "relations": [
            "sessionKey"
          ]
        },
        {
          "name": "sessionKey",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "closeSpentTracker",
      "discriminator": [
        49,
        95,
        98,
        50,
        68,
        173,
        14,
        10
      ],
      "accounts": [
        {
          "name": "payer",
          "docs": [
            "Receives the rent refund."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "vault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault.owner",
                "account": "vault"
              },
              {
                "kind": "account",
                "path": "vault.vault_index",
                "account": "vault"
              }
            ]
          },
          "relations": [
            "spendingTracker"
          ]
        },
        {
          "name": "spendingTracker",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "closeVault",
      "discriminator": [
        141,
        103,
        17,
        126,
        72,
        75,
        29,
        29
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "writable": true,
          "relations": [
            "vaultConfig"
          ]
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createRecipientPolicy",
      "discriminator": [
        228,
        205,
        14,
        18,
        149,
        105,
        178,
        9
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault"
        },
        {
          "name": "recipientPolicy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  99,
                  105,
                  112,
                  105,
                  101,
                  110,
                  116,
                  95,
                  112,
                  111,
                  108,
                  105,
                  99,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "recipient"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "recipient",
          "type": "pubkey"
        },
        {
          "name": "perTxLimitUsdc",
          "type": "u64"
        },
        {
          "name": "dailyLimitUsdc",
          "type": "u64"
        },
        {
          "name": "mode",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createSessionKey",
      "discriminator": [
        137,
        204,
        246,
        242,
        200,
        143,
        215,
        56
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "sessionKey",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  101,
                  115,
                  115,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "agent"
              },
              {
                "kind": "account",
                "path": "vault.session_counter",
                "account": "vault"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "agent",
          "type": "pubkey"
        },
        {
          "name": "validAfter",
          "type": "i64"
        },
        {
          "name": "validUntil",
          "type": "i64"
        },
        {
          "name": "spendingLimitUsdc",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createVault",
      "discriminator": [
        29,
        237,
        247,
        208,
        193,
        82,
        54,
        135
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "vaultIndex"
              }
            ]
          }
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "vaultIndex",
          "type": "u64"
        },
        {
          "name": "usdcMint",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "executeAction",
      "discriminator": [
        246,
        137,
        105,
        113,
        247,
        6,
        223,
        174
      ],
      "accounts": [
        {
          "name": "agent",
          "signer": true
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault.owner",
                "account": "vault"
              },
              {
                "kind": "account",
                "path": "vault.vault_index",
                "account": "vault"
              }
            ]
          },
          "relations": [
            "vaultConfig",
            "sessionKey",
            "spendingTracker"
          ]
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ]
          }
        },
        {
          "name": "sessionKey",
          "writable": true
        },
        {
          "name": "spendingTracker",
          "writable": true
        },
        {
          "name": "targetBlacklistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  97,
                  99,
                  107,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "targetProgram"
              }
            ]
          }
        },
        {
          "name": "targetGreenlistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  101,
                  101,
                  110,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "targetProgram"
              }
            ]
          }
        },
        {
          "name": "targetProgram"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "executeActionParams"
            }
          }
        }
      ]
    },
    {
      "name": "executeActionCosigned",
      "discriminator": [
        159,
        199,
        210,
        227,
        191,
        95,
        119,
        114
      ],
      "accounts": [
        {
          "name": "agent",
          "signer": true
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault.owner",
                "account": "vault"
              },
              {
                "kind": "account",
                "path": "vault.vault_index",
                "account": "vault"
              }
            ]
          },
          "relations": [
            "vaultConfig",
            "sessionKey",
            "spendingTracker"
          ]
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ]
          }
        },
        {
          "name": "sessionKey",
          "writable": true
        },
        {
          "name": "spendingTracker",
          "writable": true
        },
        {
          "name": "targetBlacklistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  97,
                  99,
                  107,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "targetProgram"
              }
            ]
          }
        },
        {
          "name": "targetGreenlistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  101,
                  101,
                  110,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "targetProgram"
              }
            ]
          }
        },
        {
          "name": "targetProgram"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "executeActionParams"
            }
          }
        }
      ]
    },
    {
      "name": "executeActionSwap",
      "discriminator": [
        98,
        64,
        32,
        238,
        53,
        154,
        148,
        54
      ],
      "accounts": [
        {
          "name": "agent",
          "signer": true
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault.owner",
                "account": "vault"
              },
              {
                "kind": "account",
                "path": "vault.vault_index",
                "account": "vault"
              }
            ]
          },
          "relations": [
            "vaultConfig",
            "sessionKey",
            "spendingTracker"
          ]
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ]
          }
        },
        {
          "name": "sessionKey",
          "writable": true
        },
        {
          "name": "spendingTracker",
          "writable": true
        },
        {
          "name": "targetBlacklistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  97,
                  99,
                  107,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "targetProgram"
              }
            ]
          }
        },
        {
          "name": "targetGreenlistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  101,
                  101,
                  110,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "targetProgram"
              }
            ]
          }
        },
        {
          "name": "targetProgram"
        },
        {
          "name": "vaultInputTokenAccount",
          "docs": [
            "Vault's input token account (will be debited by the DEX).",
            "Anchor verifies this token account is owned by the vault PDA."
          ],
          "writable": true
        },
        {
          "name": "vaultOutputTokenAccount",
          "docs": [
            "Vault's output token account (will be credited by the DEX).",
            "Anchor verifies this token account is owned by the vault PDA."
          ],
          "writable": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "executeSwapParams"
            }
          }
        }
      ]
    },
    {
      "name": "executeActionSwapCosigned",
      "discriminator": [
        92,
        118,
        52,
        172,
        185,
        75,
        246,
        98
      ],
      "accounts": [
        {
          "name": "agent",
          "signer": true
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault.owner",
                "account": "vault"
              },
              {
                "kind": "account",
                "path": "vault.vault_index",
                "account": "vault"
              }
            ]
          },
          "relations": [
            "vaultConfig",
            "sessionKey",
            "spendingTracker"
          ]
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ]
          }
        },
        {
          "name": "sessionKey",
          "writable": true
        },
        {
          "name": "spendingTracker",
          "writable": true
        },
        {
          "name": "targetBlacklistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  97,
                  99,
                  107,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "targetProgram"
              }
            ]
          }
        },
        {
          "name": "targetGreenlistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  101,
                  101,
                  110,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "targetProgram"
              }
            ]
          }
        },
        {
          "name": "targetProgram"
        },
        {
          "name": "vaultInputTokenAccount",
          "docs": [
            "Vault's input token account (will be debited by the DEX)."
          ],
          "writable": true
        },
        {
          "name": "vaultOutputTokenAccount",
          "docs": [
            "Vault's output token account (will be credited by the DEX)."
          ],
          "writable": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "executeSwapParams"
            }
          }
        }
      ]
    },
    {
      "name": "executeActionTransfer",
      "discriminator": [
        130,
        176,
        83,
        155,
        166,
        10,
        19,
        60
      ],
      "accounts": [
        {
          "name": "agent",
          "signer": true
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault.owner",
                "account": "vault"
              },
              {
                "kind": "account",
                "path": "vault.vault_index",
                "account": "vault"
              }
            ]
          },
          "relations": [
            "vaultConfig",
            "sessionKey",
            "spendingTracker"
          ]
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ]
          }
        },
        {
          "name": "sessionKey",
          "writable": true
        },
        {
          "name": "spendingTracker",
          "writable": true
        },
        {
          "name": "vaultSourceAta",
          "docs": [
            "Vault's source token account (debited by transfer)."
          ],
          "writable": true
        },
        {
          "name": "destinationAta",
          "writable": true
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "tokenBlacklistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  97,
                  99,
                  107,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ]
          }
        },
        {
          "name": "tokenGreenlistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  101,
                  101,
                  110,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "executeTransferParams"
            }
          }
        }
      ]
    },
    {
      "name": "executeActionTransferCosigned",
      "discriminator": [
        198,
        50,
        72,
        200,
        0,
        32,
        233,
        82
      ],
      "accounts": [
        {
          "name": "agent",
          "signer": true
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault.owner",
                "account": "vault"
              },
              {
                "kind": "account",
                "path": "vault.vault_index",
                "account": "vault"
              }
            ]
          },
          "relations": [
            "vaultConfig",
            "sessionKey",
            "spendingTracker"
          ]
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ]
          }
        },
        {
          "name": "sessionKey",
          "writable": true
        },
        {
          "name": "spendingTracker",
          "writable": true
        },
        {
          "name": "vaultSourceAta",
          "docs": [
            "Vault's source token account (debited by transfer)."
          ],
          "writable": true
        },
        {
          "name": "destinationAta",
          "writable": true
        },
        {
          "name": "tokenMint"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "tokenBlacklistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  97,
                  99,
                  107,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ]
          }
        },
        {
          "name": "tokenGreenlistCheck",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  101,
                  101,
                  110,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "executeTransferParams"
            }
          }
        }
      ]
    },
    {
      "name": "freezeVault",
      "discriminator": [
        144,
        211,
        63,
        236,
        97,
        31,
        170,
        175
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "initTracker",
      "discriminator": [
        92,
        153,
        116,
        105,
        78,
        25,
        241,
        33
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault.owner",
                "account": "vault"
              },
              {
                "kind": "account",
                "path": "vault.vault_index",
                "account": "vault"
              }
            ]
          }
        },
        {
          "name": "spendingTracker",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  97,
                  99,
                  107,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "dayEpoch"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "dayEpoch",
          "type": "u64"
        }
      ]
    },
    {
      "name": "removeBlacklist",
      "discriminator": [
        39,
        82,
        241,
        133,
        41,
        2,
        161,
        21
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "relations": [
            "blacklistEntry"
          ]
        },
        {
          "name": "blacklistEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  97,
                  99,
                  107,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "address"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "removeGreenlist",
      "discriminator": [
        228,
        80,
        39,
        204,
        110,
        58,
        154,
        22
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "relations": [
            "greenlistEntry"
          ]
        },
        {
          "name": "greenlistEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  101,
                  101,
                  110,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "entryPubkey"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "entryPubkey",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "removeSwapPair",
      "discriminator": [
        152,
        140,
        229,
        149,
        112,
        227,
        77,
        80
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "relations": [
            "swapPairPolicy"
          ]
        },
        {
          "name": "swapPairPolicy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  119,
                  97,
                  112,
                  95,
                  112,
                  97,
                  105,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "mintA"
              },
              {
                "kind": "arg",
                "path": "mintB"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "mintA",
          "type": "pubkey"
        },
        {
          "name": "mintB",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "removeWhitelist",
      "discriminator": [
        148,
        244,
        73,
        234,
        131,
        55,
        247,
        90
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "relations": [
            "whitelistEntry"
          ]
        },
        {
          "name": "whitelistEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "address"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "revokeAllSessions",
      "discriminator": [
        18,
        164,
        208,
        235,
        184,
        190,
        45,
        11
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "revokeSessionKey",
      "discriminator": [
        81,
        192,
        32,
        110,
        104,
        116,
        144,
        151
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "relations": [
            "sessionKey"
          ]
        },
        {
          "name": "sessionKey",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "unfreezeVault",
      "discriminator": [
        145,
        244,
        206,
        234,
        251,
        250,
        116,
        183
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "updateRecipientPolicy",
      "discriminator": [
        247,
        97,
        192,
        122,
        128,
        47,
        199,
        85
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "relations": [
            "recipientPolicy"
          ]
        },
        {
          "name": "recipientPolicy",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  99,
                  105,
                  112,
                  105,
                  101,
                  110,
                  116,
                  95,
                  112,
                  111,
                  108,
                  105,
                  99,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "arg",
                "path": "recipient"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "recipient",
          "type": "pubkey"
        },
        {
          "name": "perTxLimitUsdc",
          "type": "u64"
        },
        {
          "name": "dailyLimitUsdc",
          "type": "u64"
        },
        {
          "name": "mode",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateVaultConfig",
      "discriminator": [
        122,
        3,
        21,
        222,
        158,
        255,
        238,
        157
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "relations": [
            "vaultConfig"
          ]
        },
        {
          "name": "vaultConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "vault"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "updateVaultConfigParams"
            }
          }
        }
      ]
    },
    {
      "name": "withdrawSol",
      "discriminator": [
        145,
        131,
        74,
        136,
        65,
        137,
        42,
        38
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "destination",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawSpl",
      "discriminator": [
        181,
        154,
        94,
        86,
        62,
        115,
        6,
        186
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "vault"
          ]
        },
        {
          "name": "vault"
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blacklistEntry",
      "discriminator": [
        218,
        179,
        231,
        40,
        141,
        25,
        168,
        189
      ]
    },
    {
      "name": "greenlistEntry",
      "discriminator": [
        175,
        13,
        79,
        9,
        251,
        229,
        0,
        255
      ]
    },
    {
      "name": "recipientPolicy",
      "discriminator": [
        182,
        177,
        146,
        52,
        243,
        77,
        166,
        188
      ]
    },
    {
      "name": "sessionKey",
      "discriminator": [
        93,
        186,
        163,
        139,
        160,
        255,
        81,
        112
      ]
    },
    {
      "name": "spendingTracker",
      "discriminator": [
        28,
        90,
        10,
        66,
        40,
        125,
        34,
        122
      ]
    },
    {
      "name": "swapPairPolicy",
      "discriminator": [
        204,
        66,
        96,
        199,
        136,
        60,
        152,
        238
      ]
    },
    {
      "name": "vault",
      "discriminator": [
        211,
        8,
        232,
        43,
        2,
        152,
        117,
        119
      ]
    },
    {
      "name": "vaultConfig",
      "discriminator": [
        99,
        86,
        43,
        216,
        184,
        102,
        119,
        77
      ]
    },
    {
      "name": "whitelistEntry",
      "discriminator": [
        51,
        70,
        173,
        81,
        219,
        192,
        234,
        62
      ]
    }
  ],
  "events": [
    {
      "name": "actionExecuted",
      "discriminator": [
        116,
        101,
        146,
        36,
        160,
        153,
        182,
        233
      ]
    },
    {
      "name": "allSessionsRevoked",
      "discriminator": [
        180,
        122,
        205,
        144,
        151,
        100,
        22,
        53
      ]
    },
    {
      "name": "blacklistUpdated",
      "discriminator": [
        246,
        166,
        44,
        25,
        56,
        182,
        121,
        74
      ]
    },
    {
      "name": "greenlistUpdated",
      "discriminator": [
        204,
        167,
        214,
        159,
        217,
        147,
        67,
        189
      ]
    },
    {
      "name": "ownerWithdrawal",
      "discriminator": [
        244,
        105,
        209,
        100,
        241,
        115,
        54,
        208
      ]
    },
    {
      "name": "recipientPolicyUpdated",
      "discriminator": [
        128,
        131,
        191,
        24,
        232,
        169,
        211,
        190
      ]
    },
    {
      "name": "sessionKeyClosed",
      "discriminator": [
        26,
        173,
        240,
        19,
        178,
        107,
        6,
        91
      ]
    },
    {
      "name": "sessionKeyCreated",
      "discriminator": [
        242,
        227,
        114,
        120,
        164,
        30,
        58,
        114
      ]
    },
    {
      "name": "sessionKeyRevoked",
      "discriminator": [
        18,
        208,
        143,
        205,
        85,
        72,
        180,
        176
      ]
    },
    {
      "name": "spendingTrackerInitialized",
      "discriminator": [
        121,
        145,
        158,
        7,
        107,
        190,
        69,
        242
      ]
    },
    {
      "name": "swapExecuted",
      "discriminator": [
        150,
        166,
        26,
        225,
        28,
        89,
        38,
        79
      ]
    },
    {
      "name": "swapPairUpdated",
      "discriminator": [
        80,
        14,
        126,
        19,
        97,
        103,
        46,
        67
      ]
    },
    {
      "name": "transferExecuted",
      "discriminator": [
        8,
        128,
        224,
        132,
        112,
        216,
        192,
        35
      ]
    },
    {
      "name": "vaultClosed",
      "discriminator": [
        238,
        129,
        38,
        228,
        227,
        118,
        249,
        215
      ]
    },
    {
      "name": "vaultConfigUpdated",
      "discriminator": [
        72,
        22,
        37,
        111,
        58,
        30,
        160,
        212
      ]
    },
    {
      "name": "vaultCreated",
      "discriminator": [
        117,
        25,
        120,
        254,
        75,
        236,
        78,
        115
      ]
    },
    {
      "name": "vaultFrozen",
      "discriminator": [
        13,
        199,
        172,
        111,
        88,
        10,
        151,
        247
      ]
    },
    {
      "name": "vaultUnfrozen",
      "discriminator": [
        128,
        194,
        79,
        155,
        85,
        31,
        226,
        170
      ]
    },
    {
      "name": "whitelistUpdated",
      "discriminator": [
        205,
        110,
        205,
        193,
        238,
        237,
        220,
        22
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "vaultFrozen",
      "msg": "Vault is frozen - all agent operations are blocked"
    },
    {
      "code": 6001,
      "name": "sessionKeyRevoked",
      "msg": "Session key has been revoked"
    },
    {
      "code": 6002,
      "name": "sessionKeyNonceMismatch",
      "msg": "Session key nonce does not match vault global nonce - key invalidated"
    },
    {
      "code": 6003,
      "name": "sessionKeyAgentMismatch",
      "msg": "Session key signer does not match the agent on the key"
    },
    {
      "code": 6004,
      "name": "sessionKeyNotYetValid",
      "msg": "Session key is not yet valid (valid_after is in the future)"
    },
    {
      "code": 6005,
      "name": "sessionKeyExpired",
      "msg": "Session key has expired (valid_until has passed)"
    },
    {
      "code": 6006,
      "name": "outsideOperatingHours",
      "msg": "Operation attempted outside allowed operating hours"
    },
    {
      "code": 6007,
      "name": "cooldownActive",
      "msg": "Vault is in cooldown period after a large transaction"
    },
    {
      "code": 6008,
      "name": "addressBlacklisted",
      "msg": "Target address is blacklisted - operation permanently denied"
    },
    {
      "code": 6009,
      "name": "programNotGreenlisted",
      "msg": "Target program is not on the greenlist"
    },
    {
      "code": 6010,
      "name": "tokenNotGreenlisted",
      "msg": "Token mint is not on the greenlist"
    },
    {
      "code": 6011,
      "name": "recipientNotWhitelisted",
      "msg": "Recipient is not on the whitelist"
    },
    {
      "code": 6012,
      "name": "recipientRequiresCosign",
      "msg": "Recipient is not whitelisted and require_cosign_new_recipient is enabled - use cosigned"
    },
    {
      "code": 6013,
      "name": "perTxLimitExceeded",
      "msg": "USDC amount exceeds per-transaction limit"
    },
    {
      "code": 6014,
      "name": "dailyLimitExceeded",
      "msg": "USDC amount would exceed daily spending limit"
    },
    {
      "code": 6015,
      "name": "sessionLimitExceeded",
      "msg": "USDC amount would exceed session key spending limit"
    },
    {
      "code": 6016,
      "name": "tier2ThresholdExceeded",
      "msg": "USDC amount exceeds Tier 2 threshold - owner co-sign required"
    },
    {
      "code": 6017,
      "name": "arithmeticOverflow",
      "msg": "Arithmetic overflow in spending calculation"
    },
    {
      "code": 6018,
      "name": "invalidDayEpoch",
      "msg": "Provided day_epoch does not match the current UTC day"
    },
    {
      "code": 6019,
      "name": "trackerDayMismatch",
      "msg": "Spending tracker day_epoch does not match current day"
    },
    {
      "code": 6020,
      "name": "trackerNotExpired",
      "msg": "Spending tracker has not expired yet — cannot close"
    },
    {
      "code": 6021,
      "name": "invalidSessionKeyWindow",
      "msg": "Session key valid_until must be after valid_after"
    },
    {
      "code": 6022,
      "name": "invalidSessionKeySpendingLimit",
      "msg": "Session key spending limit must be greater than zero"
    },
    {
      "code": 6023,
      "name": "invalidOperatingHoursStart",
      "msg": "Operating hours start must be less than 86400"
    },
    {
      "code": 6024,
      "name": "invalidOperatingHoursEnd",
      "msg": "Operating hours end must be less than 86400"
    },
    {
      "code": 6025,
      "name": "usdcAmountMismatch",
      "msg": "Declared USDC amount does not match actual Token Program transfer amount"
    },
    {
      "code": 6026,
      "name": "insufficientRemainingAccounts",
      "msg": "Insufficient remaining accounts for policy checks"
    },
    {
      "code": 6027,
      "name": "tokenInstructionNotAllowed",
      "msg": "Only Transfer and TransferChecked are allowed for Token Programs"
    },
    {
      "code": 6028,
      "name": "tokenMintRequired",
      "msg": "token_mint is required when target is a Token Program"
    },
    {
      "code": 6029,
      "name": "usdcSpentExceedsDeclared",
      "msg": "Actual USDC spent exceeds declared usdc_amount"
    },
    {
      "code": 6030,
      "name": "useExecuteActionForTokenTransfers",
      "msg": "Use execute_action for direct Token Program transfers, not swap"
    },
    {
      "code": 6031,
      "name": "systemProgramNotAllowedInSwap",
      "msg": "System Program cannot be targeted by swap instruction"
    },
    {
      "code": 6032,
      "name": "tokenAccountAuthorityChanged",
      "msg": "Token account authority changed during CPI — possible authority theft"
    },
    {
      "code": 6033,
      "name": "outputBelowMinimum",
      "msg": "Swap output amount is below declared minimum"
    },
    {
      "code": 6034,
      "name": "invalidTokenAccount",
      "msg": "Token account data is too short or malformed"
    },
    {
      "code": 6035,
      "name": "inputMintMismatch",
      "msg": "Input token account mint does not match declared input_mint"
    },
    {
      "code": 6036,
      "name": "outputMintMismatch",
      "msg": "Output token account mint does not match declared output_mint"
    },
    {
      "code": 6037,
      "name": "recipientNotAllowed",
      "msg": "Recipient is not allowed by any policy or whitelist entry"
    },
    {
      "code": 6038,
      "name": "recipientPerTxLimitExceeded",
      "msg": "Per-recipient per-transaction USDC limit exceeded"
    },
    {
      "code": 6039,
      "name": "recipientDailyLimitExceeded",
      "msg": "Per-recipient daily USDC limit exceeded"
    },
    {
      "code": 6040,
      "name": "swapPairNotAllowed",
      "msg": "Swap pair is not allowed — no SwapPairPolicy exists for this mint pair"
    },
    {
      "code": 6041,
      "name": "invalidSwapPairOrder",
      "msg": "Swap pair mints must be passed in canonical order (mint_a < mint_b by bytes)"
    },
    {
      "code": 6042,
      "name": "invalidRecipientPolicyData",
      "msg": "RecipientPolicy account data is too short or malformed"
    },
    {
      "code": 6043,
      "name": "invalidRecipientPolicyMode",
      "msg": "Invalid recipient policy mode (must be 0=allow or 1=cosign_required)"
    },
    {
      "code": 6044,
      "name": "recipientPolicyCosignRequired",
      "msg": "Recipient policy requires owner co-sign for this recipient"
    },
    {
      "code": 6045,
      "name": "recipientMismatch",
      "msg": "CPI destination account owner does not match declared recipient"
    },
    {
      "code": 6046,
      "name": "tokenMintMismatch",
      "msg": "CPI source account mint does not match declared token_mint"
    },
    {
      "code": 6047,
      "name": "invalidTokenProgram",
      "msg": "Invalid token program: must be SPL Token or Token-2022"
    },
    {
      "code": 6048,
      "name": "sourceMintMismatch",
      "msg": "Source token account mint does not match token_mint"
    },
    {
      "code": 6049,
      "name": "destinationMintMismatch",
      "msg": "Destination token account mint does not match token_mint"
    },
    {
      "code": 6050,
      "name": "destinationOwnerMismatch",
      "msg": "Destination token account owner does not match recipient"
    },
    {
      "code": 6051,
      "name": "typedTransferRequired",
      "msg": "Token Program transfers must use execute_action_transfer when require_typed_transfers is enabled"
    },
    {
      "code": 6052,
      "name": "programIsSwapOnly",
      "msg": "This program is marked swap_only — use execute_action_swap"
    },
    {
      "code": 6053,
      "name": "systemProgramNotAllowed",
      "msg": "System Program cannot be targeted via execute_action — use owner withdraw_sol"
    }
  ],
  "types": [
    {
      "name": "actionExecuted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "agent",
            "type": "pubkey"
          },
          {
            "name": "targetProgram",
            "type": "pubkey"
          },
          {
            "name": "usdcAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "cosigned",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "allSessionsRevoked",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "newNonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "blacklistEntry",
      "docs": [
        "Denied address, overrides all other checks.",
        "PDA existence = membership in the blacklist."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "docs": [
              "The vault this entry belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "address",
            "docs": [
              "Denied address."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "blacklistUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "added",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "executeActionParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instructionData",
            "type": "bytes"
          },
          {
            "name": "usdcAmount",
            "type": "u64"
          },
          {
            "name": "recipient",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "tokenMint",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "executeSwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instructionData",
            "type": "bytes"
          },
          {
            "name": "usdcAmount",
            "type": "u64"
          },
          {
            "name": "inputMint",
            "type": "pubkey"
          },
          {
            "name": "outputMint",
            "type": "pubkey"
          },
          {
            "name": "minimumOutputAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "executeTransferParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "recipient",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "greenlistEntry",
      "docs": [
        "Token mint or program address the agent is allowed to interact with.",
        "PDA existence = membership in the greenlist."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "docs": [
              "The vault this entry belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "pubkey",
            "docs": [
              "Token mint address or program address."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed."
            ],
            "type": "u8"
          },
          {
            "name": "swapOnly",
            "docs": [
              "If true, this program can only be called via execute_action_swap, not execute_action."
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "greenlistUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "pubkey",
            "type": "pubkey"
          },
          {
            "name": "added",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "ownerWithdrawal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "destination",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "isSol",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "recipientPolicy",
      "docs": [
        "Per-recipient spending policy with limits and mode control.",
        "",
        "Seeds: [b\"recipient_policy\", vault, recipient]",
        "One PDA per recipient per vault.",
        "",
        "Daily accounting is embedded (like SessionKey.amount_spent_usdc).",
        "When `daily_limit_usdc = 0`, the account is read-only (no write-back needed)."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "docs": [
              "The vault this policy belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "recipient",
            "docs": [
              "The recipient address this policy governs."
            ],
            "type": "pubkey"
          },
          {
            "name": "perTxLimitUsdc",
            "docs": [
              "Max USDC per single transaction to this recipient (0 = use vault default)."
            ],
            "type": "u64"
          },
          {
            "name": "dailyLimitUsdc",
            "docs": [
              "Max USDC per day to this recipient (0 = no per-recipient daily limit)."
            ],
            "type": "u64"
          },
          {
            "name": "totalSpentToday",
            "docs": [
              "USDC spent to this recipient today (auto-resets when day_epoch changes)."
            ],
            "type": "u64"
          },
          {
            "name": "dayEpoch",
            "docs": [
              "Which UTC day the total_spent_today counter belongs to."
            ],
            "type": "u64"
          },
          {
            "name": "mode",
            "docs": [
              "0 = allow (autonomous), 1 = cosign_required (owner must co-sign)."
            ],
            "type": "u8"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "recipientPolicyUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "recipient",
            "type": "pubkey"
          },
          {
            "name": "perTxLimitUsdc",
            "type": "u64"
          },
          {
            "name": "dailyLimitUsdc",
            "type": "u64"
          },
          {
            "name": "mode",
            "type": "u8"
          },
          {
            "name": "added",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "sessionKey",
      "docs": [
        "Time-bound, spending-limited permission for an agent to operate the vault."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "docs": [
              "The vault this session key belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "agent",
            "docs": [
              "The agent keypair that can use this session key."
            ],
            "type": "pubkey"
          },
          {
            "name": "nonce",
            "docs": [
              "Must match vault.global_session_nonce,  mismatch = invalidated."
            ],
            "type": "u64"
          },
          {
            "name": "validAfter",
            "docs": [
              "Unix timestamp after which the key is valid."
            ],
            "type": "i64"
          },
          {
            "name": "validUntil",
            "docs": [
              "Unix timestamp after which the key expires."
            ],
            "type": "i64"
          },
          {
            "name": "spendingLimitUsdc",
            "docs": [
              "Maximum USDC this session key is allowed to spend."
            ],
            "type": "u64"
          },
          {
            "name": "amountSpentUsdc",
            "docs": [
              "USDC spent so far using this session key."
            ],
            "type": "u64"
          },
          {
            "name": "isRevoked",
            "docs": [
              "Individually revoked by owner."
            ],
            "type": "bool"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "sessionKeyClosed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "sessionKey",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "sessionKeyCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "agent",
            "type": "pubkey"
          },
          {
            "name": "sessionKey",
            "type": "pubkey"
          },
          {
            "name": "validUntil",
            "type": "i64"
          },
          {
            "name": "spendingLimitUsdc",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "sessionKeyRevoked",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "sessionKey",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "spendingTracker",
      "docs": [
        "Daily USDC spending tracker. One PDA per vault per day.",
        "Created via `init_tracker`, closed via `close_spent_tracker` to reclaim rent."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "docs": [
              "The vault this tracker belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "dayEpoch",
            "docs": [
              "Day identifier: unix_timestamp / 86400."
            ],
            "type": "u64"
          },
          {
            "name": "totalSpentUsdc",
            "docs": [
              "Total USDC spent on this day."
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "spendingTrackerInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "dayEpoch",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "swapExecuted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "agent",
            "type": "pubkey"
          },
          {
            "name": "targetProgram",
            "type": "pubkey"
          },
          {
            "name": "inputMint",
            "type": "pubkey"
          },
          {
            "name": "outputMint",
            "type": "pubkey"
          },
          {
            "name": "inputAmount",
            "type": "u64"
          },
          {
            "name": "outputAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "cosigned",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "swapPairPolicy",
      "docs": [
        "Pair-level swap restriction. When `VaultConfig.swap_require_pair_policy` is",
        "true, `execute_action_swap` requires a SwapPairPolicy PDA to exist for the",
        "(input_mint, output_mint) pair.",
        "",
        "Seeds: [b\"swap_pair\", vault, min(mint_a, mint_b), max(mint_a, mint_b)]",
        "",
        "Mints are canonically sorted by bytes so USDC/SOL and SOL/USDC resolve to",
        "the same PDA."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "docs": [
              "The vault this policy belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "mintA",
            "docs": [
              "Canonically sorted smaller mint."
            ],
            "type": "pubkey"
          },
          {
            "name": "mintB",
            "docs": [
              "Canonically sorted larger mint."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "swapPairUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "mintA",
            "type": "pubkey"
          },
          {
            "name": "mintB",
            "type": "pubkey"
          },
          {
            "name": "added",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "transferExecuted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "agent",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "recipient",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "cosigned",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "updateVaultConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "perTxLimitUsdc",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "dailyLimitUsdc",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "operatingHoursStart",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "operatingHoursEnd",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "cooldownSeconds",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "cooldownThresholdUsdc",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "tier2ThresholdUsdc",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "requireCosignNewRecipient",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "swapRequirePairPolicy",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "requireTypedTransfers",
            "type": {
              "option": "bool"
            }
          }
        ]
      }
    },
    {
      "name": "vault",
      "docs": [
        "Central vault account, multiple per owner (distinguished by vault_index).",
        "Controls frozen state, session nonce, and identifies the USDC mint."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "docs": [
              "The owner who controls this vault (immutable after creation)."
            ],
            "type": "pubkey"
          },
          {
            "name": "usdcMint",
            "docs": [
              "USDC mint address for this network (devnet or mainnet)."
            ],
            "type": "pubkey"
          },
          {
            "name": "vaultIndex",
            "docs": [
              "Owner-chosen index for multi-vault support (used in PDA seeds)."
            ],
            "type": "u64"
          },
          {
            "name": "globalSessionNonce",
            "docs": [
              "Increment to invalidate all active session keys at once."
            ],
            "type": "u64"
          },
          {
            "name": "isFrozen",
            "docs": [
              "When true, all agent operations are blocked."
            ],
            "type": "bool"
          },
          {
            "name": "sessionCounter",
            "docs": [
              "Monotonic counter for session key creation (used in PDA seeds)."
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultClosed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultConfig",
      "docs": [
        "Vault configuration, spending limits, time controls, tier settings.",
        "Separate from Vault so updates don't require realloc on the main account."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "docs": [
              "The vault this config belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "perTxLimitUsdc",
            "docs": [
              "Max USDC per single transaction (0 = no limit). 6 decimals."
            ],
            "type": "u64"
          },
          {
            "name": "dailyLimitUsdc",
            "docs": [
              "Max USDC per 24h window (0 = no limit). 6 decimals."
            ],
            "type": "u64"
          },
          {
            "name": "operatingHoursStart",
            "docs": [
              "Seconds from midnight UTC when operations begin (u32::MAX = disabled)."
            ],
            "type": "u32"
          },
          {
            "name": "operatingHoursEnd",
            "docs": [
              "Seconds from midnight UTC when operations end (u32::MAX = disabled)."
            ],
            "type": "u32"
          },
          {
            "name": "cooldownSeconds",
            "docs": [
              "Forced wait in seconds after a large transaction (0 = disabled)."
            ],
            "type": "u32"
          },
          {
            "name": "cooldownThresholdUsdc",
            "docs": [
              "USDC threshold that triggers the cooldown (0 = disabled)."
            ],
            "type": "u64"
          },
          {
            "name": "lastCooldownTrigger",
            "docs": [
              "Unix timestamp of when cooldown was last triggered."
            ],
            "type": "i64"
          },
          {
            "name": "tier2ThresholdUsdc",
            "docs": [
              "USDC amount above which owner co-sign is required (0 = all Tier 1)."
            ],
            "type": "u64"
          },
          {
            "name": "requireCosignNewRecipient",
            "docs": [
              "If true, transfers to non-whitelisted addresses require owner co-sign."
            ],
            "type": "bool"
          },
          {
            "name": "swapRequirePairPolicy",
            "docs": [
              "If true, execute_action_swap requires a SwapPairPolicy PDA for the mint pair."
            ],
            "type": "bool"
          },
          {
            "name": "requireTypedTransfers",
            "docs": [
              "If true, execute_action/cosigned rejects Token Program targets — must use execute_action_transfer."
            ],
            "type": "bool"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultConfigUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "usdcMint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultFrozen",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultUnfrozen",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "whitelistEntry",
      "docs": [
        "Approved recipient address.",
        "PDA existence = membership in the whitelist."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "docs": [
              "The vault this entry belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "address",
            "docs": [
              "Approved recipient address."
            ],
            "type": "pubkey"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "whitelistUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "added",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
