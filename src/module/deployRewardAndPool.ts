import { ethers } from "ethers";
import { createWeb3 } from "../lib/web3";
import { DeployRewardAndPoolProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeDeployRewardAndPoolWorkflow } from "../helpers/deploymentHelpers";

/**
 * Deploys a new reward token and creates a liquidity pool.
 *
 * This function handles user authentication and executes the complete deployment
 * workflow including reward token creation and pool setup through a relay service.
 *
 * @param params - Configuration object containing all required deployment parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, deployment, or transaction execution fails
 */
export async function deployRewardAndPoolFN({
  email,
  magic,
  brandId,
  name,
  symbol,
  descriptionLink,
  totalSupplyVault,
  totalSupplyTreasury,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  rOptimal,
  maximumRLimit,
  minimumRewardAmountForConversation,
  minimumMeAmountForConversation,
  notifyRewardAmount,
  notifyMeAmount,
  persist,
  GELATO_API_KEY,
  debug,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  TREASURY,
  VAULT,
  OPEN_REWARD_IMPLEMENTATION,
  CHAIN_ID,
  pk,
  hedera,
}: DeployRewardAndPoolProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !brandId || !name || !symbol) {
    throw new Error("Missing required parameters: email, brandId, name, or symbol");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Execute the deployment workflow
    const result = await executeDeployRewardAndPoolWorkflow({
      signer,
      userInfo,
      brandId,
      name,
      symbol,
      descriptionLink,
      totalSupplyVault: typeof totalSupplyVault === "number" ? ethers.BigNumber.from(totalSupplyVault) : totalSupplyVault,
      totalSupplyTreasury: typeof totalSupplyTreasury === "number" ? ethers.BigNumber.from(totalSupplyTreasury) : totalSupplyTreasury,
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
      TREASURY,
      VAULT,
      OPEN_REWARD_IMPLEMENTATION,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      CHAIN_ID,
      costPayerId,
      debug,
      pk,
      hedera,
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Deploy reward and pool transaction failed:", errorMessage);

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
