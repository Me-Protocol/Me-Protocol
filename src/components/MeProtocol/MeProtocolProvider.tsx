import React, { FC, createContext, useState } from "react";
import { meRegisterFN } from "../../module/meRegister";
import { MeRegisterProps, MeProtocolProviderProps } from "../../lib/types";
import { magic } from "../../lib/magic";
import { brandService } from "../../call";

export const MeProtocolContext = createContext<{
  loading: boolean;
  getBrandId: ({ magicEmail }: { magicEmail: string }) => Promise<{ brandId: string } | undefined>;
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

  // ================================================================= THIS IS THE FUNCTION TO QUERY BRAND ID =================================================================
  async function getBrandId({
    magicEmail,
  }: {
    magicEmail: string;
  }): Promise<{ brandId: string } | undefined> {
    setLoading(true);
    try {
      if (!(await magic.user.isLoggedIn())) {
        await magic.auth.loginWithEmailOTP({ email: magicEmail });
        const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);
        const { brandId }: { brandId: string } = await brandService.getBrandConfigByAddress(
          loggedInUserInfo.publicAddress
        );
        return { brandId };
      } else {
        const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);
        const { brandId }: { brandId: string } = await brandService.getBrandConfigByAddress(
          loggedInUserInfo.publicAddress
        );
        return { brandId };
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <MeProtocolContext.Provider value={{ meRegister, loading, getBrandId }}>
      {children}
    </MeProtocolContext.Provider>
  );
};

export default MeProtocolProvider;
