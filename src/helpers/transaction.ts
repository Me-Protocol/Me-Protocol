import { ethers } from "ethers";
import axios from "axios";
import { VaultPermitParams, brandService, relay, signConsent } from "@developeruche/protocol-core";
import { TransactionResult, UserInfo, RelayInput } from "./types";

/**
 * Parameters for executing add liquidity transaction
 */
export interface AddLiquidityTransactionParams {
  signer: ethers.Signer;
  userInfo: UserInfo;
  rewardAmount: string;
  meAmount: string;
  rewardAddress: string;
  meApiKey: string;
  reqURL: string;
  currentBrandId: string;
  GELATO_API_KEY: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  OPEN_REWARD_DIAMOND: string;
  ME_TOKEN: string;
  costPayerId?: string;
  debug?: boolean;
  pk: any;
  hedera: boolean;
}

/**
 * Helper function to execute the add liquidity transaction
 *
 * This function handles the complete transaction flow:
 * 1. Signs consent for ME token amount
 * 2. Obtains vault permit from API
 * 3. Prepares transaction data using brand service
 * 4. Executes relay transaction
 *
 * @param params - Transaction parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if any step of the transaction fails
 */
export async function executeAddLiquidityTransaction(params: AddLiquidityTransactionParams): Promise<TransactionResult> {
  const {
    signer,
    userInfo,
    rewardAmount,
    meAmount,
    rewardAddress,
    meApiKey,
    reqURL,
    currentBrandId,
    GELATO_API_KEY,
    JSON_RPC_URL,
    CHAIN_ID,
    OPEN_REWARD_DIAMOND,
    ME_TOKEN,
    costPayerId,
    debug,
    pk,
    hedera,
  } = params;

  try {
    // Sign consent for ME token amount
    const consentSignature = await signConsent(
      signer as any, // Type assertion needed for signConsent function compatibility
      ME_TOKEN,
      ethers.utils.parseEther(meAmount).toString()
    );

    // Get vault permit from API
    const vaultPermitResponse = await axios.post<{ data: VaultPermitParams }>(
      `${reqURL}/reward/get-vault-permit`,
      {
        value: ethers.utils.parseEther(meAmount).toString(),
        brandId: currentBrandId,
        rewardAddress,
        sign: consentSignature,
      },
      {
        headers: {
          Authorization: `Bearer ${meApiKey}`,
        },
      }
    );

    const vaultPermitData = vaultPermitResponse.data?.data;
    if (!vaultPermitData) {
      throw new Error("Failed to obtain vault permit data");
    }

    // Prepare transaction data for adding liquidity
    const transactionData = await brandService.addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool(
      rewardAddress,
      ethers.utils.parseEther(rewardAmount),
      ethers.utils.parseEther(meAmount),
      vaultPermitData,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    if (!transactionData?.data) {
      throw new Error("Failed to prepare transaction data");
    }

    // Prepare relay input
    const relayInput: RelayInput = {
      from: userInfo.publicAddress,
      data: transactionData.data,
      to: OPEN_REWARD_DIAMOND,
    };

    // Execute relay transaction
    const { taskId } = await relay(
      relayInput,
      signer,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      JSON_RPC_URL,
      CHAIN_ID,
      OPEN_REWARD_DIAMOND,
      costPayerId || "",
      debug || false,
      pk,
      hedera || false
    );

    if (!taskId) {
      throw new Error("Failed to execute relay transaction");
    }

    return { taskId };
  } catch (error) {
    throw new Error(`Transaction execution failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
