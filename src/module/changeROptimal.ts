import { createWeb3 } from "../lib/web3";
import { PauseOpenRewardProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeChangeROptimalWorkflow } from "../helpers/basicOperationHelpers";
import { BigNumber } from "ethers";

/**
 * Changes the R optimal value for a reward.
 *
 * This function handles user authentication and executes the change R optimal
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, change operation, or transaction execution fails
 */
export async function changeROptimalFN({
  email,
  magic,
  rewardAddress,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  newROptimal,
  GELATO_API_KEY,
  debug,
  pk,
  hedera,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  CHAIN_ID,
}: PauseOpenRewardProps & { newROptimal: BigNumber }): Promise<TransactionResult> {
  // Input validation
  if (!email || !rewardAddress || !newROptimal) {
    throw new Error("Missing required parameters: email, rewardAddress, or newROptimal");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the change R optimal workflow
    const result = await executeChangeROptimalWorkflow({
      signer,
      userInfo,
      rewardAddress,
      newROptimal,
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
    console.error("Change R optimal failed:", errorMessage);

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
