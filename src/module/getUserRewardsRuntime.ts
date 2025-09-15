import { GetUserRewardsRuntimeProps } from "../lib/types";
import { getUserRewardsRuntime, UserRewardsRuntimeResult } from "../helpers/utilityHelpers";

/**
 * Gets user rewards runtime data including balances.
 *
 * This function retrieves user account details and calculates reward balances
 * from the runtime SDK.
 *
 * @param params - Configuration object containing required parameters
 * @returns Promise resolving to user rewards data with balances
 * @throws Error if runtime data retrieval fails
 */
export async function getUserRewardsRuntimeFN({
  rewardListFromBackend,
  setLoading,
  setError,
  userData,
  RUNTIME_URL,
}: GetUserRewardsRuntimeProps): Promise<UserRewardsRuntimeResult> {
  // Input validation
  if (!userData?.customer?.walletAddress || !RUNTIME_URL) {
    throw new Error("Missing required parameters: userData.customer.walletAddress or RUNTIME_URL");
  }

  setLoading(true);

  try {
    const result = await getUserRewardsRuntime(rewardListFromBackend, userData, RUNTIME_URL);
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Get user rewards runtime failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}
