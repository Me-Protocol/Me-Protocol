import { useContext } from "react";
import {
  BrandDetailsProps,
  ChangeMainAccountProps,
  CreateRewardProps,
  GetBrandDetailsProps,
  MeRegisterProps,
  SetUpOpenRewardProps,
} from "../../lib/types";
import { MeProtocolContext } from "../MeProtocol/MeProtocolProvider";

const useMeProtocol = () => {
  const context = useContext<{
    loading: boolean;
    setUpOpenRewards: ({
      magicEmail,
      address,
    }: Omit<SetUpOpenRewardProps, "setLoading">) => Promise<
      { transactionHash: string } | undefined
    >;
    changeMainAccount: ({
      magicEmail,
      address,
    }: Omit<ChangeMainAccountProps, "setLoading">) => Promise<
      { transactionHash: string } | undefined
    >;
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
