import { createWeb3 } from "../lib/web3";
import { PauseOpenRewardProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executePauseOpenRewardWorkflow } from "../helpers/basicOperationHelpers";

/**
 * Pauses an open reward.
 *
 * This function handles user authentication and executes the pause open reward
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, pause operation, or transaction execution fails
 */
export async function pauseOpenRewardFN({
  email,
  magic,
  rewardAddress,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  GELATO_API_KEY,
  debug,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  CHAIN_ID,
  pk,
  hedera,
}: PauseOpenRewardProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !rewardAddress) {
    throw new Error("Missing required parameters: email or rewardAddress");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the pause open reward workflow
    const result = await executePauseOpenRewardWorkflow({
      signer,
      userInfo,
      rewardAddress,
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
    console.error("Pause open reward failed:", errorMessage);

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
