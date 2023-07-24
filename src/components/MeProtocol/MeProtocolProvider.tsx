import React, { FC, createContext, useContext, useState } from "react";
import { magic } from "../../lib/magic";
import { createWeb3 } from "../../lib/web3";
import { ethers } from "ethers";
import { OPEN_REWARD_DIAMOND, brandService } from "../../call";
import { relay } from "../../call/services/gelatoRelayer";

interface MeProtocolProviderProps {
  children: React.ReactNode;
}

export interface MeRegisterProps {
  magicEmail: string;
  brandName: string;
  onlinePresence: string;
}

export const MeProtocolContext = createContext<{
  meRegister: ({
    magicEmail,
    brandName,
    onlinePresence,
  }: MeRegisterProps) => Promise<{ transactionHash: string } | undefined>;
} | null>(null);

const MeProtocolProvider: FC<MeProtocolProviderProps> = ({ children }) => {
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  async function meRegister({ magicEmail, brandName, onlinePresence }: MeRegisterProps) {
    setRegisterLoading(true);

    try {
      const magicWeb3 = await createWeb3(magic);

      if (!(await magic.user.isLoggedIn())) {
        await magic.auth.loginWithEmailOTP({ email: magicEmail });
        let isConnected = magicWeb3;
        while (!isConnected) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
          isConnected = magicWeb3;
        }
        const accounts = await magicWeb3.eth.getAccounts();
        //if the user accounts is not found - update it on the console
        if (accounts.length === 0) {
          return { transactionHash: "no accounts found" };
        }
        const userAccount = accounts[0];
        console.log(userAccount, "user account is this");
        const provider = await magic.wallet.getProvider();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner(userAccount);
        const data = await brandService.register(brandName, onlinePresence);
        const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);
        const relayInput = {
          from: loggedInUserInfo.publicAddress,
          data: data.data,
          to: OPEN_REWARD_DIAMOND,
        };
        // console.log(relayInput);
        const result: any = await relay(relayInput, signer);
        // console.log(result);

        return { transactionHash: result.taskId };
        // return { transactionHash: "end of line" };
      } else {
        let isConnected = magicWeb3;
        while (!isConnected) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
          isConnected = magicWeb3;
        }
        const accounts = await magicWeb3.eth.getAccounts();
        //if the user accounts is not found - update it on the console
        if (accounts.length === 0) {
          return { transactionHash: "no accounts found" };
        }
        const userAccount = accounts[0];
        console.log(userAccount, "user account is this");
        const provider = await magic.wallet.getProvider();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner(userAccount);
        const data = await brandService.register(brandName, onlinePresence);
        const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);
        const relayInput = {
          from: loggedInUserInfo.publicAddress,
          data: data.data,
          to: OPEN_REWARD_DIAMOND,
        };
        // console.log(relayInput);
        const result: any = await relay(relayInput, signer);
        // console.log(result);

        return { transactionHash: result.taskId };
        // return { transactionHash: "end of line" };
      }
    } catch (error) {
      throw error;
    } finally {
      setRegisterLoading(false);
    }
  }

  return <MeProtocolContext.Provider value={{ meRegister }}>{children}</MeProtocolContext.Provider>;
};

export default MeProtocolProvider;

// export const useMeProtocol = () => {
//   const context = useContext(MeProtocolContext);

//   if (!context) {
//     throw new Error("useMeProtocol must be used within a MeProtocolProvider");
//   }

//   return context;
// };
