import { createWeb3 } from "../lib/web3";
import { AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeAddLiquidityTransaction } from "../helpers/transaction";

/**
 * Adds liquidity for open rewards with treasury and ME dispenser, then starts the pool.
 *
 * This function handles user authentication, obtains necessary permits, and executes
 * the add liquidity transaction through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, permit acquisition, or transaction execution fails
 */
export async function addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolFN({
  email,
  magic,
  rewardAmount,
  meAmount,
  rewardAddress,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  currentBrandId,
  persist,
  GELATO_API_KEY,
  debug,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  CHAIN_ID,
  ME_TOKEN,
  pk,
  hedera,
}: AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !rewardAmount || !meAmount || !rewardAddress) {
    throw new Error("Missing required parameters: email, rewardAmount, meAmount, or rewardAddress");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the add liquidity transaction
    const result = await executeAddLiquidityTransaction({
      signer,
      userInfo,
      rewardAmount,
      meAmount,
      rewardAddress,
      meApiKey,
      reqURL,
      currentBrandId,
      GELATO_API_KEY,
      JSON_RPC_URL,
      CHAIN_ID,
      OPEN_REWARD_DIAMOND,
      ME_TOKEN,
      costPayerId,
      debug,
      pk,
      hedera,
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Add liquidity transaction failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);

    // Logout user if not persisting session
    if (!persist) {
      try {
        await magic.user.logout();
      } catch (logoutError) {
        console.warn("Failed to logout user:", logoutError);
      }
    }
  }
}
