import { ethers } from "ethers";
import { brandService, relay } from "@developeruche/protocol-core";
import { UserInfo, RelayInput, TransactionResult } from "./types";

/**
 * Parameters for reward deployment workflow
 */
export interface DeployRewardWorkflowParams {
  signer: ethers.Signer;
  userInfo: UserInfo;
  brandId: string;
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupplyVault: ethers.BigNumber;
  totalSupplyTreasury: ethers.BigNumber;
  rOptimal: ethers.BigNumber;
  maximumRLimit: ethers.BigNumber;
  minimumRewardAmountForConversation: ethers.BigNumber;
  minimumMeAmountForConversation: ethers.BigNumber;
  notifyRewardAmount: ethers.BigNumber;
  notifyMeAmount: ethers.BigNumber;
  TREASURY: string;
  VAULT: string;
  OPEN_REWARD_IMPLEMENTATION: string;
  JSON_RPC_URL: string;
  OPEN_REWARD_DIAMOND: string;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  CHAIN_ID: number;
  costPayerId?: string;
  debug?: boolean;
  pk: any;
  hedera: boolean;
}

/**
 * Executes the reward deployment and pool creation workflow
 *
 * This function handles:
 * 1. Preparing deployment parameters
 * 2. Creating new reward with permit and deploying pool
 * 3. Executing relay transaction
 *
 * @param params - Deployment workflow parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if any step fails
 */
export async function executeDeployRewardAndPoolWorkflow(params: DeployRewardWorkflowParams): Promise<TransactionResult> {
  const {
    signer,
    userInfo,
    brandId,
    name,
    symbol,
    descriptionLink,
    totalSupplyVault,
    totalSupplyTreasury,
    rOptimal,
    maximumRLimit,
    minimumRewardAmountForConversation,
    minimumMeAmountForConversation,
    notifyRewardAmount,
    notifyMeAmount,
    TREASURY,
    VAULT,
    OPEN_REWARD_IMPLEMENTATION,
    JSON_RPC_URL,
    OPEN_REWARD_DIAMOND,
    meApiKey,
    reqURL,
    GELATO_API_KEY,
    CHAIN_ID,
    costPayerId,
    debug,
    pk,
    hedera,
  } = params;

  try {
    // Log deployment parameters for debugging
    if (debug) {
      console.log("Deployment parameters:", {
        brandId,
        name,
        symbol,
        descriptionLink,
        totalSupplyVault: totalSupplyVault.toString(),
        totalSupplyTreasury: totalSupplyTreasury.toString(),
        rOptimal: rOptimal.toString(),
        maximumRLimit: maximumRLimit.toString(),
        minimumRewardAmountForConversation: minimumRewardAmountForConversation.toString(),
        minimumMeAmountForConversation: minimumMeAmountForConversation.toString(),
        notifyRewardAmount: notifyRewardAmount.toString(),
        notifyMeAmount: notifyMeAmount.toString(),
        TREASURY,
        VAULT,
        OPEN_REWARD_IMPLEMENTATION,
        JSON_RPC_URL,
        OPEN_REWARD_DIAMOND,
      });
    }

    // Create new reward with permit and deploy pool
    const transactionData = await brandService.createANewRewardWithPermitAndDeployPool(
      brandId,
      name,
      symbol,
      descriptionLink,
      totalSupplyVault,
      totalSupplyTreasury,
      rOptimal,
      maximumRLimit,
      minimumRewardAmountForConversation,
      minimumMeAmountForConversation,
      notifyRewardAmount,
      notifyMeAmount,
      TREASURY,
      VAULT,
      OPEN_REWARD_IMPLEMENTATION,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    if (!transactionData?.data) {
      throw new Error("Failed to prepare deployment transaction data");
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
      throw new Error("Failed to execute deployment relay transaction");
    }

    return { taskId };
  } catch (error) {
    throw new Error(`Deployment workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
