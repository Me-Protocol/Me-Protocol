import { usersServiceWithPermit, relay } from "@developeruche/protocol-core";
import { RelayInput, TransactionResult, BaseWorkflowParams, OperationInfo } from "./types";
import { SpendingInfo } from "../lib/types";

/**
 * Parameters for swap workflow
 */
export interface SwapWorkflowParams extends BaseWorkflowParams {
  swapInfo: OperationInfo;
}

/**
 * Executes the swap workflow for cross-brand swapping
 *
 * This function handles:
 * 1. Preparing swap transaction with permit
 * 2. Executing relay transaction
 *
 * @param params - Swap workflow parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if swap preparation or execution fails
 */
export async function executeSwapWorkflow(params: SwapWorkflowParams): Promise<TransactionResult> {
  const {
    signer,
    userInfo,
    swapInfo,
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
    // Convert OperationInfo to SpendingInfo format
    const spendingInfo: SpendingInfo = {
      rewardAtHand: swapInfo.rewardAtHand,
      targettedReward: swapInfo.targettedReward,
      amountOfRewardAtHand: swapInfo.amountOfRewardAtHand,
      expectedAmountOfTargetedReward:
        typeof swapInfo.expectedAmountOfTargetedReward === "string"
          ? parseFloat(swapInfo.expectedAmountOfTargetedReward)
          : swapInfo.expectedAmountOfTargetedReward,
    };

    // Prepare swap transaction with permit
    const transactionData = await usersServiceWithPermit.spendRewardsOnAnotherBrandWithPermit(
      spendingInfo,
      signer,
      CHAIN_ID,
      OPEN_REWARD_DIAMOND,
      JSON_RPC_URL
    );

    if (!transactionData?.data) {
      throw new Error("Failed to prepare swap transaction data");
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
      throw new Error("Failed to execute swap relay transaction");
    }

    return { taskId };
  } catch (error) {
    throw new Error(`Swap workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
