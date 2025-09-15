import { BigNumber } from "ethers";
import { createWeb3 } from "../lib/web3";
import { SpendRewardsOnAnotherBrandWithVaultPermitProps } from "../lib/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeSpendingWorkflow, SpendInfo, SpendingWorkflowResult } from "../helpers/spendingHelpers";
/**
 * Spends rewards on another brand using vault permit.
 *
 * This function handles cross-brand reward spending through a complex workflow:
 * 1. User authentication and web3 setup
 * 2. Runtime transaction execution (spend_reward_magic)
 * 3. Transaction push to backend
 * 4. Vault permit processing
 * 5. Cross-brand spending execution
 * 6. Final transaction relay
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to spending result with taskId and spendData
 * @throws Error if authentication, transaction execution, or spending fails
 */
export async function spendRewardsOnAnotherBrandWithVaultPermitFN({
  email,
  magic,
  setLoading,
  setSpendLoading,
  setSpendingSteps,
  spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
  rewardId,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  RUNTIME_URL,
  GELATO_API_KEY,
  debug,
  pk,
  hedera,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  CHAIN_ID,
  orderId,
}: SpendRewardsOnAnotherBrandWithVaultPermitProps): Promise<SpendingWorkflowResult> {
  // Input validation
  if (!email || !rewardAtHand || !targettedReward || !amountOfRewardAtHand) {
    throw new Error("Missing required parameters: email, rewardAtHand, targettedReward, or amountOfRewardAtHand");
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

    // Prepare spend information
    const spendInfo: SpendInfo = {
      rewardAtHand,
      targettedReward,
      amountOfRewardAtHand: amountOfRewardAtHand as BigNumber,
      expectedAmountOfTargetedReward,
    };

    // Execute the complete spending workflow
    const result = await executeSpendingWorkflow({
      signer,
      userInfo,
      spendInfo,
      rewardId,
      meApiKey,
      reqURL,
      RUNTIME_URL,
      GELATO_API_KEY,
      JSON_RPC_URL,
      CHAIN_ID,
      OPEN_REWARD_DIAMOND,
      costPayerId,
      debug,
      pk,
      hedera,
      orderId,
      setSpendingSteps,
      shouldGetCoupon: true, // This function typically gets coupon data
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Spend rewards on another brand failed:", errorMessage);

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
