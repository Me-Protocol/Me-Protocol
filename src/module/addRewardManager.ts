import { createWeb3 } from "../lib/web3";
import { AddRewardMagicProps } from "../lib/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeAddRewardManagerWorkflow, ManagementWorkflowResult } from "../helpers/managementHelpers";
import { ethers } from "ethers";

/**
 * Adds a reward manager to a brand.
 *
 * This function handles user authentication and executes the add reward manager
 * workflow through runtime SDK.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to management workflow result
 * @throws Error if authentication, management operation, or transaction execution fails
 */
export async function addRewardManagerFN({
  email,
  magic,
  setLoading,
  setSpendLoading,
  setSpendingSteps,
  brand_id,
  reward_manager,
  role_id,
  setError,
  meApiKey,
  reqURL,
  persist,
  RUNTIME_URL,
  CHAIN_ID,
}: AddRewardMagicProps): Promise<ManagementWorkflowResult | string> {
  // Input validation
  if (!email || !brand_id || !reward_manager || !role_id) {
    throw new Error("Missing required parameters: email, brand_id, reward_manager, or role_id");
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

    // Execute the add reward manager workflow
    const result = await executeAddRewardManagerWorkflow({
      signer,
      userInfo,
      brandId: brand_id.toString(),
      rewardManager: reward_manager,
      roleId: role_id,
      meApiKey,
      reqURL,
      RUNTIME_URL,
      setSpendingSteps,
      chain_id: ethers.BigNumber.from(CHAIN_ID),
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Add reward manager operation failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);
    setSpendLoading(false);
    setSpendingSteps(0);

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
