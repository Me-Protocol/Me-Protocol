import { BigNumber, ethers } from "ethers";
import { OPEN_REWARD_DIAMOND, VaultPermitParams, usersServiceWithPermit } from "@developeruche/protocol-core";
import { magic } from "../lib/magic";
import { createWeb3 } from "../lib/web3";
import { relay } from "@developeruche/protocol-core";
import { sendTransactionData, spend_reward_magic } from "@developeruche/runtime-sdk";
import axios from "axios";
import { SpendRewardsOnAnotherBrandWithVaultPermitProps } from "../lib/types";

export async function spendRewardsOnAnotherBrandWithVaultPermitFN({
  email,
  setLoading,
  setSpendLoading,
  setSpendingSteps,
  spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
  rewardId,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  RUNTIME_URL,
  GELATO_API_KEY,
  debug,
}: SpendRewardsOnAnotherBrandWithVaultPermitProps) {
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

      //=============================================== DO THE REST HERE==========================================================

      setSpendLoading(true);
      const spendInfo = {
        rewardAtHand,
        targettedReward,
        amountOfRewardAtHand,
        expectedAmountOfTargetedReward,
      };
      const {
        data: spend_reward_magic_data,
        from,
        hash,
        nonce,
        r,
        s,
        v,
      }: sendTransactionData = await spend_reward_magic(
        spendInfo.rewardAtHand,
        spendInfo.amountOfRewardAtHand as BigNumber,
        OPEN_REWARD_DIAMOND,
        signer,
        RUNTIME_URL
      );

      setSpendingSteps(1);
      const { data: spendData }: any = await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
        {
          params: {
            from,
            nonce,
            data: spend_reward_magic_data,
            r,
            s,
            v,
            hash,
          },
          rewardId,
        },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );

      let vaultParams: VaultPermitParams = {
        owner: spendData?.data?.owner,
        count: spendData?.data?.count,
        globalHash: spendData?.data?.globalHash,
        prefixedHash: spendData?.data?.prefixedHash,
        r: spendData?.data?.sig?.r,
        s: spendData?.data?.sig?.s,
        v: spendData?.data?.sig?.v,
        reward: spendData?.data?.reward,
        spender: spendData?.data?.spender,
        value: spendData?.data?.value,
      };

      setSpendingSteps(2);

      const datum: any = await usersServiceWithPermit.spendRewardsOnAnotherBrandWithVaultPermit(spendInfo, vaultParams);

      // console.log(datum, "DATUUM");

      const relayInput = {
        from: loggedInUserInfo.publicAddress,
        data: datum.data,
        to: OPEN_REWARD_DIAMOND,
      };

      setSpendingSteps(3);
      // const ADMIN_KEY = "5393eb89457505dc0cea935ef8f3e09b03ecc283234fff38fdf6c8a8d0ccf35a";
      // const _provider = new ethers.providers.JsonRpcProvider(
      //   "https://polygon-mumbai.g.alchemy.com/v2/bGRq4Ou6YB_plvpRZFDQsWW1MWukDWy6"
      // );
      // const wallet = new ethers.Wallet(ADMIN_KEY, _provider);
      // const register_tx = await wallet.sendTransaction({
      //   to: OPEN_REWARD_DIAMOND,
      //   data: relayInput.data,
      // });

      const { taskId }: { taskId: string } = await relay(relayInput, signer, meApiKey, reqURL, GELATO_API_KEY, costPayerId, debug);

      // console.log(taskId, "TASK HIGH DEE");

      return { taskId, spendData };
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

      setSpendLoading(true);
      const spendInfo = {
        rewardAtHand,
        targettedReward,
        amountOfRewardAtHand,
        expectedAmountOfTargetedReward,
      };
      const {
        data: spend_reward_magic_data,
        from,
        hash,
        nonce,
        r,
        s,
        v,
      }: sendTransactionData = await spend_reward_magic(
        spendInfo.rewardAtHand,
        spendInfo.amountOfRewardAtHand as BigNumber,
        OPEN_REWARD_DIAMOND,
        signer,
        RUNTIME_URL
      );

      setSpendingSteps(1);
      const { data: spendData }: any = await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
        {
          params: {
            from,
            nonce,
            data: spend_reward_magic_data,
            r,
            s,
            v,
            hash,
          },
          rewardId,
        },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );

      let vaultParams: VaultPermitParams = {
        owner: spendData?.data?.owner,
        count: spendData?.data?.count,
        globalHash: spendData?.data?.globalHash,
        prefixedHash: spendData?.data?.prefixedHash,
        r: spendData?.data?.sig?.r,
        s: spendData?.data?.sig?.s,
        v: spendData?.data?.sig?.v,
        reward: spendData?.data?.reward,
        spender: spendData?.data?.spender,
        value: spendData?.data?.value,
      };

      setSpendingSteps(2);

      const datum: any = await usersServiceWithPermit.spendRewardsOnAnotherBrandWithVaultPermit(spendInfo, vaultParams);

      // console.log(datum, "DATUUM");

      const relayInput = {
        from: loggedInUserInfo.publicAddress,
        data: datum.data,
        to: OPEN_REWARD_DIAMOND,
      };

      setSpendingSteps(3);
      // const ADMIN_KEY = "5393eb89457505dc0cea935ef8f3e09b03ecc283234fff38fdf6c8a8d0ccf35a";
      // const _provider = new ethers.providers.JsonRpcProvider(
      //   "https://polygon-mumbai.g.alchemy.com/v2/bGRq4Ou6YB_plvpRZFDQsWW1MWukDWy6"
      // );
      // const wallet = new ethers.Wallet(ADMIN_KEY, _provider);
      // const register_tx = await wallet.sendTransaction({
      //   to: OPEN_REWARD_DIAMOND,
      //   data: relayInput.data,
      // });

      const { taskId }: { taskId: string } = await relay(relayInput, signer, meApiKey, reqURL, GELATO_API_KEY, costPayerId, debug);

      // console.log(taskId, "TASK HIGH DEE");

      return { taskId, spendData };
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
    setSpendLoading(false);
    setSpendingSteps(0);
    magic.user.logout();
  }
}
