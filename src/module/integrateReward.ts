import { createWeb3 } from "../lib/web3";
import { IntegrateRewardProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeIntegrateRewardWorkflow } from "../helpers/basicOperationHelpers";

/**
 * Integrates an existing fungible reward into the ME Protocol.
 *
 * This function handles user authentication and executes the integrate reward
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, integration, or transaction execution fails
 */
export async function integrateRewardFN({
  email,
  magic,
  rewardAddress,
  descriptionLink,
  readTandC,
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
}: IntegrateRewardProps): Promise<TransactionResult> {
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

    // Execute the integrate reward workflow
    const result = await executeIntegrateRewardWorkflow({
      signer,
      userInfo,
      rewardAddress,
      descriptionLink,
      readTandC,
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
    console.error("Integrate reward failed:", errorMessage);

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
