import { createWeb3 } from "../lib/web3";
import { UpdateRewardConfigProps } from "../lib/types";
import { TransactionResult } from "../helpers/types";
import { handleUserAuthentication } from "../helpers/authentication";
import { executeRelayTransaction } from "../helpers/relayHelpers";
import { brandService } from "@developeruche/protocol-core";

/**
 * Updates the configuration of a reward.
 *
 * This function handles user authentication and executes the update configuration
 * workflow through a relay service.
 *
 * @param params - Configuration object containing all required parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if authentication, configuration update, or transaction execution fails
 */
export async function updateRewardConfigFN({
  email,
  magic,
  address,
  rewardConfig: {
    specificException,
    bountyEnables,
    caiEnabled,
    bountyTriggerLimit,
    bountyContributionInPrecision,
    payIncomingGasFee,
    payOutgoingGasFee,
  },
  brandId,
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
}: UpdateRewardConfigProps): Promise<TransactionResult> {
  // Input validation
  if (!email || !address) {
    throw new Error("Missing required parameters: email or address");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Handle user authentication and setup
    const { signer, userInfo } = await handleUserAuthentication(magic, magicWeb3, email);

    // Prepare the configuration data
    const configData = {
      specificException,
      bountyEnables,
      caiEnabled,
      bountyTriggerLimit,
      bountyContributionInPrecision,
      payIncomingGasFee,
      payOutgoingGasFee,
    };

    // Prepare transaction data using brand service
    const transactionData = await brandService.updateRewardConfigurations(
      address,
      brandId,
      configData,
      ignoreDefault,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    // Execute the workflow using relay helper
    const result = await executeRelayTransaction({
      signer,
      userInfo,
      transactionData,
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
    console.error("Update reward config transaction failed:", errorMessage);

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
