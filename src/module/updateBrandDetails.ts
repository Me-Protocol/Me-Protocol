import { createWeb3 } from "../lib/web3";
import { UpdateBrandDetailsProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeUpdateBrandDetailsWorkflow } from "../helpers/basicOperationHelpers";

/**
 * Updates brand details (name and online presence).
 *
 * This function handles user authentication and executes the update brand details
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, update operation, or transaction execution fails
 */
export async function updateBrandDetailsFN({
  email,
  magic,
  brandId,
  brandDetails: { name, onlinePresence },
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
}: UpdateBrandDetailsProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !brandId || !name) {
    throw new Error("Missing required parameters: email, brandId, or name");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the update brand details workflow
    const result = await executeUpdateBrandDetailsWorkflow({
      signer,
      userInfo,
      brandId,
      brandDetails: { name, onlinePresence },
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
    console.error("Update brand details failed:", errorMessage);

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
