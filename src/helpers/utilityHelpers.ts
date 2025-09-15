import { brandService } from "@developeruche/protocol-core";
import * as runtimeSdk from "@developeruche/runtime-sdk";
import { ethers } from "ethers";
import { OperationResult } from "./types";
import { Magic } from "magic-sdk";

/**
 * User rewards runtime result interface
 */
export interface UserRewardsRuntimeResult {
  rewardBalances: Array<{
    contractAddress: string;
    balance: string;
  }>;
  userDataWithBalance: any;
}

/**
 * Simple brand details retrieval
 *
 * @param magic - Magic instance
 * @param userAddress - User's wallet address
 * @param getOnlyId - Whether to return only the brand ID
 * @param JSON_RPC_URL - RPC URL
 * @param OPEN_REWARD_DIAMOND - Diamond contract address
 * @returns Promise resolving to brand details or ID
 */
export async function getBrandDetails(
  magic: Magic,
  userAddress: string,
  getOnlyId: boolean,
  JSON_RPC_URL: string,
  OPEN_REWARD_DIAMOND: string
): Promise<OperationResult> {
  try {
    const brandDetails = await brandService.getBrandConfigByAddress(userAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    if (getOnlyId) {
      return { brandId: brandDetails.brandId };
    } else {
      return { brandDetails };
    }
  } catch (error) {
    throw new Error(`Get brand details failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Get user rewards runtime data
 *
 * @param rewardListFromBackend - List of rewards from backend
 * @param userData - User data containing wallet address
 * @param RUNTIME_URL - Runtime SDK URL
 * @returns Promise resolving to user rewards data
 */
export async function getUserRewardsRuntime(rewardListFromBackend: any[], userData: any, RUNTIME_URL: string): Promise<UserRewardsRuntimeResult> {
  try {
    const { data } = await runtimeSdk.get_account_detail_with_url(
      {
        address: userData?.customer?.walletAddress,
      },
      RUNTIME_URL
    );

    let result: Array<{ balance: string; contractAddress: string }> = [];

    for (const address in data.result.balance) {
      result.push({
        contractAddress: ethers.utils.getAddress(address),
        balance: ethers.utils.formatEther(data.result.balance[address]),
      });
    }

    const userBalances = rewardListFromBackend?.map((reward) => {
      const balRes = result?.find((bal) => bal.contractAddress === reward?.contractAddress);
      return {
        ...reward,
        balance: balRes,
      };
    });

    const rewardBalances = userBalances?.filter((e) => e.balance);

    return {
      rewardBalances,
      userDataWithBalance: { ...userData, rewardBalances },
    };
  } catch (error) {
    throw new Error(`Get user rewards runtime failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Simple logout utility
 *
 * @param magic - Magic instance
 * @param clearCache - Whether to clear cache (optional)
 * @returns Promise resolving to logout result
 */
export async function performLogout(magic: Magic, clearCache?: boolean): Promise<void> {
  try {
    await magic.user.logout();
    if (clearCache) {
      // Add logic to clear cache if needed
    }
  } catch (error) {
    throw new Error(`Logout failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
