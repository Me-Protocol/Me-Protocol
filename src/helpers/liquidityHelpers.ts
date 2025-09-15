import { ethers } from "ethers";
import { brandService, relay } from "@developeruche/protocol-core";
import { RelayInput, TransactionResult, BaseWorkflowParams } from "./types";
import { signConsentAndGetVaultPermit } from "./permitHelpers";

/**
 * Parameters for adding liquidity workflow
 */
export interface AddLiquidityWorkflowParams extends BaseWorkflowParams {
  rewardAddress: string;
  rewardAmount: string;
  meAmount: string;
  meToken: string;
  currentBrandId: string;
  liquidityFunction: "addLiquidityOnly" | "addLiquidityAndStartPool" | "topUpLiquidity";
}

/**
 * Executes the add liquidity workflow for open rewards
 *
 * This function handles:
 * 1. Signing consent for ME token
 * 2. Getting vault permit from API
 * 3. Preparing transaction data using brand service
 * 4. Executing relay transaction
 *
 * @param params - Add liquidity workflow parameters
 * @returns Promise resolving to transaction result with taskId
 * @throws Error if any step fails
 */
export async function executeAddLiquidityWorkflow(params: AddLiquidityWorkflowParams): Promise<TransactionResult> {
  const {
    signer,
    userInfo,
    rewardAddress,
    rewardAmount,
    meAmount,
    meToken,
    currentBrandId,
    meApiKey,
    reqURL,
    GELATO_API_KEY,
    JSON_RPC_URL,
    CHAIN_ID,
    OPEN_REWARD_DIAMOND,
    costPayerId,
    debug,
    liquidityFunction,
    pk,
    hedera,
  } = params;

  try {
    const parsedMeAmount = ethers.utils.parseEther(meAmount).toString();
    const parsedRewardAmount = ethers.utils.parseEther(rewardAmount);

    // Prepare transaction data based on the liquidity function type
    let transactionData;
    if (liquidityFunction === "topUpLiquidity") {
      // Top up liquidity doesn't need vault permit, uses signer directly
      transactionData = await brandService.topUpOpenRewardsLiquidityPermit(
        signer,
        rewardAddress,
        parsedRewardAmount,
        ethers.utils.parseEther(meAmount),
        meToken,
        CHAIN_ID.toString(),
        JSON_RPC_URL,
        OPEN_REWARD_DIAMOND
      );
    } else {
      // Other liquidity functions need vault permit
      const vaultPermitData = await signConsentAndGetVaultPermit(signer, meToken, parsedMeAmount, {
        reqURL,
        meApiKey,
        brandId: currentBrandId,
        rewardAddress,
      });

      if (liquidityFunction === "addLiquidityAndStartPool") {
        transactionData = await brandService.addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool(
          rewardAddress,
          parsedRewardAmount,
          ethers.utils.parseEther(meAmount),
          vaultPermitData,
          JSON_RPC_URL,
          OPEN_REWARD_DIAMOND
        );
      } else {
        transactionData = await brandService.addLiquidityForOpenRewardsWithTreasuryAndMeDispenser(
          rewardAddress,
          parsedRewardAmount,
          ethers.utils.parseEther(meAmount),
          vaultPermitData,
          JSON_RPC_URL,
          OPEN_REWARD_DIAMOND
        );
      }
    }

    if (!transactionData?.data) {
      throw new Error("Failed to prepare liquidity transaction data");
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
      throw new Error("Failed to execute relay transaction");
    }

    return { taskId };
  } catch (error) {
    throw new Error(`Add liquidity workflow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
