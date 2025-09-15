import { createWeb3 } from "../lib/web3";
import { UpdateRewardDetailsProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeUpdateRewardDetailsWorkflow } from "../helpers/basicOperationHelpers";

/**
 * Updates reward details (name, symbol, description).
 *
 * This function handles user authentication and executes the update reward details
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, update operation, or transaction execution fails
 */
export async function updateRewardDetailsFN({
  email,
  magic,
  rewardAddress,
  brandId,
  details: { name, symbol, descriptionLink },
  ignoreDefault,
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
}: UpdateRewardDetailsProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !rewardAddress || !brandId || !name || !symbol) {
    throw new Error("Missing required parameters: email, rewardAddress, brandId, name, or symbol");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the update reward details workflow
    const result = await executeUpdateRewardDetailsWorkflow({
      signer,
      userInfo,
      rewardAddress,
      brandId,
      details: { name, symbol, descriptionLink },
      ignoreDefault,
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
    console.error("Update reward details failed:", errorMessage);

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
