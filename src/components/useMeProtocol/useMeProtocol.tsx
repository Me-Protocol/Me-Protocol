import { useContext } from "react";
import { MeProtocolContext } from "../MeProtocol/MeProtocolProvider";
import {
  BrandDetailsProps,
  CreateRewardProps,
  GetBrandDetailsProps,
  MeRegisterProps,
} from "../../lib/types";

const useMeProtocol = () => {
  const context = useContext<{
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
  } | null>(MeProtocolContext);

  if (!context) {
    throw new Error("useMeProtocol must be used within a MeProtocolProvider");
  }
  return context;
};
export default useMeProtocol;
