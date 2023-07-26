import { ethers } from "ethers";
import { brandService, OPEN_REWARD_DIAMOND } from "../call";
import { magic } from "../lib/magic";
import { createWeb3 } from "../lib/web3";
import { relay } from "../call/services/gelatoRelayer";
import { ResumeOpenRewardProps } from "../lib/types";

export async function resumeOpenRewardFN({
  brandEmail,
  rewardAddress,
  setLoading,
}: ResumeOpenRewardProps) {
  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!(await magic.user.isLoggedIn())) {
      await magic.auth.loginWithbrandEmailOTP({ email: brandEmail });
      let isConnected = magicWeb3;
      while (!isConnected) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        isConnected = magicWeb3;
      }
      const accounts = await magicWeb3.eth.getAccounts();
      //if the user accounts is not found - update it on the console
      if (accounts.length === 0) {
        return { taskId: "no accounts found" };
      }
      const userAccount = accounts[0];
      // console.log(userAccount, "user account is this");
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(userAccount);
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

      const data = await brandService.resumeOpenRewards(rewardAddress);
      const relayInput = {
        from: loggedInUserInfo.publicrewardAddress,
        data: data.data,
        to: OPEN_REWARD_DIAMOND,
      };

      const { taskId }: { taskId: string } = await relay(relayInput, signer);

      return { taskId };
    } else {
      let isConnected = magicWeb3;
      while (!isConnected) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        isConnected = magicWeb3;
      }
      const accounts = await magicWeb3.eth.getAccounts();
      //if the user accounts is not found - update it on the console
      if (accounts.length === 0) {
        return { taskId: "no accounts found" };
      }
      const userAccount = accounts[0];
      // console.log(userAccount, "user account is this");
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(userAccount);
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

      const data = await brandService.resumeOpenRewards(rewardAddress);
      const relayInput = {
        from: loggedInUserInfo.publicrewardAddress,
        data: data.data,
        to: OPEN_REWARD_DIAMOND,
      };
      const { taskId }: { taskId: string } = await relay(relayInput, signer);

      return { taskId };
    }
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
}
