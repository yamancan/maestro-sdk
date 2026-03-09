import {
  Connection,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { Program, BN, utils } from "@coral-xyz/anchor";
import {
  findFactoryPda,
  findRegistryPda,
  findOwnerIndexPda,
} from "./factory_pda";
import { findVaultPda, findVaultConfigPda } from "./pda";
import type {
  UpdateFactoryConfigParams,
  FactoryState,
  VaultRegistry,
  OwnerIndex,
} from "./factory_types";
import type { VaultFactory } from "./factory_idl_type";

export type { VaultFactory };

// Factory Admin Client
export class FactoryAdminClient {
  constructor(
    readonly program: Program<VaultFactory>,
    readonly admin: PublicKey
  ) {}

  private get factoryPda(): PublicKey {
    return findFactoryPda()[0];
  }

  async initializeFactory(
    treasury: PublicKey,
    creationFeeLamports: BN,
    policyEngineProgram: PublicKey
  ): Promise<string> {
    return this.program.methods
      .initializeFactory(treasury, creationFeeLamports, policyEngineProgram)
      .accounts({
        admin: this.admin,
        factory: this.factoryPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async updateFactoryConfig(
    params: UpdateFactoryConfigParams
  ): Promise<string> {
    return this.program.methods
      .updateFactoryConfig(params as any)
      .accounts({
        admin: this.admin,
        factory: this.factoryPda,
      } as any)
      .rpc();
  }

  async transferAdmin(newAdmin: PublicKey): Promise<string> {
    return this.program.methods
      .transferAdmin(newAdmin)
      .accounts({
        admin: this.admin,
        factory: this.factoryPda,
      } as any)
      .rpc();
  }

  async acceptAdmin(): Promise<string> {
    return this.program.methods
      .acceptAdmin()
      .accounts({
        newAdmin: this.admin,
        factory: this.factoryPda,
      } as any)
      .rpc();
  }

  async fetchFactory(): Promise<FactoryState> {
    return this.program.account.factoryState.fetch(
      this.factoryPda
    ) as unknown as FactoryState;
  }
}

// Factory Client (User Operations)
export class FactoryClient {
  constructor(
    readonly program: Program<VaultFactory>,
    readonly owner: PublicKey
  ) {}

  private get factoryPda(): PublicKey {
    return findFactoryPda()[0];
  }

  async createVaultViaFactory(
    vaultIndex: BN,
    usdcMint: PublicKey,
    label: Buffer
  ): Promise<string> {
    if (label.length === 0) {
      throw new Error('Label cannot be empty');
    }
    if (label.length > 32) {
      throw new Error('Label exceeds 32 bytes');
    }
    const [vaultPda] = findVaultPda(this.owner, vaultIndex);
    const [vaultConfigPda] = findVaultConfigPda(vaultPda);
    const [registryPda] = findRegistryPda(vaultPda);
    const [ownerIndexPda] = findOwnerIndexPda(this.owner);
    const factory = await this.program.account.factoryState.fetch(
      this.factoryPda
    );

    return this.program.methods
      .createVaultViaFactory(vaultIndex, usdcMint, label)
      .accounts({
        owner: this.owner,
        factory: this.factoryPda,
        treasury: factory.treasury,
        vault: vaultPda,
        vaultConfig: vaultConfigPda,
        registry: registryPda,
        ownerIndex: ownerIndexPda,
        policyEngineProgram: factory.policyEngineProgram,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async registerExistingVault(
    vaultPda: PublicKey,
    label: Buffer
  ): Promise<string> {
    if (label.length === 0) {
      throw new Error('Label cannot be empty');
    }
    if (label.length > 32) {
      throw new Error('Label exceeds 32 bytes');
    }
    const [registryPda] = findRegistryPda(vaultPda);
    const [ownerIndexPda] = findOwnerIndexPda(this.owner);

    return this.program.methods
      .registerExistingVault(label)
      .accounts({
        owner: this.owner,
        factory: this.factoryPda,
        vault: vaultPda,
        registry: registryPda,
        ownerIndex: ownerIndexPda,
        systemProgram: SystemProgram.programId,
      } as any)
      .rpc();
  }

  async deregisterVault(vaultPda: PublicKey): Promise<string> {
    const [registryPda] = findRegistryPda(vaultPda);

    return this.program.methods
      .deregisterVault()
      .accounts({
        owner: this.owner,
        registry: registryPda,
      } as any)
      .rpc();
  }

  async updateVaultLabel(
    vaultPda: PublicKey,
    label: Buffer
  ): Promise<string> {
    if (label.length === 0) {
      throw new Error('Label cannot be empty');
    }
    if (label.length > 32) {
      throw new Error('Label exceeds 32 bytes');
    }
    const [registryPda] = findRegistryPda(vaultPda);

    return this.program.methods
      .updateVaultLabel(label)
      .accounts({
        owner: this.owner,
        registry: registryPda,
      } as any)
      .rpc();
  }

  // Account Fetchers
  async fetchFactory(): Promise<FactoryState> {
    return this.program.account.factoryState.fetch(
      this.factoryPda
    ) as unknown as FactoryState;
  }

  async fetchRegistry(vaultPda: PublicKey): Promise<VaultRegistry> {
    const [registryPda] = findRegistryPda(vaultPda);
    return this.program.account.vaultRegistry.fetch(
      registryPda
    ) as unknown as VaultRegistry;
  }

  async fetchOwnerIndex(): Promise<OwnerIndex> {
    const [ownerIndexPda] = findOwnerIndexPda(this.owner);
    return this.program.account.ownerIndex.fetch(
      ownerIndexPda
    ) as unknown as OwnerIndex;
  }

  async findAllRegistries(
    connection: Connection
  ): Promise<{ pubkey: PublicKey; account: VaultRegistry }[]> {
    const accounts = await connection.getProgramAccounts(this.program.programId, {
      filters: [
        // VaultRegistry discriminator
        {
          memcmp: {
            offset: 0,
            bytes: utils.bytes.bs58.encode(
              Buffer.from([15, 54, 133, 46, 80, 169, 250, 79])
            ),
          },
        },
        // owner field at offset 8
        {
          memcmp: {
            offset: 8,
            bytes: this.owner.toBase58(),
          },
        },
      ],
    });

    return accounts.map((a) => ({
      pubkey: a.pubkey,
      account: this.program.coder.accounts.decode(
        "vaultRegistry",
        a.account.data
      ) as unknown as VaultRegistry,
    }));
  }
}
