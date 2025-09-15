import { createWeb3 } from "../lib/web3";
import { SpendRewardOnIssuingBrandProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeDirectSameBrandSpendingWorkflow, DirectSameBrandSpendingWorkflowParams } from "../helpers/sameBrandSpendingHelpers";

/**
 * Spends rewards on the issuing brand using vault permit.
 *
 * This function handles user authentication and executes the direct same-brand
 * spending workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, spending, or transaction execution fails
 */
export async function spendRewardOnIssuingBrandFN({
  email,
  magic,
  spendAddress,
  spendAmount,
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
}: SpendRewardOnIssuingBrandProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !spendAddress || !spendAmount) {
    throw new Error("Missing required parameters: email, spendAddress, or spendAmount");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the direct same-brand spending workflow
    const result = await executeDirectSameBrandSpendingWorkflow({
      signer,
      userInfo,
      spendAddress,
      spendAmount: parseFloat(spendAmount),
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      JSON_RPC_URL,
      CHAIN_ID,
      OPEN_REWARD_DIAMOND,
      costPayerId,
      debug,
    } as DirectSameBrandSpendingWorkflowParams);

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Spend reward on issuing brand failed:", errorMessage);

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
