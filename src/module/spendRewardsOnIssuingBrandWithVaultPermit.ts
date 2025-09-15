import { createWeb3 } from "../lib/web3";
import { spendRewardsOnIssuingBrandWithVaultPermitProps } from "../lib/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeSameBrandSpendingWorkflow, SameBrandSpendingWorkflowResult } from "../helpers/sameBrandSpendingHelpers";

/**
 * Spends rewards on the issuing brand using vault permit (same-brand spending).
 *
 * This function handles same-brand reward spending through a simplified workflow:
 * 1. User authentication and web3 setup
 * 2. Runtime transaction execution (same_brand_reward_redeption_magic)
 * 3. Transaction push to backend
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to spending result with taskId and spendData
 * @throws Error if authentication, transaction execution, or spending fails
 */
export async function spendRewardsOnIssuingBrandWithVaultPermitFN({
  email,
  magic,
  reward_amount,
  reward_address,
  rewardId,
  setError,
  reqURL,
  meApiKey,
  costPayerId,
  setLoading,
  setSpendLoading,
  setSpendingSteps,
  RUNTIME_URL,
  orderId,
}: spendRewardsOnIssuingBrandWithVaultPermitProps): Promise<SameBrandSpendingWorkflowResult> {
  // Input validation
  if (!email || !reward_address || !reward_amount || !rewardId) {
    throw new Error("Missing required parameters: email, reward_address, reward_amount, or rewardId");
  }

  setLoading(true);
  setSpendLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the same-brand spending workflow
    const result = await executeSameBrandSpendingWorkflow({
      signer,
      userInfo,
      rewardAddress: reward_address,
      rewardAmount: reward_amount,
      rewardId,
      meApiKey,
      reqURL,
      RUNTIME_URL,
      orderId,
      setSpendingSteps,
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Spend rewards on issuing brand failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);
    setSpendLoading(false);
    setSpendingSteps(0);

    // Always logout user after spending operation
    try {
      await magic.user.logout();
    } catch (logoutError) {
      console.warn("Failed to logout user:", logoutError);
    }
  }
}
