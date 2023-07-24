
import { Dispatch, SetStateAction } from "react";

export interface MeProtocolProviderProps {
  children: React.ReactNode;
}

export interface MeRegisterProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  brandName: string;
  onlinePresence: string;
}

export interface CreateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupply: string;
}

export interface ChangeOptimalOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  name: string;
  newOptimal: number;
}

export interface SetUpOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  address: string;
}

export interface ChangeMainAccountProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  address: string;
}

export interface ActivateOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  address: string;
}

export interface ResumeOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  address: string;
}

export interface PauseOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  address: string;
}

export interface BrandDetailsProps {
  brandId: string;
  [0]: string;
  [1]: string;
  [2]: string;
  [3]: string;
  [4]: { _hex: string; isBigNumber: boolean };
  dateJoined: { _hex: string; isBigNumber: boolean };
  mainAccount: string;
  onlinePresence: string;
}

export interface GetBrandDetailsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  getOnlyId?: boolean;
}

export interface AllFnsProps {
  loading: boolean;
  changeOptimalOpenReward: ({
    magicEmail,
    name,
    newOptimal
  }: Omit<ChangeOptimalOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  pauseOpenReward: ({
    magicEmail,
    address,
  }: Omit<PauseOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  resumeOpenReward: ({
    magicEmail,
    address,
  }: Omit<ResumeOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  activateOpenReward: ({
    magicEmail,
    address,
  }: Omit<ActivateOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  setUpOpenReward: ({
    magicEmail,
    address,
  }: Omit<SetUpOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
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
}
