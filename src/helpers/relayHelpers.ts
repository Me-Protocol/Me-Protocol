import { ethers } from "ethers";
import { relay } from "@developeruche/protocol-core";
import { RelayInput, TransactionResult, UserInfo } from "./types";

/**
 * Common relay execution parameters
 */
export interface RelayExecutionParams {
  signer: ethers.Signer;
  userInfo: UserInfo;
  transactionData: any;
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
 * Generic function to execute relay transactions
 *
 * This centralizes the common pattern used across multiple helpers:
 * 1. Validate transaction data
 * 2. Prepare relay input
 * 3. Execute relay transaction
 * 4. Return result with taskId
 *
 * @param params - Relay execution parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if transaction fails or taskId is not returned
 */
export async function executeRelayTransaction(params: RelayExecutionParams): Promise<TransactionResult> {
  const {
    signer,
    userInfo,
    transactionData,
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

  // Validate transaction data
  if (!transactionData?.data) {
    throw new Error("Invalid transaction data: missing data field");
  }

  // Prepare relay input
  const relayInput: RelayInput = {
    from: userInfo.publicAddress,
    data: transactionData.data,
    to: OPEN_REWARD_DIAMOND,
  };

  try {
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
      throw new Error("Relay transaction failed: no taskId returned");
    }

    return { taskId };
  } catch (error) {
    throw new Error(`Relay execution failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
