import { BigNumber, BigNumberish } from "ethers";
import { Dispatch, SetStateAction } from "react";

export interface MeProtocolProviderProps {
  children: React.ReactNode;
  brandEmail: string;
}

export interface MeRegisterProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  brandName: string;
  onlinePresence: string;
}

export interface CreateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupply: string;
}

export interface ChangeOptimalOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  rewardName: string;
  newOptimalValue: number;
}

export interface SetUpOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  rewardAddress: string;
}

export interface ChangeMainAccountProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  newMainAcctAddress: string;
}

export interface ActivateOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  rewardAddress: string;
}
export interface IntegrateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  rewardAddress: string;
  descriptionLink: string;
  readTandC: boolean;
}
export interface TopUpOpenRewardLiquidityProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  address: string;
  meAmount: string;
  rewardAmount: string;
}

export interface SpendRewardOnIssuingBrandProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
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
  brandEmail: string;
  address: string;
  brandId: string;
  ignoreDefault: boolean;
  rewardConfig: EditableRewardConfig;
}

export interface EditableRewardDetails {
  name: string;
  symbol: string;
  descriptionLink: string;
}
export interface UpdateRewardDetailsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  rewardAddress: string;
  brandId: string;
  details: EditableRewardDetails;
  ignoreDefault: boolean;
}

export interface EditableConfigForTypeAOpenRewards {
  maximumRLimit: number;
  minimumRewardAmountForConversation: string;
  minimumMeAmountForConversation: string;
  notifyRewardAmount: number;
  notifyMeAmount: number;
  defaultSlippageInPrecision: number;
  allowSwaps: boolean;
}
export interface UpdateOpenRewardConfigProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  rewardAddress: string;
  config: EditableConfigForTypeAOpenRewards;
  ignoreDefault: boolean;
}

export interface ResumeOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
  rewardAddress: string;
}

export interface PauseOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  brandEmail: string;
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
  brandEmail: string;
  getOnlyId?: boolean;
}

export interface GetExpectedAmountOfTargetedRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  inputRewardAddress: string;
  outPutRewardAddress: string;
  amount: string;
  returnAsFormatted?: boolean;
}

export interface SpendingInfo {
  rewardAtHand: string;
  targettedReward: string;
  amountOfRewardAtHand: number | BigNumber;
  expectedAmountOfTargetedReward: number | BigNumber;
}

export interface SwapWithDiffBrandProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  spendInfo: SpendingInfo;
  brandEmail: string;
}

export interface AllFnsProps {
  loading: boolean;
  spendRewardOnIssuingBrand: ({
    brandEmail,
    spendAddress,
    spendAmount,
  }: Omit<SpendRewardOnIssuingBrandProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  getExpectedAmountOfTargetedReward: ({
    inputRewardAddress,
    outPutRewardAddress,
    amount,
    returnAsFormatted,
  }: Omit<GetExpectedAmountOfTargetedRewardProps, "setLoading">) => Promise<
    BigNumberish | string | undefined
  >;
  swapWithDiffBrand: ({
    brandEmail,
    spendInfo: {
      rewardAtHand,
      targettedReward,
      amountOfRewardAtHand,
      expectedAmountOfTargetedReward,
    },
  }: Omit<SwapWithDiffBrandProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  changeOptimalOpenReward: ({
    brandEmail,
    rewardName,
    newOptimalValue,
  }: Omit<ChangeOptimalOpenRewardProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  integrateReward: ({
    brandEmail,
    descriptionLink,
    readTandC,
  }: Omit<IntegrateRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  topUpOpenRewardLiquidity: ({
    brandEmail,
    rewardAmount,
    meAmount,
  }: Omit<TopUpOpenRewardLiquidityProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  updateRewardConfig: ({
    brandEmail,
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
  updateRewardDetails: ({
    brandEmail,
    rewardAddress,
    details: { name, symbol, descriptionLink },
    ignoreDefault,
    brandId,
  }: Omit<UpdateRewardDetailsProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  updateOpenRewardConfig: ({
    brandEmail,
    rewardAddress,
    config: {
      maximumRLimit,
      minimumRewardAmountForConversation,
      minimumMeAmountForConversation,
      notifyRewardAmount,
      notifyMeAmount,
      defaultSlippageInPrecision,
      allowSwaps,
    },
    ignoreDefault,
  }: Omit<UpdateOpenRewardConfigProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  pauseOpenReward: ({
    brandEmail,
    rewardAddress,
  }: Omit<PauseOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  resumeOpenReward: ({
    brandEmail,
    rewardAddress,
  }: Omit<ResumeOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  activateOpenReward: ({
    brandEmail,
    rewardAddress,
  }: Omit<ActivateOpenRewardProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  setUpOpenReward: ({
    brandEmail,
    rewardAddress,
  }: Omit<SetUpOpenRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  changeMainAccount: ({
    brandEmail,
    newMainAcctAddress,
  }: Omit<ChangeMainAccountProps, "setLoading">) => Promise<
    { transactionHash: string } | undefined
  >;
  createReward: ({
    brandEmail,
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  getBrandDetails: ({
    brandEmail,
    getOnlyId,
  }: Omit<GetBrandDetailsProps, "setLoading">) => Promise<
    { brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined
  >;
  meRegister: ({
    brandEmail,
    brandName,
    onlinePresence,
  }: Omit<MeRegisterProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
}
