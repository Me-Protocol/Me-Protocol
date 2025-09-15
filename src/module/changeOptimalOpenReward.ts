import { ethers } from "ethers";
import { createWeb3 } from "../lib/web3";
import { ChangeOptimalOpenRewardProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeChangeOptimalOpenRewardWorkflow } from "../helpers/basicOperationHelpers";

/**
 * Changes the optimal valuation for open rewards.
 *
 * This function handles user authentication and executes the change optimal
 * open reward workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, change operation, or transaction execution fails
 */
export async function changeOptimalOpenRewardFN({
  email,
  magic,
  rewardName,
  newOptimalValue,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  GELATO_API_KEY,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  CHAIN_ID,
  costPayerId,
  debug,
  pk,
  hedera,
}: ChangeOptimalOpenRewardProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !rewardName || !newOptimalValue) {
    throw new Error("Missing required parameters: email, rewardName, or newOptimalValue");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the change optimal open reward workflow
    const result = await executeChangeOptimalOpenRewardWorkflow({
      signer,
      userInfo,
      rewardName,
      newOptimalValue: typeof newOptimalValue === "number" ? ethers.BigNumber.from(newOptimalValue) : newOptimalValue,
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
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Change optimal open reward failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);

    // Always logout user after operation
    try {
      await magic.user.logout();
    } catch (logoutError) {
      console.warn("Failed to logout user:", logoutError);
    }
  }
}
