import { createWeb3 } from "../lib/web3";
import { UpdateGeneralConfigProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeUpdateGeneralConfigWorkflow } from "../helpers/basicOperationHelpers";

/**
 * Updates general configuration settings for a brand.
 *
 * This function handles user authentication and executes the update general config
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, update operation, or transaction execution fails
 */
export async function updateGeneralConfigFN({
  email,
  magic,
  brandId,
  generalConfig: { enableBountyRewards, enableCais, payIncomingGasFees, payOutgoingGasFees },
  ignoreDefault,
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
}: UpdateGeneralConfigProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !brandId) {
    throw new Error("Missing required parameters: email or brandId");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the update general config workflow
    const result = await executeUpdateGeneralConfigWorkflow({
      signer,
      userInfo,
      brandId,
      generalConfig: { enableBountyRewards, enableCais, payIncomingGasFees, payOutgoingGasFees },
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
    console.error("Update general config failed:", errorMessage);

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
