import { distribute_reward_specific_magic } from "@developeruche/runtime-sdk";
import { ethers } from "ethers";
import { magic } from "../lib/magic";
import { createWeb3 } from "../lib/web3";
import { sendTransactionData } from "@developeruche/runtime-sdk/dist/utils/interfaces";
import { DistributeRewardsProps } from "../lib/types";

export async function distributeRewardsFN({
  email,
  reward_address,
  reward_recipient,
  reward_amounts,
  setError,
  setLoading,
}: DistributeRewardsProps) {
  setLoading(true);
  try {
    const magicWeb3 = await createWeb3(magic);

    if (!(await magic.user.isLoggedIn())) {
      await magic.auth.loginWithEmailOTP({ email });
      let isConnected = magicWeb3;
      while (!isConnected) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        isConnected = magicWeb3;
      }
      const accounts = await magicWeb3.eth.getAccounts();
      if (accounts.length === 0) {
        return undefined;
      }
      const userAccount = accounts[0];
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(userAccount);
      const res: sendTransactionData = await distribute_reward_specific_magic(
        reward_address,
        reward_recipient,
        reward_amounts,
        signer
      );

      return res;
    } else {
      let isConnected = magicWeb3;
      while (!isConnected) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        isConnected = magicWeb3;
      }
      const accounts = await magicWeb3.eth.getAccounts();
      if (accounts.length === 0) {
        return undefined;
      }
      const userAccount = accounts[0];
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(userAccount);
      const res: sendTransactionData = await distribute_reward_specific_magic(
        reward_address,
        reward_recipient,
        reward_amounts,
        signer
      );
      return res;
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}
