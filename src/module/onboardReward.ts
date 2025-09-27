import { ethers } from "ethers";
import { createWeb3 } from "../lib/web3";
import { OnBoardRewardsProps } from "../lib/types";
import { sendTransactionData } from "@developeruche/runtime-sdk";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeOnboardRewardWorkflow } from "../helpers/runtimeOperationHelpers";

/**
 * Onboards a reward with default treasury and vault amounts.
 *
 * This function handles user authentication and executes the onboard reward
 * workflow through runtime SDK.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction data
 * @throws Error if authentication, onboarding, or transaction execution fails
 */
export async function onBoardRewardsFN({
  email,
  magic,
  brand_id,
  reward_address,
  setLoading,
  setError,
  persist,
  RUNTIME_URL,
  CHAIN_ID,
}: OnBoardRewardsProps): Promise<sendTransactionData> {
  // Input validation
  if (!email || !brand_id || !reward_address) {
    throw new Error("Missing required parameters: email, brand_id, or reward_address");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the onboard reward workflow
    const result = await executeOnboardRewardWorkflow({
      signer,
      userInfo: { publicAddress: "", email }, // Not needed for this operation
      brandId: brand_id.toString(),
      rewardAddress: reward_address,
      treasuryAmount: ethers.utils.parseEther("1000"),
      vaultAmount: ethers.utils.parseEther("1"),
      RUNTIME_URL,
      chain_id: ethers.BigNumber.from(CHAIN_ID),
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Onboard reward failed:", errorMessage);

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
