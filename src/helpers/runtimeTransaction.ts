import axios from "axios";
import { sendTransactionData } from "@developeruche/runtime-sdk";

/**
 * Interface for spending step management
 */
export interface SpendingStepManager {
  setSpendLoading: (loading: boolean) => void;
  setSpendingSteps: (step: number) => void;
}

/**
 * Parameters for pushing transaction to backend
 */
export interface PushTransactionParams {
  reqURL: string;
  rewardId: string;
  meApiKey: string;
  transactionData: sendTransactionData;
  orderId?: string;
}

/**
 * Helper function to push transaction data to the backend
 *
 * @param params - Push transaction parameters
 * @returns Promise resolving to backend response data
 * @throws Error if the push transaction fails
 */
export async function pushTransactionToBackend(params: PushTransactionParams): Promise<any> {
  const { reqURL, rewardId, meApiKey, transactionData, orderId } = params;
  const { data, from, hash, nonce, r, s, v } = transactionData;

  try {
    const baseURL = reqURL.replace("/cost/request/in-app", "");

    const response = await axios.post(
      `${baseURL}/reward/push-transaction`,
      {
        params: {
          from,
          nonce,
          data,
          r,
          s,
          v,
          hash,
        },
        rewardId,
        ...(orderId && { orderId }),
      },
      {
        headers: {
          Authorization: `Bearer ${meApiKey}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to push transaction to backend: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Helper function to execute spending workflow with step management
 *
 * @param stepManager - Object containing step management functions
 * @param executionFunction - Function that performs the actual spending logic
 * @returns Promise resolving to the execution result
 */
export async function executeSpendingWorkflow<T>(stepManager: SpendingStepManager, executionFunction: () => Promise<T>): Promise<T> {
  stepManager.setSpendLoading(true);

  try {
    const result = await executionFunction();
    return result;
  } catch (error) {
    throw error;
  } finally {
    stepManager.setSpendLoading(false);
  }
}
