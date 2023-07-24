import React, { Dispatch, FC, SetStateAction, createContext, useState } from "react";
import { meRegisterFN } from "../../module/meRegister";
import { MeRegisterProps, MeProtocolProviderProps } from "../../lib/types";

export const MeProtocolContext = createContext<{
  loading: boolean;
  meRegister: ({
    magicEmail,
    brandName,
    onlinePresence,
  }: Omit<MeRegisterProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
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
