import { ethers } from "ethers";
import { distribute_reward_specific_magic, onboard_reward_magic, sendTransactionData } from "@developeruche/runtime-sdk";
import { UserInfo } from "./types";

/**
 * Runtime operation workflow parameters
 */
export interface RuntimeOperationWorkflowParams {
  signer: ethers.Signer;
  userInfo: UserInfo;
  RUNTIME_URL: string;
}

/**
 * Distribute rewards parameters
 */
export interface DistributeRewardsParams extends RuntimeOperationWorkflowParams {
  rewardAddress: string;
  rewardRecipient: string[];
  rewardAmounts: ethers.BigNumber[];
}

/**
 * Onboard reward parameters
 */
export interface OnboardRewardParams extends RuntimeOperationWorkflowParams {
  brandId: string;
  rewardAddress: string;
  treasuryAmount?: ethers.BigNumber;
  vaultAmount?: ethers.BigNumber;
}

/**
 * Executes the distribute rewards workflow
 */
export async function executeDistributeRewardsWorkflow(params: DistributeRewardsParams): Promise<sendTransactionData> {
  const { signer, rewardAddress, rewardRecipient, rewardAmounts, RUNTIME_URL } = params;

  try {
    const result: sendTransactionData = await distribute_reward_specific_magic(rewardAddress, rewardRecipient, rewardAmounts, signer, RUNTIME_URL);

    return result;
  } catch (error) {
    throw new Error(`Distribute rewards workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the onboard reward workflow
 */
export async function executeOnboardRewardWorkflow(params: OnboardRewardParams): Promise<sendTransactionData> {
  const { signer, brandId, rewardAddress, treasuryAmount, vaultAmount, RUNTIME_URL } = params;

  try {
    // Use default amounts if not provided
    const defaultTreasuryAmount = treasuryAmount || ethers.utils.parseEther("1000");
    const defaultVaultAmount = vaultAmount || ethers.utils.parseEther("1");

    const result: sendTransactionData = await onboard_reward_magic(
      ethers.BigNumber.from(brandId),
      rewardAddress,
      defaultTreasuryAmount,
      defaultVaultAmount,
      signer,
      RUNTIME_URL
    );

    return result;
  } catch (error) {
    throw new Error(`Onboard reward workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
