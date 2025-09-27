import { ethers } from "ethers";
import { add_reward_manager_magic, remove_reward_manager_magic, sendTransactionData } from "@developeruche/runtime-sdk";
import { UserInfo } from "./types";
import { pushTransactionToBackend } from "./runtimeTransaction";

/**
 * Management workflow parameters
 */
export interface ManagementWorkflowParams {
  chain_id: ethers.BigNumber;
  signer: ethers.Signer;
  userInfo: UserInfo;
  meApiKey: string;
  reqURL: string;
  RUNTIME_URL: string;
  setSpendingSteps: (step: number) => void;
}

/**
 * Add reward manager parameters
 */
export interface AddRewardManagerParams extends ManagementWorkflowParams {
  brandId: string;
  rewardManager: string;
  roleId: ethers.BigNumber;
}

/**
 * Remove reward manager parameters
 */
export interface RemoveRewardManagerParams extends ManagementWorkflowParams {
  brandId: string;
  rewardManager: string;
  roleId: ethers.BigNumber;
}

/**
 * Management workflow result
 */
export interface ManagementWorkflowResult {
  success: boolean;
  data?: any;
}

/**
 * Executes the add reward manager workflow
 *
 * This function handles:
 * 1. Executing add_reward_manager_magic transaction
 * 2. Pushing transaction to backend
 *
 * @param params - Add reward manager parameters
 * @returns Promise resolving to management workflow result
 * @throws Error if any step fails
 */
export async function executeAddRewardManagerWorkflow(params: AddRewardManagerParams): Promise<ManagementWorkflowResult> {
  const { signer, brandId, rewardManager, roleId, meApiKey, reqURL, RUNTIME_URL, setSpendingSteps, chain_id } = params;

  try {
    // Step 1: Execute add reward manager magic
    setSpendingSteps(1);

    const transactionData: sendTransactionData = await add_reward_manager_magic(
      ethers.BigNumber.from(brandId),
      rewardManager,
      roleId,
      chain_id,
      signer,
      RUNTIME_URL
    );

    // Step 2: Push transaction to backend
    setSpendingSteps(2);

    const result = await pushTransactionToBackend({
      reqURL,
      rewardId: brandId, // Using brandId as rewardId for management operations
      meApiKey,
      transactionData,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    throw new Error(`Add reward manager workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the remove reward manager workflow
 *
 * This function handles:
 * 1. Executing remove_reward_manager_magic transaction
 * 2. Pushing transaction to backend
 *
 * @param params - Remove reward manager parameters
 * @returns Promise resolving to management workflow result
 * @throws Error if any step fails
 */
export async function executeRemoveRewardManagerWorkflow(params: RemoveRewardManagerParams): Promise<ManagementWorkflowResult> {
  const { signer, brandId, rewardManager, roleId, meApiKey, reqURL, RUNTIME_URL, setSpendingSteps, chain_id } = params;

  try {
    // Step 1: Execute remove reward manager magic
    setSpendingSteps(1);

    const transactionData: sendTransactionData = await remove_reward_manager_magic(
      ethers.BigNumber.from(brandId),
      rewardManager,
      roleId,
      chain_id,
      signer,
      RUNTIME_URL
    );

    // Step 2: Push transaction to backend
    setSpendingSteps(2);

    const result = await pushTransactionToBackend({
      reqURL,
      rewardId: brandId, // Using brandId as rewardId for management operations
      meApiKey,
      transactionData,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    throw new Error(`Remove reward manager workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
