import { ethers } from "ethers";
import { magic } from "../lib/magic";
import { createWeb3 } from "../lib/web3";
import {
  OPEN_REWARD_DIAMOND,
  VaultPermitParams,
  relay,
  usersServiceWithPermit,
} from "@developeruche/protocol-core";
import { sendTransactionData, spend_reward_magic } from "@developeruche/runtime-sdk";
import axios from "axios";
import { spendRewardsOnIssuingBrandWithVaultPermitProps } from "../lib/types";

export async function spendRewardsOnIssuingBrandWithVaultPermitFN({
  email,
  reward_amount,
  reward_address,
  rewardId,
  setError,
  reqURL,
  meApiKey,
  costPayerId,
  setLoading,
  setSpendLoading,
  setSpendingSteps,
}: spendRewardsOnIssuingBrandWithVaultPermitProps) {
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

      const { data, from, hash, nonce, r, s, v }: sendTransactionData = await spend_reward_magic(
        reward_address,
        reward_amount,
        OPEN_REWARD_DIAMOND,
        signer
      );

      setSpendingSteps(1);

      const { data: spendData }: any = await axios.post(
        `${reqURL.replace("/cost/request", "")}/reward/spend`,
        {
          params: {
            from,
            nonce,
            data,
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

      //   console.log(vaultParams, "VAULT DATA RESPONSE");

      const datum: any = await usersServiceWithPermit.spendRewardsOnIssuingBrandWithVaultPermit(
        vaultParams
      );

      const relayInput = {
        from: loggedInUserInfo.publicAddress,
        data: datum.data,
        to: OPEN_REWARD_DIAMOND,
      };
      setSpendingSteps(3);

      const { taskId }: { taskId: string } = await relay(
        relayInput,
        signer,
        meApiKey,
        reqURL,
        costPayerId
      );

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

      //=================================================== DO THE REST HERE=====================================================
      setSpendLoading(true);

      const { data, from, hash, nonce, r, s, v }: sendTransactionData = await spend_reward_magic(
        reward_address,
        reward_amount,
        OPEN_REWARD_DIAMOND,
        signer
      );

      setSpendingSteps(1);

      const { data: spendData }: any = await axios.post(
        `${reqURL.replace("/cost/request", "")}/reward/spend`,
        {
          params: {
            from,
            nonce,
            data,
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

      //   console.log(vaultParams, "VAULT DATA RESPONSE");

      const datum: any = await usersServiceWithPermit.spendRewardsOnIssuingBrandWithVaultPermit(
        vaultParams
      );

      const relayInput = {
        from: loggedInUserInfo.publicAddress,
        data: datum.data,
        to: OPEN_REWARD_DIAMOND,
      };
      setSpendingSteps(3);

      const { taskId }: { taskId: string } = await relay(
        relayInput,
        signer,
        meApiKey,
        reqURL,
        costPayerId
      );

      return { taskId };
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
    setSpendLoading(false);
    setSpendingSteps(0);
  }
}
