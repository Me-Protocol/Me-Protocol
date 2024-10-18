import { ethers } from "ethers";
import { GetUserRewardsRuntimeProps, JsonRpcResponse } from "../lib/types";
import * as runtimeSdk from "@developeruche/runtime-sdk";

export async function getUserRewardsRuntimeFN({ rewardListFromBackend, setLoading, setError, userData, RUNTIME_URL }: GetUserRewardsRuntimeProps) {
  setLoading(true);

  let userInfo = userData;

  try {
    const { data }: { data: JsonRpcResponse } = await runtimeSdk.get_account_detail_with_url(
      {
        address: userInfo?.customer?.walletAddress,
      },
      RUNTIME_URL
    );

    let result: Array<{ balance: string; contractAddress: string }> = [];

    for (const address in data.result.balance) {
      result.push({
        contractAddress: ethers.getAddress(address),
        balance: ethers.formatEther(data.result.balance[address]),
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
      userDataWithBalance: { ...userInfo, rewardBalances },
    };
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}
