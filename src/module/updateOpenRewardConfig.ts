import { ethers } from "ethers";
import { createWeb3 } from "../lib/web3";
import { UpdateOpenRewardConfigProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeUpdateOpenRewardConfigWorkflow } from "../helpers/configurationHelpers";

/**
 * Updates the configuration of an open reward.
 *
 * This function handles user authentication and executes the update configuration
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, configuration update, or transaction execution fails
 */
export async function updateOpenRewardConfigFN({
  email,
  magic,
  rewardAddress,
  config: {
    maximumRLimit,
    minimumRewardAmountForConversation,
    minimumMeAmountForConversation,
    notifyRewardAmount,
    notifyMeAmount,
    defaultSlippageInPrecision,
    allowSwaps,
  },
  ignoreDefault,
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
  pk,
  hedera,
}: UpdateOpenRewardConfigProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !rewardAddress) {
    throw new Error("Missing required parameters: email or rewardAddress");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the update configuration workflow
    const result = await executeUpdateOpenRewardConfigWorkflow({
      signer,
      userInfo,
      rewardAddress,
      config: {
        maximumRLimit: typeof maximumRLimit === "number" ? ethers.BigNumber.from(maximumRLimit) : maximumRLimit,
        minimumRewardAmountForConversation,
        minimumMeAmountForConversation,
        notifyRewardAmount: typeof notifyRewardAmount === "number" ? ethers.BigNumber.from(notifyRewardAmount) : notifyRewardAmount,
        notifyMeAmount: typeof notifyMeAmount === "number" ? ethers.BigNumber.from(notifyMeAmount) : notifyMeAmount,
        defaultSlippageInPrecision:
          typeof defaultSlippageInPrecision === "number" ? ethers.BigNumber.from(defaultSlippageInPrecision) : defaultSlippageInPrecision,
        allowSwaps,
      },
      ignoreDefault,
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
    console.error("Update open reward config transaction failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);

    // Always logout user after configuration update
    try {
      await magic.user.logout();
    } catch (logoutError) {
      console.warn("Failed to logout user:", logoutError);
    }
  }
}
