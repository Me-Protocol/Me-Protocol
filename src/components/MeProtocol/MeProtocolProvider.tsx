import React, { FC, createContext, useContext } from "react";
// import { createWeb3 } from "../../lib/web3";
import { magic } from "../../lib/magic";

interface MeProtocolProviderProps {
  children: React.ReactNode;
}

export const MeProtocolContext = createContext<{
  meRegister: any;
} | null>(null);

const MeProtocolProvider: FC<MeProtocolProviderProps> = ({ children }) => {
  async function meRegister() {
    if (!(await magic.user.isLoggedIn())) {
      return "is not Logged in";
    } else {
      return "is Logged in";
    }

    const isLoggedIn = await magic.user.isLoggedIn();
    // const magicWeb3 = await createWeb3(magic);
  }
  return <MeProtocolContext.Provider value={{ meRegister }}>{children}</MeProtocolContext.Provider>;
};

export default MeProtocolProvider;
