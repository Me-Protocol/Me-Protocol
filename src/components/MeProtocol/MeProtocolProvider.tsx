import React, { FC, createContext, useContext } from "react";
// import { createWeb3 } from "../../lib/web3";
import { magic } from "../../lib/magic";

interface MeProtocolProviderProps {
  children: React.ReactNode;
}

const MeProtocolContext = createContext<{
  meRegister: any;
} | null>(null);

const MeProtocolProvider: FC<MeProtocolProviderProps> = ({ children }) => {
  async function meRegister({
    brandName,
    onlinePresence,
  }: {
    brandName: string;
    onlinePresence: string;
  }) {
    console.log("is not Logged in");
    if (!(await magic.user.isLoggedIn())) return;
    console.log("is Logged in");

    const isLoggedIn = await magic.user.isLoggedIn();
    // const magicWeb3 = await createWeb3(magic);
  }
  return <MeProtocolContext.Provider value={{ meRegister }}>{children}</MeProtocolContext.Provider>;
};

export default MeProtocolProvider;

export const useMeProtocol = () => {
  const context = useContext(MeProtocolContext);

  if (!context) {
    throw new Error("useMeProtocol must be used within a MeProtocolProvider");
  }

  return context;
};
