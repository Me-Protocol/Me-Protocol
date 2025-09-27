import { createWeb3 } from "../lib/web3";
import { DistributeRewardsProps } from "../lib/types";
import { sendTransactionData } from "@developeruche/runtime-sdk/dist/utils/interfaces";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeDistributeRewardsWorkflow } from "../helpers/runtimeOperationHelpers";
import { ethers } from "ethers";

/**
 * Distributes rewards to specified recipients.
 *
 * This function handles user authentication and executes the distribute rewards
 * workflow through runtime SDK.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction data
 * @throws Error if authentication, distribution, or transaction execution fails
 */
export async function distributeRewardsFN({
  email,
  magic,
  reward_address,
  reward_recipient,
  reward_amounts,
  setError,
  setLoading,
  persist,
  RUNTIME_URL,
  CHAIN_ID,
}: DistributeRewardsProps): Promise<sendTransactionData | undefined> {
  // Input validation
  if (!email || !reward_address || !reward_recipient || !reward_amounts) {
    throw new Error("Missing required parameters: email, reward_address, reward_recipient, or reward_amounts");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the distribute rewards workflow
    const result = await executeDistributeRewardsWorkflow({
      signer,
      userInfo: { publicAddress: "", email }, // Not needed for this operation
      rewardAddress: reward_address,
      rewardRecipient: reward_recipient,
      rewardAmounts: reward_amounts,
      RUNTIME_URL,
      chain_id: ethers.BigNumber.from(CHAIN_ID),
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Distribute rewards failed:", errorMessage);

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
