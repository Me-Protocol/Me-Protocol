import { ethers } from "ethers";
import { brandService, magicRelay } from "@developeruche/protocol-core";
import { createWeb3 } from "../lib/web3";
import { delay } from "../helpers/delay";
import { CreateRewardProps } from "../lib/types";
export async function createRewardFN({
  email,
  magic,
  name,
  symbol,
  descriptionLink,
  totalSupply,
  setLoading,
  meApiKey,
  reqURL,
  costPayerId,
  setError,

  debug,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  CHAIN_ID,
}: CreateRewardProps) {
  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!(await magic.user.isLoggedIn())) {
      await magic.auth.loginWithEmailOTP({ email });
      let isConnected = magicWeb3;
      while (!isConnected) {
        await delay(1000); // Wait for 1 second
        isConnected = magicWeb3;
      }
      const accounts = await magicWeb3.eth.getAccounts();
      //if the user accounts is not found - update it on the console
      if (accounts.length === 0) {
        return undefined;
      }
      const userAccount = accounts[0];
      // console.log(userAccount, "user account is this");
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.BrowserProvider(provider);
      const signer = await web3Provider.getSigner(userAccount);
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

      const data = await brandService.createNewReward(
        name,
        symbol,
        descriptionLink,
        BigInt(ethers.parseEther(totalSupply).toString()),
        loggedInUserInfo.publicAddress,
        JSON_RPC_URL,
        OPEN_REWARD_DIAMOND
      );
      const magicInput = {
        from: loggedInUserInfo.publicAddress,
        data,
        to: OPEN_REWARD_DIAMOND,
      };

      return await magicRelay(magicInput, magic);

      // const relayInput = {
      //   from: loggedInUserInfo.publicAddress,
      //   data: data.data,
      //   to: OPEN_REWARD_DIAMOND,
      // };

      // const { taskId }: { taskId: string } = await relay(
      //   relayInput,
      //   signer,
      //   meApiKey,
      //   reqURL,
      //
      //   JSON_RPC_URL,
      //   CHAIN_ID,
      //   OPEN_REWARD_DIAMOND,
      //   costPayerId,
      //   debug
      // );

      // return { taskId };
    } else {
      let isConnected = magicWeb3;
      while (!isConnected) {
        await delay(1000); // Wait for 1 second
        isConnected = magicWeb3;
      }

      const { email: connectedEmail } = await magic.user.getInfo();
      //IF THE PERSISTED USER INFO IS NOT THE INFO OF THE USER TRYING TO PERFORM THE FUNCTION logout and try to login again
      if (email !== connectedEmail) {
        await magic.user.logout();
        await magic.auth.loginWithEmailOTP({ email });
        let isConnected = magicWeb3;
        while (!isConnected) {
          await delay(1000); // Wait for 1 second
          isConnected = magicWeb3;
        }
        const accounts = await magicWeb3.eth.getAccounts();
        //if the user accounts is not found - update it on the console
        if (accounts.length === 0) {
          return undefined;
        }
        const userAccount = accounts[0];
        // console.log(userAccount, "user account is this");
        const provider = await magic.wallet.getProvider();
        const web3Provider = new ethers.BrowserProvider(provider);
        const signer = await web3Provider.getSigner(userAccount);
        const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

        const data = await brandService.createNewReward(
          name,
          symbol,
          descriptionLink,
          BigInt(ethers.parseEther(totalSupply).toString()),
          loggedInUserInfo.publicAddress,
          JSON_RPC_URL,
          OPEN_REWARD_DIAMOND
        );

        const magicInput = {
          from: loggedInUserInfo.publicAddress,
          data,
          to: OPEN_REWARD_DIAMOND,
        };

        return await magicRelay(magicInput, magic);

        // const relayInput = {
        //   from: loggedInUserInfo.publicAddress,
        //   data: data.data,
        //   to: OPEN_REWARD_DIAMOND,
        // };

        // const { taskId }: { taskId: string } = await relay(
        //   relayInput,
        //   signer,
        //   meApiKey,
        //   reqURL,
        //
        //   JSON_RPC_URL,
        //   CHAIN_ID,
        //   OPEN_REWARD_DIAMOND,
        //   costPayerId,
        //   debug
        // );

        // return { taskId };
      }
      const accounts = await magicWeb3.eth.getAccounts();
      //if the user accounts is not found - update it on the console
      if (accounts.length === 0) {
        return undefined;
      }
      const userAccount = accounts[0];
      // console.log(userAccount, "user account is this");
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.BrowserProvider(provider);
      const signer = await web3Provider.getSigner(userAccount);
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

      const data = await brandService.createNewReward(
        name,
        symbol,
        descriptionLink,
        BigInt(ethers.parseEther(totalSupply).toString()),
        loggedInUserInfo.publicAddress,
        JSON_RPC_URL,
        OPEN_REWARD_DIAMOND
      );
      const magicInput = {
        from: loggedInUserInfo.publicAddress,
        data,
        to: OPEN_REWARD_DIAMOND,
      };

      return await magicRelay(magicInput, magic);

      // const relayInput = {
      //   from: loggedInUserInfo.publicAddress,
      //   data: data.data,
      //   to: OPEN_REWARD_DIAMOND,
      // };
      // const { taskId }: { taskId: string } = await relay(
      //   relayInput,
      //   signer,
      //   meApiKey,
      //   reqURL,
      //
      //   JSON_RPC_URL,
      //   CHAIN_ID,
      //   OPEN_REWARD_DIAMOND,
      //   costPayerId,
      //   debug
      // );

      // return { taskId };
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}
