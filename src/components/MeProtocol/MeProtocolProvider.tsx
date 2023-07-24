import React, { Dispatch, FC, SetStateAction, createContext, useContext, useState } from "react";
import { magic } from "../../lib/magic";
import { createWeb3 } from "../../lib/web3";
import { ethers } from "ethers";
import { OPEN_REWARD_DIAMOND, brandService } from "../../call";
import { relay } from "../../call/services/gelatoRelayer";
import { meRegisterFN } from "../../module/MeRegister";

interface MeProtocolProviderProps {
  children: React.ReactNode;
}

export interface MeRegisterProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  brandName: string;
  onlinePresence: string;
}

export const MeProtocolContext = createContext<{
  loading: boolean;
  meRegister: ({
    magicEmail,
    brandName,
    onlinePresence,
  }: MeRegisterProps) => Promise<{ transactionHash: string } | undefined>;
} | null>(null);

const MeProtocolProvider: FC<MeProtocolProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // ================================================================= THIS IS THE REGISTER FUNCTION  =================================================================
  async function meRegister({
    magicEmail,
    brandName,
    onlinePresence,
  }: Omit<MeRegisterProps, "setLoading">) {
    return await meRegisterFN({ magicEmail, brandName, onlinePresence, setLoading });
  }
  // ================================================================= THIS IS THE UPDATE FUNCTION  =================================================================

  return (
    <MeProtocolContext.Provider value={{ meRegister, loading }}>
      {children}
    </MeProtocolContext.Provider>
  );
};

export default MeProtocolProvider;
