import { ethers } from "ethers";
import { brandService, relay } from "@developeruche/protocol-core";
import { RelayInput, TransactionResult, BaseWorkflowParams } from "./types";

/**
 * Base parameters for configuration workflow (alias for consistency)
 */
export interface ConfigurationWorkflowParams extends BaseWorkflowParams {}

/**
 * Parameters for updating open reward configuration
 */
export interface UpdateOpenRewardConfigParams extends ConfigurationWorkflowParams {
  rewardAddress: string;
  config: {
    maximumRLimit: ethers.BigNumber;
    minimumRewardAmountForConversation: string;
    minimumMeAmountForConversation: string;
    notifyRewardAmount: ethers.BigNumber;
    notifyMeAmount: ethers.BigNumber;
    defaultSlippageInPrecision: ethers.BigNumber;
    allowSwaps: boolean;
  };
  ignoreDefault: boolean;
}

/**
 * Parameters for setting up open reward
 */
export interface SetUpOpenRewardParams extends ConfigurationWorkflowParams {
  rewardAddress: string;
  rOptimal: ethers.BigNumber;
  maximumRLimit: ethers.BigNumber;
  minimumRewardAmountForConversation: ethers.BigNumber;
  minimumMeAmountForConversation: ethers.BigNumber;
  notifyRewardAmount: ethers.BigNumber;
  notifyMeAmount: ethers.BigNumber;
  defaultSlippageInPrecision: ethers.BigNumber;
  allowSwaps: boolean;
  OPEN_REWARD_IMPLEMENTATION: string;
  ME_TOKEN: string;
}

/**
 * Generic function to execute configuration workflows
 */
async function executeConfigurationWorkflow(params: ConfigurationWorkflowParams, transactionData: any): Promise<TransactionResult> {
  const { signer, userInfo, meApiKey, reqURL, GELATO_API_KEY, JSON_RPC_URL, CHAIN_ID, OPEN_REWARD_DIAMOND, costPayerId, debug, pk, hedera } = params;

  if (!transactionData?.data) {
    throw new Error("Failed to prepare configuration transaction data");
  }

  // Prepare relay input
  const relayInput: RelayInput = {
    from: userInfo.publicAddress,
    data: transactionData.data,
    to: OPEN_REWARD_DIAMOND,
  };

  // Execute relay transaction
  const { taskId } = await relay(
    relayInput,
    signer,
    meApiKey,
    reqURL,
    GELATO_API_KEY,
    JSON_RPC_URL,
    CHAIN_ID,
    OPEN_REWARD_DIAMOND,
    costPayerId || "",
    debug || false,
    pk,
    hedera || false
  );

  if (!taskId) {
    throw new Error("Failed to execute configuration relay transaction");
  }

  return { taskId };
}

/**
 * Executes the update open reward configuration workflow
 */
export async function executeUpdateOpenRewardConfigWorkflow(params: UpdateOpenRewardConfigParams): Promise<TransactionResult> {
  try {
    const { rewardAddress, config, ignoreDefault, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    // Prepare configuration with parsed ether values
    const processedConfig = {
      ...config,
      minimumRewardAmountForConversation: ethers.utils.parseEther(config.minimumRewardAmountForConversation),
      minimumMeAmountForConversation: ethers.utils.parseEther(config.minimumMeAmountForConversation),
    };

    const transactionData = await brandService.updateOpenRewardsConfigurations(
      rewardAddress,
      processedConfig,
      ignoreDefault,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    return executeConfigurationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Update open reward config workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the set up open reward workflow
 */
export async function executeSetUpOpenRewardWorkflow(params: SetUpOpenRewardParams): Promise<TransactionResult> {
  try {
    const {
      rewardAddress,
      rOptimal,
      maximumRLimit,
      minimumRewardAmountForConversation,
      minimumMeAmountForConversation,
      notifyRewardAmount,
      notifyMeAmount,
      defaultSlippageInPrecision,
      allowSwaps,
      ME_TOKEN,
      OPEN_REWARD_IMPLEMENTATION,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND,
    } = params;

    const transactionData = await brandService.createPool(
      rewardAddress,
      rOptimal,
      maximumRLimit,
      minimumRewardAmountForConversation,
      minimumMeAmountForConversation,
      notifyRewardAmount,
      notifyMeAmount,
      defaultSlippageInPrecision,
      allowSwaps,
      ME_TOKEN,
      OPEN_REWARD_IMPLEMENTATION,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    return executeConfigurationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Set up open reward workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
