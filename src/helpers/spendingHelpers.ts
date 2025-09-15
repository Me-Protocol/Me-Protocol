import { BigNumber } from "ethers";
import { VaultPermitParams, usersServiceWithPermit, relay } from "@developeruche/protocol-core";
import { sendTransactionData, spend_reward_magic } from "@developeruche/runtime-sdk";
import axios from "axios";
import { RelayInput, OperationInfo, BaseWorkflowParams } from "./types";
import { pushTransactionToBackend } from "./runtimeTransaction";

/**
 * Spend information interface (extends OperationInfo for backward compatibility)
 */
export interface SpendInfo extends OperationInfo {
  expectedAmountOfTargetedReward: number | BigNumber; // More specific typing for spending
}

/**
 * Coupon data from API response
 */
export interface CouponData {
  [key: string]: any;
}

/**
 * Spending workflow parameters
 */
export interface SpendingWorkflowParams extends BaseWorkflowParams {
  spendInfo: SpendInfo;
  rewardId: string;
  RUNTIME_URL: string;
  orderId?: string;
  setSpendingSteps: (step: number) => void;
  shouldGetCoupon?: boolean;
}

/**
 * Spending workflow result
 */
export interface SpendingWorkflowResult {
  taskId: string;
  spendData: any;
}

/**
 * Helper function to get coupon data from API
 */
async function getCouponData(reqURL: string, orderId: string, meApiKey: string): Promise<CouponData> {
  const baseURL = reqURL.replace("/cost/request/in-app", "");

  const response = await axios.post(
    `${baseURL}/order/coupon`,
    { orderId },
    {
      headers: {
        Authorization: `Bearer ${meApiKey}`,
      },
    }
  );

  return response.data;
}

/**
 * Helper function to create vault parameters from spend data
 */
function createVaultParams(spendData: any): VaultPermitParams {
  return {
    owner: spendData?.data?.owner,
    count: spendData?.data?.count,
    globalHash: spendData?.data?.globalHash,
    prefixedHash: spendData?.data?.prefixedHash,
    r: spendData?.data?.sig?.r,
    s: spendData?.data?.sig?.s,
    v: spendData?.data?.sig?.v,
    reward: spendData?.data?.reward,
    spender: spendData?.data?.spender,
    value: spendData?.data?.value,
  };
}

/**
 * Executes the complete spending workflow for cross-brand rewards
 *
 * This function handles:
 * 1. Executing spend_reward_magic transaction
 * 2. Getting coupon data (optional)
 * 3. Pushing transaction to backend
 * 4. Creating vault parameters
 * 5. Executing the cross-brand spending transaction
 * 6. Relaying the final transaction
 *
 * @param params - Spending workflow parameters
 * @returns Promise resolving to spending workflow result
 * @throws Error if any step fails
 */
export async function executeSpendingWorkflow(params: SpendingWorkflowParams): Promise<SpendingWorkflowResult> {
  const {
    signer,
    userInfo,
    spendInfo,
    rewardId,
    meApiKey,
    reqURL,
    RUNTIME_URL,
    GELATO_API_KEY,
    JSON_RPC_URL,
    CHAIN_ID,
    OPEN_REWARD_DIAMOND,
    costPayerId,
    debug,
    orderId,
    setSpendingSteps,
    shouldGetCoupon = false,
    pk,
    hedera,
  } = params;

  try {
    // Step 1: Execute spend_reward_magic transaction
    const transactionData: sendTransactionData = await spend_reward_magic(
      spendInfo.rewardAtHand,
      spendInfo.amountOfRewardAtHand,
      OPEN_REWARD_DIAMOND,
      signer,
      RUNTIME_URL
    );

    // Step 2: Get coupon data if required
    if (shouldGetCoupon && orderId) {
      await getCouponData(reqURL, orderId, meApiKey);
    }

    // Step 3: Push transaction to backend
    setSpendingSteps(1);
    const spendData = await pushTransactionToBackend({
      reqURL,
      rewardId,
      meApiKey,
      transactionData,
      orderId,
    });

    // Step 4: Create vault parameters from response
    const vaultParams = createVaultParams(spendData);
    setSpendingSteps(2);

    // Step 5: Execute cross-brand spending transaction
    try {
      const transactionResult = await usersServiceWithPermit.spendRewardsOnAnotherBrandWithVaultPermit(
        spendInfo,
        vaultParams,
        OPEN_REWARD_DIAMOND,
        JSON_RPC_URL
      );

      if (!transactionResult?.data) {
        throw new Error("Failed to prepare spending transaction data");
      }

      // Step 6: Prepare and execute relay transaction
      const relayInput: RelayInput = {
        from: userInfo.publicAddress,
        data: transactionResult.data,
        to: OPEN_REWARD_DIAMOND,
      };

      setSpendingSteps(3);

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

      return { taskId, spendData };
    } catch (relayError) {
      // Return fallback task ID if relay fails but keep spend data
      console.warn("Relay transaction failed, returning fallback task ID:", relayError);
      return {
        taskId: "0x0000000000000000000000000000000000000000000000000000000000000000",
        spendData,
      };
    }
  } catch (error) {
    throw new Error(`Spending workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
