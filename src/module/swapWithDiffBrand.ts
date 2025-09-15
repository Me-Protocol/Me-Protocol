import { BigNumber } from "ethers";
import { createWeb3 } from "../lib/web3";
import { SwapWithDiffBrandProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeSwapWorkflow } from "../helpers/swapHelpers";
import { OperationInfo } from "../helpers/types";

/**
 * Swaps rewards with a different brand.
 *
 * This function handles user authentication and executes the cross-brand swap
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, swap preparation, or transaction execution fails
 */
export async function swapWithDiffBrandFN({
  email,
  magic,
  setLoading,
  spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
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
}: SwapWithDiffBrandProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !rewardAtHand || !targettedReward || !amountOfRewardAtHand) {
    throw new Error("Missing required parameters: email, rewardAtHand, targettedReward, or amountOfRewardAtHand");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Prepare swap information
    const swapInfo: OperationInfo = {
      rewardAtHand,
      targettedReward,
      amountOfRewardAtHand: amountOfRewardAtHand as BigNumber,
      expectedAmountOfTargetedReward,
    };

    // Execute the swap workflow
    const result = await executeSwapWorkflow({
      signer,
      userInfo,
      swapInfo,
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
    console.error("Swap with different brand failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);

    // Always logout user after swap operation
    try {
      await magic.user.logout();
    } catch (logoutError) {
      console.warn("Failed to logout user:", logoutError);
    }
  }
}
