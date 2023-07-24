import React, { FC, createContext, useState } from "react";
import { meRegisterFN } from "../../module/meRegister";
import {
  MeRegisterProps,
  MeProtocolProviderProps,
  BrandDetailsProps,
  GetBrandDetailsProps,
  CreateRewardProps,
} from "../../lib/types";
import { getBrandDetailsFN } from "../../module/getBrandDetails";
import { createRewardFN } from "../../module/createReward";

export const MeProtocolContext = createContext<{
  loading: boolean;
  createReward: ({
    magicEmail,
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  getBrandDetails: ({
    magicEmail,
    getOnlyId,
  }: Omit<GetBrandDetailsProps, "setLoading">) => Promise<
    { brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined
  >;
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

  // ================================================================= THIS IS THE FUNCTION TO QUERY BRAND ID ===============================================================
  async function getBrandDetails({
    magicEmail,
    getOnlyId = false,
  }: {
    magicEmail: string;
    getOnlyId?: boolean;
  }): Promise<{ brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined> {
    return await getBrandDetailsFN({ magicEmail, setLoading, getOnlyId });
  }
  // =============================================================== THIS IS THE FUNCTION TO CREATE REWARD ===============================================================

  async function createReward({
    magicEmail,
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, "setLoading">) {
    return await createRewardFN({
      magicEmail,
      name,
      symbol,
      descriptionLink,
      totalSupply,
      setLoading,
    });
  }

  return (
    <MeProtocolContext.Provider value={{ meRegister, loading, getBrandDetails, createReward }}>
      {children}
    </MeProtocolContext.Provider>
  );
};

export default MeProtocolProvider;
