import { createWeb3 } from "../lib/web3";
import { TopUpOpenRewardLiquidityProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeAddLiquidityWorkflow } from "../helpers/liquidityHelpers";

/**
 * Tops up the liquidity of an open reward.
 *
 * This function handles user authentication and executes the top-up liquidity
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, top-up operation, or transaction execution fails
 */
export async function topUpOpenRewardLiquidityFN({
  email,
  magic,
  address,
  rewardAmount,
  meAmount,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  GELATO_API_KEY,
  OPEN_REWARD_DIAMOND,
  ME_TOKEN,
  JSON_RPC_URL,
  CHAIN_ID,
  costPayerId,
  debug,
  pk,
  hedera,
}: TopUpOpenRewardLiquidityProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !address || !rewardAmount || !meAmount) {
    throw new Error("Missing required parameters: email, address, rewardAmount, or meAmount");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the top-up liquidity workflow
    const result = await executeAddLiquidityWorkflow({
      signer,
      userInfo,
      rewardAddress: address,
      rewardAmount,
      meAmount,
      meToken: ME_TOKEN,
      currentBrandId: "", // Not needed for top-up
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      JSON_RPC_URL,
      CHAIN_ID,
      OPEN_REWARD_DIAMOND,
      costPayerId,
      debug,
      liquidityFunction: "topUpLiquidity",
      pk,
      hedera,
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Top up open reward liquidity failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);

    // Always logout user after top-up operation
    try {
      await magic.user.logout();
    } catch (logoutError) {
      console.warn("Failed to logout user:", logoutError);
    }
  }
}
