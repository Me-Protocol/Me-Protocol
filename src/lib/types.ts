
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
  rewardName: string;
  newOptimalValue: number;
}

export interface SetUpOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  rewardAddress: string;
}

export interface ChangeMainAccountProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  newMainAcctAddress: string;
}

export interface ActivateOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  rewardAddress: string;
}
export interface IntegrateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  rewardAddress: string;
  descriptionLink: string;
  readTandC: boolean;
}
export interface TopUpOpenRewardLiquidityProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  address: string;
  meAmount: string;
  rewardAmount: string;
}

export interface SpendRewardOnIssuingBrandProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  spendAddress: string;
  spendAmount: string;
}

export interface EditableRewardConfig {
  specificException: boolean;
  bountyEnables: boolean;
  caiEnabled: boolean;
  bountyTriggerLimit: number;
  bountyContributionInPrecision: number;
  payIncomingGasFee: boolean;
  payOutgoingGasFee: boolean;
}

export interface UpdateRewardConfigProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  address: string;
  brandId: string;
  ignoreDefault: boolean;
  rewardConfig: EditableRewardConfig;
}

export interface ResumeOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  rewardAddress: string;
}

export interface PauseOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  magicEmail: string;
  rewardAddress: string;
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
  spendRewardonIssuingBrand: ({
    magicEmail,
    spendAddress,
    spendAmount,
  }: Omit<SpendRewardOnIssuingBrandProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  changeOptimalOpenReward: ({
    magicEmail,
    rewardName,
    newOptimalValue,
  }: Omit<ChangeOptimalOpenRewardProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  integrateReward: ({
    magicEmail,
    descriptionLink,
    readTandC,
  }: Omit<IntegrateRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  topUpOpenRewardLiquidity: ({
    magicEmail,
    rewardAmount,
    meAmount,
  }: Omit<TopUpOpenRewardLiquidityProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  updateRewardConfig: ({
    magicEmail,
    rewardConfig: {
      specificException,
      bountyEnables,
      caiEnabled,
      bountyTriggerLimit,
      bountyContributionInPrecision,
      payIncomingGasFee,
      payOutgoingGasFee,
    },
    ignoreDefault,
    brandId,
  }: Omit<UpdateRewardConfigProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  pauseOpenReward: ({
    magicEmail,
    rewardAddress,
  }: Omit<PauseOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  resumeOpenReward: ({
    magicEmail,
    rewardAddress,
  }: Omit<ResumeOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  activateOpenReward: ({
    magicEmail,
    rewardAddress,
  }: Omit<ActivateOpenRewardProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  setUpOpenReward: ({
    magicEmail,
    rewardAddress,
  }: Omit<SetUpOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  changeMainAccount: ({
    magicEmail,
    newMainAcctAddress,
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
