import { ethers } from "ethers";
import { brandService } from "@developeruche/protocol-core";
import { TransactionResult, BaseWorkflowParams } from "./types";
import { executeRelayTransaction } from "./relayHelpers";

/**
 * Basic operation workflow parameters (alias for consistency)
 */
export interface BasicOperationWorkflowParams extends BaseWorkflowParams {}

/**
 * Create more reward to treasury parameters
 */
export interface CreateMoreRewardToTreasuryParams extends BasicOperationWorkflowParams {
  rewardAddress: string;
  amount: string;
}

/**
 * Update reward details parameters
 */
export interface UpdateRewardDetailsParams extends BasicOperationWorkflowParams {
  rewardAddress: string;
  brandId: string;
  details: {
    name: string;
    symbol: string;
    descriptionLink: string;
  };
  ignoreDefault: boolean;
}

/**
 * Create more reward to vault parameters
 */
export interface CreateMoreRewardToVaultParams extends BasicOperationWorkflowParams {
  rewardAddress: string;
  amount: string;
}

/**
 * Simple operation parameters (activate, pause, resume, change main account, etc.)
 */
export interface SimpleOperationParams extends BasicOperationWorkflowParams {
  rewardAddress?: string;
  newMainAcctAddress?: string;
  rewardName?: string;
  newOptimalValue?: ethers.BigNumber;
  newROptimal?: ethers.BigNumber;
}

/**
 * Create reward parameters
 */
export interface CreateRewardParams extends BasicOperationWorkflowParams {
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupply: string;
}

/**
 * Integrate reward parameters
 */
export interface IntegrateRewardParams extends BasicOperationWorkflowParams {
  rewardAddress: string;
  descriptionLink: string;
  readTandC: boolean;
}

/**
 * Update brand details parameters
 */
export interface UpdateBrandDetailsParams extends BasicOperationWorkflowParams {
  brandId: string;
  brandDetails: {
    name: string;
    onlinePresence: string;
  };
  ignoreDefault: boolean;
}

/**
 * Update general config parameters
 */
export interface UpdateGeneralConfigParams extends BasicOperationWorkflowParams {
  brandId: string;
  generalConfig: {
    enableBountyRewards: boolean;
    enableCais: boolean;
    payIncomingGasFees: boolean;
    payOutgoingGasFees: boolean;
  };
  ignoreDefault: boolean;
}

/**
 * Generic function to execute basic operations with relay
 */
async function executeBasicOperationWorkflow(params: BasicOperationWorkflowParams, transactionData: any): Promise<TransactionResult> {
  return executeRelayTransaction({
    ...params,
    transactionData,
  });
}

/**
 * Executes the create more reward to treasury workflow
 */
export async function executeCreateMoreRewardToTreasuryWorkflow(params: CreateMoreRewardToTreasuryParams): Promise<TransactionResult> {
  try {
    const { rewardAddress, amount, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    const transactionData = await brandService.createMoreRewardToTreasury(
      rewardAddress,
      ethers.utils.parseEther(amount),
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Create more reward to treasury workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the update reward details workflow
 */
export async function executeUpdateRewardDetailsWorkflow(params: UpdateRewardDetailsParams): Promise<TransactionResult> {
  try {
    const { rewardAddress, brandId, details, ignoreDefault, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    const transactionData = await brandService.updateRewardDetails(brandId, rewardAddress, details, ignoreDefault, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Update reward details workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the create more reward to vault workflow
 */
export async function executeCreateMoreRewardToVaultWorkflow(params: CreateMoreRewardToVaultParams): Promise<TransactionResult> {
  try {
    const { rewardAddress, amount, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    const transactionData = await brandService.createMoreRewardsToVault(
      ethers.utils.parseEther(amount),
      rewardAddress,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Create more reward to vault workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the activate open reward workflow
 */
export async function executeActivateOpenRewardWorkflow(params: SimpleOperationParams): Promise<TransactionResult> {
  try {
    const { rewardAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    if (!rewardAddress) {
      throw new Error("Reward address is required for activate operation");
    }

    const transactionData = await brandService.activateOpenRewards(rewardAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Activate open reward workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the pause open reward workflow
 */
export async function executePauseOpenRewardWorkflow(params: SimpleOperationParams): Promise<TransactionResult> {
  try {
    const { rewardAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    if (!rewardAddress) {
      throw new Error("Reward address is required for pause operation");
    }

    const transactionData = await brandService.pauseOpenRewards(rewardAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Pause open reward workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the resume open reward workflow
 */
export async function executeResumeOpenRewardWorkflow(params: SimpleOperationParams): Promise<TransactionResult> {
  try {
    const { rewardAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    if (!rewardAddress) {
      throw new Error("Reward address is required for resume operation");
    }

    const transactionData = await brandService.resumeOpenRewards(rewardAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Resume open reward workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the change main account workflow
 */
export async function executeChangeMainAccountWorkflow(params: SimpleOperationParams): Promise<TransactionResult> {
  try {
    const { newMainAcctAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    if (!newMainAcctAddress) {
      throw new Error("New main account address is required for change main account operation");
    }

    const transactionData = await brandService.changeMainAccount(newMainAcctAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Change main account workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the change optimal open reward workflow
 */
export async function executeChangeOptimalOpenRewardWorkflow(params: SimpleOperationParams): Promise<TransactionResult> {
  try {
    const { rewardName, newOptimalValue, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    if (!rewardName || !newOptimalValue) {
      throw new Error("Reward name and new optimal value are required for change optimal operation");
    }

    const transactionData = await brandService.changeOptimalValuationForOpenRewards(
      rewardName,
      newOptimalValue.toNumber(),
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Change optimal open reward workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the change R optimal workflow
 */
export async function executeChangeROptimalWorkflow(params: SimpleOperationParams): Promise<TransactionResult> {
  try {
    const { rewardAddress, newROptimal, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    if (!rewardAddress || !newROptimal) {
      throw new Error("Reward address and new R optimal value are required for change R optimal operation");
    }

    const transactionData = await brandService.updateROtimal(rewardAddress, newROptimal, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Change R optimal workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the create reward workflow
 */
export async function executeCreateRewardWorkflow(params: CreateRewardParams): Promise<TransactionResult> {
  try {
    const { name, symbol, descriptionLink, totalSupply, userInfo, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    const transactionData = await brandService.createNewReward(
      name,
      symbol,
      descriptionLink,
      ethers.utils.parseEther(totalSupply),
      userInfo.publicAddress,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Create reward workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the integrate reward workflow
 */
export async function executeIntegrateRewardWorkflow(params: IntegrateRewardParams): Promise<TransactionResult> {
  try {
    const { rewardAddress, descriptionLink, readTandC, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    const transactionData = await brandService.integrateExistingFungibleRewards(
      rewardAddress,
      descriptionLink,
      readTandC,
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Integrate reward workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the update brand details workflow
 */
export async function executeUpdateBrandDetailsWorkflow(params: UpdateBrandDetailsParams): Promise<TransactionResult> {
  try {
    const { brandId, brandDetails, ignoreDefault, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    const transactionData = await brandService.updateDetails(brandId, brandDetails, ignoreDefault, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Update brand details workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Executes the update general config workflow
 */
export async function executeUpdateGeneralConfigWorkflow(params: UpdateGeneralConfigParams): Promise<TransactionResult> {
  try {
    const { brandId, generalConfig, ignoreDefault, JSON_RPC_URL, OPEN_REWARD_DIAMOND } = params;

    const transactionData = await brandService.updateGeneralConfigurations(brandId, generalConfig, ignoreDefault, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    return executeBasicOperationWorkflow(params, transactionData);
  } catch (error) {
    throw new Error(`Update general config workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
