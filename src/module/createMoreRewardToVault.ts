import { createWeb3 } from "../lib/web3";
import { PauseOpenRewardProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeCreateMoreRewardToVaultWorkflow } from "../helpers/basicOperationHelpers";

/**
 * Creates more rewards to vault.
 *
 * This function handles user authentication and executes the create more reward
 * to vault workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, operation, or transaction execution fails
 */
export async function createMoreRewardsToVaultFN({
  email,
  magic,
  rewardAddress,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  amount,
  GELATO_API_KEY,
  debug,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  CHAIN_ID,
  pk,
  hedera,
}: PauseOpenRewardProps & { amount: string }): Promise<TransactionResult> {
  // Input validation
  if (!email || !rewardAddress || !amount) {
    throw new Error("Missing required parameters: email, rewardAddress, or amount");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the create more reward to vault workflow
    const result = await executeCreateMoreRewardToVaultWorkflow({
      signer,
      userInfo,
      rewardAddress,
      amount,
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
    console.error("Create more reward to vault failed:", errorMessage);

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
