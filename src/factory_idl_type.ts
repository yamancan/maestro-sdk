/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/vault_factory.json`.
 */
export type VaultFactory = {
  "address": "4uYWVucabDeyC8c4CncQjwi6RjBcM46TVePhmob9tRP2",
  "metadata": {
    "name": "vaultFactory",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Factory program for creating and registering Agent Policy Engine vaults"
  },
  "instructions": [
    {
      "name": "acceptAdmin",
      "discriminator": [
        112,
        42,
        45,
        90,
        116,
        181,
        13,
        170
      ],
      "accounts": [
        {
          "name": "newAdmin",
          "signer": true
        },
        {
          "name": "factory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121
                ]
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "createVaultViaFactory",
      "discriminator": [
        102,
        183,
        118,
        170,
        51,
        4,
        155,
        241
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "factory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "treasury",
          "writable": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "vaultConfig",
          "writable": true
        },
        {
          "name": "registry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
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
          "name": "ownerIndex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  119,
                  110,
                  101,
                  114,
                  95,
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "policyEngineProgram"
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
        },
        {
          "name": "label",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "deregisterVault",
      "discriminator": [
        87,
        91,
        171,
        241,
        162,
        95,
        105,
        34
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "registry"
          ]
        },
        {
          "name": "registry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "registry.vault",
                "account": "vaultRegistry"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "initializeFactory",
      "discriminator": [
        179,
        64,
        75,
        250,
        39,
        254,
        240,
        178
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "factory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121
                ]
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
          "name": "treasury",
          "type": "pubkey"
        },
        {
          "name": "creationFeeLamports",
          "type": "u64"
        },
        {
          "name": "policyEngineProgram",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "registerExistingVault",
      "discriminator": [
        194,
        132,
        160,
        109,
        199,
        79,
        208,
        26
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "factory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "vault"
        },
        {
          "name": "registry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
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
          "name": "ownerIndex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  119,
                  110,
                  101,
                  114,
                  95,
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              },
              {
                "kind": "account",
                "path": "owner"
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
          "name": "label",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "transferAdmin",
      "discriminator": [
        42,
        242,
        66,
        106,
        228,
        10,
        111,
        156
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "factory"
          ]
        },
        {
          "name": "factory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updateFactoryConfig",
      "discriminator": [
        219,
        46,
        19,
        240,
        1,
        37,
        160,
        26
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "factory"
          ]
        },
        {
          "name": "factory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  99,
                  116,
                  111,
                  114,
                  121
                ]
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
              "name": "updateFactoryConfigParams"
            }
          }
        }
      ]
    },
    {
      "name": "updateVaultLabel",
      "discriminator": [
        126,
        149,
        23,
        39,
        238,
        47,
        199,
        247
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "registry"
          ]
        },
        {
          "name": "registry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "registry.vault",
                "account": "vaultRegistry"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "label",
          "type": "bytes"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "factoryState",
      "discriminator": [
        91,
        157,
        184,
        99,
        123,
        112,
        102,
        7
      ]
    },
    {
      "name": "ownerIndex",
      "discriminator": [
        28,
        249,
        139,
        158,
        18,
        18,
        173,
        96
      ]
    },
    {
      "name": "vaultRegistry",
      "discriminator": [
        15,
        54,
        133,
        46,
        80,
        169,
        250,
        79
      ]
    }
  ],
  "events": [
    {
      "name": "adminTransferCompleted",
      "discriminator": [
        59,
        133,
        122,
        193,
        164,
        142,
        48,
        94
      ]
    },
    {
      "name": "adminTransferInitiated",
      "discriminator": [
        157,
        255,
        0,
        92,
        52,
        106,
        16,
        156
      ]
    },
    {
      "name": "factoryConfigUpdated",
      "discriminator": [
        215,
        69,
        11,
        1,
        99,
        165,
        45,
        30
      ]
    },
    {
      "name": "factoryInitialized",
      "discriminator": [
        20,
        86,
        103,
        75,
        20,
        220,
        162,
        63
      ]
    },
    {
      "name": "vaultDeregistered",
      "discriminator": [
        30,
        99,
        151,
        252,
        28,
        145,
        204,
        91
      ]
    },
    {
      "name": "vaultLabelUpdated",
      "discriminator": [
        167,
        208,
        103,
        63,
        184,
        78,
        14,
        235
      ]
    },
    {
      "name": "vaultRegistered",
      "discriminator": [
        215,
        55,
        28,
        170,
        12,
        58,
        41,
        93
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "factoryPaused",
      "msg": "Factory is paused — no new vaults can be created"
    },
    {
      "code": 6001,
      "name": "vaultOwnerMismatch",
      "msg": "Vault owner does not match the signer"
    },
    {
      "code": 6002,
      "name": "noPendingAdmin",
      "msg": "No pending admin transfer to accept"
    },
    {
      "code": 6003,
      "name": "notPendingAdmin",
      "msg": "Signer is not the pending admin"
    },
    {
      "code": 6004,
      "name": "labelTooLong",
      "msg": "Label exceeds 32 bytes"
    },
    {
      "code": 6005,
      "name": "vaultAlreadyInactive",
      "msg": "Vault registry is already inactive"
    },
    {
      "code": 6006,
      "name": "arithmeticOverflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6007,
      "name": "labelEmpty",
      "msg": "Label cannot be empty"
    }
  ],
  "types": [
    {
      "name": "adminTransferCompleted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldAdmin",
            "type": "pubkey"
          },
          {
            "name": "newAdmin",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "adminTransferInitiated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentAdmin",
            "type": "pubkey"
          },
          {
            "name": "pendingAdmin",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "factoryConfigUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "factoryInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "type": "pubkey"
          },
          {
            "name": "policyEngineProgram",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "factoryState",
      "docs": [
        "Global factory singleton, one per deployment.",
        "Controls fee collection, pausing, and tracks total vaults."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "docs": [
              "Authority for config updates and admin operations."
            ],
            "type": "pubkey"
          },
          {
            "name": "pendingAdmin",
            "docs": [
              "Pending admin for two-step transfer (Pubkey::default() = none pending)."
            ],
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "docs": [
              "Fee destination account."
            ],
            "type": "pubkey"
          },
          {
            "name": "creationFeeLamports",
            "docs": [
              "SOL fee per vault creation in lamports (0 = free)."
            ],
            "type": "u64"
          },
          {
            "name": "totalVaultsCreated",
            "docs": [
              "Total vaults ever created through the factory."
            ],
            "type": "u64"
          },
          {
            "name": "isPaused",
            "docs": [
              "Emergency stop, blocks new vault creation."
            ],
            "type": "bool"
          },
          {
            "name": "policyEngineProgram",
            "docs": [
              "The policy engine program ID for CPI validation."
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
      "name": "ownerIndex",
      "docs": [
        "Index tracking how many vaults an owner has registered.",
        "One per owner."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "docs": [
              "The owner this index belongs to."
            ],
            "type": "pubkey"
          },
          {
            "name": "vaultCount",
            "docs": [
              "Number of vaults registered by this owner."
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
      "name": "updateFactoryConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "treasury",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "creationFeeLamports",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "isPaused",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "policyEngineProgram",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "vaultDeregistered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "registry",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultLabelUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "registry",
            "type": "pubkey"
          },
          {
            "name": "vault",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultRegistered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "vaultIndex",
            "type": "u64"
          },
          {
            "name": "registry",
            "type": "pubkey"
          },
          {
            "name": "viaFactory",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "vaultRegistry",
      "docs": [
        "Registry entry for a vault, one per registered vault.",
        "Enables discovery and tracking of vaults by owner."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "docs": [
              "The vault owner."
            ],
            "type": "pubkey"
          },
          {
            "name": "vault",
            "docs": [
              "The policy engine vault PDA address."
            ],
            "type": "pubkey"
          },
          {
            "name": "vaultIndex",
            "docs": [
              "The owner's vault index in the policy engine."
            ],
            "type": "u64"
          },
          {
            "name": "createdAt",
            "docs": [
              "Unix timestamp of registration."
            ],
            "type": "i64"
          },
          {
            "name": "label",
            "docs": [
              "User-provided label (padded with zeroes)."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "isActive",
            "docs": [
              "Whether this vault is actively registered."
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
    }
  ]
};
