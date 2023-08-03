import { BigNumber, BigNumberish } from "ethers";
import { Dispatch, SetStateAction } from "react";

export interface MeProtocolProviderProps {
  children: React.ReactNode;
  brandEmail: string;
  meApiKey: string;
}

export interface MeRegisterProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  brandName: string;
  onlinePresence: string;
}

export interface CreateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupply: string;
}

export interface ChangeOptimalOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  rewardName: string;
  newOptimalValue: number;
}

export interface SetUpOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  rewardAddress: string;
  rOptimal: number;
  maximumRLimit: number;
  minimumRewardAmountForConversation: number;
  minimumMeAmountForConversation: number;
  notifyRewardAmount: number;
  notifyMeAmount: number;
  defaultSlippageInPrecision: number;
  allowSwaps: boolean;
}

export interface ChangeMainAccountProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  newMainAcctAddress: string;
}

export interface ActivateOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  rewardAddress: string;
}
export interface IntegrateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  rewardAddress: string;
  descriptionLink: string;
  readTandC: boolean;
}
export interface TopUpOpenRewardLiquidityProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  address: string;
  meAmount: string;
  rewardAmount: string;
}

export interface SpendRewardOnIssuingBrandProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
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
  setError: Dispatch<SetStateAction<unknown>>;
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
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  rewardAddress: string;
  brandId: string;
  details: EditableRewardDetails;
  ignoreDefault: boolean;
}

export interface EditableBrandDetails {
  name: string;
  onlinePresence: string;
}

export interface UpdateBrandDetailsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  brandId: string;
  brandDetails: EditableBrandDetails;
  ignoreDefault: boolean;
}

export interface EditableBrandConfig {
  enableBountyRewards: boolean;
  enableCais: boolean;
  payIncomingGasFees: boolean;
  payOutgoingGasFees: boolean;
}

export interface UpdateGeneralConfigProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  brandId: string;
  generalConfig: EditableBrandConfig;
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
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  rewardAddress: string;
  config: EditableConfigForTypeAOpenRewards;
  ignoreDefault: boolean;
}

export interface ResumeOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  rewardAddress: string;
}

export interface PauseOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
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
  setError: Dispatch<SetStateAction<unknown>>;
  brandEmail: string;
  getOnlyId?: boolean;
}

export interface GetExpectedAmountOfTargetedRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
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
  setError: Dispatch<SetStateAction<unknown>>;
  spendInfo: SpendingInfo;
  brandEmail: string;
}

export interface AllFnsProps {
  error: unknown;
  loading: boolean;
  updateGeneralConfig: ({
    generalConfig: { enableBountyRewards, enableCais, payIncomingGasFees, payOutgoingGasFees },
    ignoreDefault,
    brandId,
  }: Omit<UpdateGeneralConfigProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  updateBrandDetails: ({
    brandId,
    brandDetails: { name, onlinePresence },
    ignoreDefault,
  }: Omit<UpdateBrandDetailsProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  spendRewardOnIssuingBrand: ({
    spendAddress,
    spendAmount,
  }: Omit<SpendRewardOnIssuingBrandProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  getExpectedAmountOfTargetedReward: ({
    inputRewardAddress,
    outPutRewardAddress,
    amount,
    returnAsFormatted,
  }: Omit<
    GetExpectedAmountOfTargetedRewardProps,
    "setLoading" | "brandEmail" | "setError"
  >) => Promise<BigNumberish | string | undefined>;
  swapWithDiffBrand: ({
    spendInfo: {
      rewardAtHand,
      targettedReward,
      amountOfRewardAtHand,
      expectedAmountOfTargetedReward,
    },
  }: Omit<SwapWithDiffBrandProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  changeOptimalOpenReward: ({
    rewardName,
    newOptimalValue,
  }: Omit<ChangeOptimalOpenRewardProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  integrateReward: ({
    descriptionLink,
    readTandC,
  }: Omit<IntegrateRewardProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  topUpOpenRewardLiquidity: ({
    rewardAmount,
    meAmount,
  }: Omit<TopUpOpenRewardLiquidityProps, "setLoading" | "brandEmail" | "setError">) => Promise<
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
  }: Omit<UpdateRewardConfigProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  updateRewardDetails: ({
    rewardAddress,
    details: { name, symbol, descriptionLink },
    ignoreDefault,
    brandId,
  }: Omit<UpdateRewardDetailsProps, "setLoading" | "brandEmail" | "setError">) => Promise<
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
  }: Omit<UpdateOpenRewardConfigProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  pauseOpenReward: ({
    rewardAddress,
  }: Omit<PauseOpenRewardProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  resumeOpenReward: ({
    rewardAddress,
  }: Omit<ResumeOpenRewardProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  activateOpenReward: ({
    rewardAddress,
  }: Omit<ActivateOpenRewardProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  setUpOpenReward: ({
    rewardAddress,
    rOptimal,
    maximumRLimit,
    minimumRewardAmountForConversation,
    minimumMeAmountForConversation,
    notifyRewardAmount,
    notifyMeAmount,
    defaultSlippageInPrecision,
    allowSwaps,
  }: Omit<SetUpOpenRewardProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  changeMainAccount: ({
    newMainAcctAddress,
  }: Omit<ChangeMainAccountProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  createReward: ({
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
  getBrandDetails: ({
    getOnlyId,
  }: Omit<GetBrandDetailsProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined
  >;
  meRegister: ({
    brandName,
    onlinePresence,
  }: Omit<MeRegisterProps, "setLoading" | "brandEmail" | "setError">) => Promise<
    { taskId: string } | undefined
  >;
}
