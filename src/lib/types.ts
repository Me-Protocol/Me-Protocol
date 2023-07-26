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
    spendAddress,
    spendAmount,
  }: Omit<SpendRewardOnIssuingBrandProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  getExpectedAmountOfTargetedReward: ({
    inputRewardAddress,
    outPutRewardAddress,
    amount,
    returnAsFormatted,
  }: Omit<GetExpectedAmountOfTargetedRewardProps, "setLoading" | "brandEmail">) => Promise<
    BigNumberish | string | undefined
  >;
  swapWithDiffBrand: ({
    spendInfo: {
      rewardAtHand,
      targettedReward,
      amountOfRewardAtHand,
      expectedAmountOfTargetedReward,
    },
  }: Omit<SwapWithDiffBrandProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  changeOptimalOpenReward: ({
    rewardName,
    newOptimalValue,
  }: Omit<ChangeOptimalOpenRewardProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  integrateReward: ({
    descriptionLink,
    readTandC,
  }: Omit<IntegrateRewardProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  topUpOpenRewardLiquidity: ({
    rewardAmount,
    meAmount,
  }: Omit<TopUpOpenRewardLiquidityProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  updateRewardConfig: ({
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
  }: Omit<UpdateRewardConfigProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  updateRewardDetails: ({
    rewardAddress,
    details: { name, symbol, descriptionLink },
    ignoreDefault,
    brandId,
  }: Omit<UpdateRewardDetailsProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  updateOpenRewardConfig: ({
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
  }: Omit<UpdateOpenRewardConfigProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  pauseOpenReward: ({
    rewardAddress,
  }: Omit<PauseOpenRewardProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  resumeOpenReward: ({
    rewardAddress,
  }: Omit<ResumeOpenRewardProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  activateOpenReward: ({
    rewardAddress,
  }: Omit<ActivateOpenRewardProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  setUpOpenReward: ({
    rewardAddress,
  }: Omit<SetUpOpenRewardProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  changeMainAccount: ({
    newMainAcctAddress,
  }: Omit<ChangeMainAccountProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  createReward: ({
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, "setLoading" | "brandEmail">) => Promise<
    { taskId: string } | undefined
  >;
  getBrandDetails: ({
    getOnlyId,
  }: Omit<GetBrandDetailsProps, "setLoading" | "brandEmail">) => Promise<
    { brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined
  >;
  meRegister: ({
    brandName,
    onlinePresence,
  }: Omit<MeRegisterProps, "setLoading" | "brandEmail">) => Promise<{ taskId: string } | undefined>;
}
