import { ethers } from "ethers";
import { same_brand_reward_redeption_magic, sendTransactionData } from "@developeruche/runtime-sdk";
import { UserInfo } from "./types";
import { pushTransactionToBackend } from "./runtimeTransaction";

/**
 * Same-brand spending workflow parameters
 */
export interface SameBrandSpendingWorkflowParams {
  CHAIN_ID: number;
  signer: ethers.Signer;
  userInfo: UserInfo;
  rewardAddress: string;
  rewardAmount: ethers.BigNumber;
  rewardId: string;
  meApiKey: string;
  reqURL: string;
  RUNTIME_URL: string;
  orderId?: string;
  setSpendingSteps: (step: number) => void;
}

/**
 * Same-brand spending workflow result
 */
export interface SameBrandSpendingWorkflowResult {
  taskId: string;
  spendData: any;
}

/**
 * Executes the complete same-brand spending workflow
 *
 * This function handles:
 * 1. Executing same_brand_reward_redeption_magic transaction
 * 2. Pushing transaction to backend
 * 3. Returning the spending result
 *
 * @param params - Same-brand spending workflow parameters
 * @returns Promise resolving to spending workflow result
 * @throws Error if any step fails
 */
export async function executeSameBrandSpendingWorkflow(params: SameBrandSpendingWorkflowParams): Promise<SameBrandSpendingWorkflowResult> {
  const { signer, rewardAddress, rewardAmount, rewardId, meApiKey, reqURL, RUNTIME_URL, orderId, setSpendingSteps, CHAIN_ID } = params;

  try {
    // Step 1: Execute same-brand reward redemption magic
    setSpendingSteps(1);

    const transactionData: sendTransactionData = await same_brand_reward_redeption_magic(
      rewardAddress,
      rewardAmount,
      ethers.BigNumber.from(CHAIN_ID),
      signer,
      RUNTIME_URL
    );

    // Step 2: Push transaction to backend
    setSpendingSteps(2);

    const spendData = await pushTransactionToBackend({
      reqURL,
      rewardId,
      meApiKey,
      transactionData,
      orderId,
    });

    // Step 3: Return success result
    return {
      taskId: "success", // Same-brand spending typically returns "success" instead of actual task ID
      spendData,
    };
  } catch (error) {
    throw new Error(`Same-brand spending workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Direct same-brand spending workflow parameters
 */
export interface DirectSameBrandSpendingWorkflowParams {
  signer: ethers.Signer;
  userInfo: UserInfo;
  spendAddress: string;
  spendAmount: number;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  OPEN_REWARD_DIAMOND: string;
  costPayerId?: string;
  debug?: boolean;
  pk: any;
  hedera: boolean;
}

/**
 * Executes the direct same-brand spending workflow (without separate permit step)
 */
export async function executeDirectSameBrandSpendingWorkflow(params: DirectSameBrandSpendingWorkflowParams): Promise<{ taskId: string }> {
  const {
    signer,
    userInfo,
    spendAddress,
    spendAmount,
    meApiKey,
    reqURL,
    GELATO_API_KEY,
    JSON_RPC_URL,
    CHAIN_ID,
    OPEN_REWARD_DIAMOND,
    costPayerId,
    debug,
    pk,
    hedera,
  } = params;

  try {
    // Import here to avoid circular dependencies
    const { usersServiceWithPermit, relay } = await import("@developeruche/protocol-core");

    // Step 1: Get transaction data directly from service (includes permit handling)
    const transactionData = await usersServiceWithPermit.spendRewardsOnIssuingBrandWithPermit(
      signer,
      spendAddress,
      ethers.utils.parseEther(spendAmount.toString()),
      CHAIN_ID,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    // Step 2: Prepare relay input
    const relayInput = {
      from: userInfo.publicAddress,
      data: transactionData.data,
      to: OPEN_REWARD_DIAMOND,
    };

    // Step 3: Execute relay transaction
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
      throw new Error("Failed to execute direct same-brand spending relay transaction");
    }

    return { taskId };
  } catch (error) {
    throw new Error(`Direct same-brand spending workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
