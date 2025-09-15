import { ethers } from "ethers";
import { createWeb3 } from "../lib/web3";
import { SetUpOpenRewardProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeSetUpOpenRewardWorkflow } from "../helpers/configurationHelpers";

/**
 * Sets up an open reward by creating a pool with specified configuration.
 *
 * This function handles user authentication and executes the pool creation
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, pool creation, or transaction execution fails
 */
export async function setUpOpenRewardFN({
  email,
  magic,
  rewardAddress,
  rOptimal,
  maximumRLimit,
  minimumRewardAmountForConversation,
  minimumMeAmountForConversation,
  notifyRewardAmount,
  notifyMeAmount,
  defaultSlippageInPrecision,
  allowSwaps,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  GELATO_API_KEY,
  OPEN_REWARD_DIAMOND,
  OPEN_REWARD_IMPLEMENTATION,
  ME_TOKEN,
  JSON_RPC_URL,
  CHAIN_ID,
  costPayerId,
  debug,
  pk,
  hedera,
}: SetUpOpenRewardProps): Promise<TransactionResult> {
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

    // Execute the set up open reward workflow
    const result = await executeSetUpOpenRewardWorkflow({
      signer,
      userInfo,
      rewardAddress,
      rOptimal: typeof rOptimal === "number" ? ethers.BigNumber.from(rOptimal) : rOptimal,
      maximumRLimit: typeof maximumRLimit === "number" ? ethers.BigNumber.from(maximumRLimit) : maximumRLimit,
      minimumRewardAmountForConversation:
        typeof minimumRewardAmountForConversation === "number"
          ? ethers.BigNumber.from(minimumRewardAmountForConversation)
          : minimumRewardAmountForConversation,
      minimumMeAmountForConversation:
        typeof minimumMeAmountForConversation === "number" ? ethers.BigNumber.from(minimumMeAmountForConversation) : minimumMeAmountForConversation,
      notifyRewardAmount: typeof notifyRewardAmount === "number" ? ethers.BigNumber.from(notifyRewardAmount) : notifyRewardAmount,
      notifyMeAmount: typeof notifyMeAmount === "number" ? ethers.BigNumber.from(notifyMeAmount) : notifyMeAmount,
      defaultSlippageInPrecision:
        typeof defaultSlippageInPrecision === "number" ? ethers.BigNumber.from(defaultSlippageInPrecision) : defaultSlippageInPrecision,
      allowSwaps,
      OPEN_REWARD_IMPLEMENTATION,
      ME_TOKEN,
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
    console.error("Set up open reward transaction failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);

    // Always logout user after setup operation
    try {
      await magic.user.logout();
    } catch (logoutError) {
      console.warn("Failed to logout user:", logoutError);
    }
  }
}
