import { sendTransactionData } from "@developeruche/runtime-sdk/dist/utils/interfaces";
import { BigNumber, BigNumberish } from "ethers";
import { Dispatch, SetStateAction } from "react";

export interface MeProtocolProviderProps {
  children: React.ReactNode;
  email: string;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
}

export interface MeRegisterProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  brandName: string;
  onlinePresence: string;
}

export interface CreateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupply: string;
}

export interface DistributeRewardsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  email: string;
  reward_address: string;
  reward_recipient: Array<string>;
  reward_amounts: Array<BigNumber>;
}

export interface ChangeOptimalOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  rewardName: string;
  newOptimalValue: number;
}

export interface SetUpOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
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
export interface SetUpWalletProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  persistLogin?: boolean;
}

export interface ChangeMainAccountProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  newMainAcctAddress: string;
}

export interface ActivateOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  rewardAddress: string;
}
export interface IntegrateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  rewardAddress: string;
  descriptionLink: string;
  readTandC: boolean;
}
export interface TopUpOpenRewardLiquidityProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  address: string;
  meAmount: string;
  rewardAmount: string;
}

export interface SpendRewardOnIssuingBrandProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
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
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
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
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
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
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
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
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
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
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  rewardAddress: string;
  config: EditableConfigForTypeAOpenRewards;
  ignoreDefault: boolean;
}

export interface ResumeOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  rewardAddress: string;
}

export interface PauseOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
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
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  email: string;
  getOnlyId?: boolean;
}

export interface GetExpectedAmountOfTargetedRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
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
  meApiKey: string;
  reqURL: string;
  costPayerId?: string;
  spendInfo: SpendingInfo;
  email: string;
}
export type OmittedProps =
  | "setLoading"
  | "email"
  | "setError"
  | "meApiKey"
  | "reqURL"
  | "costPayerId";
export type TaskIdPromise = Promise<{ taskId: string } | undefined>;

export interface AllFnsProps {
  error: unknown;
  loading: boolean;
  updateGeneralConfig: ({
    generalConfig: { enableBountyRewards, enableCais, payIncomingGasFees, payOutgoingGasFees },
    ignoreDefault,
    brandId,
  }: Omit<UpdateGeneralConfigProps, OmittedProps>) => TaskIdPromise;
  updateBrandDetails: ({
    brandId,
    brandDetails: { name, onlinePresence },
    ignoreDefault,
  }: Omit<UpdateBrandDetailsProps, OmittedProps>) => TaskIdPromise;
  spendRewardOnIssuingBrand: ({
    spendAddress,
    spendAmount,
  }: Omit<SpendRewardOnIssuingBrandProps, OmittedProps>) => TaskIdPromise;
  getExpectedAmountOfTargetedReward: ({
    inputRewardAddress,
    outPutRewardAddress,
    amount,
    returnAsFormatted,
  }: Omit<GetExpectedAmountOfTargetedRewardProps, OmittedProps>) => Promise<
    BigNumberish | string | undefined
  >;
  swapWithDiffBrand: ({
    spendInfo: {
      rewardAtHand,
      targettedReward,
      amountOfRewardAtHand,
      expectedAmountOfTargetedReward,
    },
  }: Omit<SwapWithDiffBrandProps, OmittedProps>) => TaskIdPromise;
  changeOptimalOpenReward: ({
    rewardName,
    newOptimalValue,
  }: Omit<ChangeOptimalOpenRewardProps, OmittedProps>) => TaskIdPromise;
  integrateReward: ({
    descriptionLink,
    readTandC,
  }: Omit<IntegrateRewardProps, OmittedProps>) => TaskIdPromise;
  topUpOpenRewardLiquidity: ({
    rewardAmount,
    meAmount,
  }: Omit<TopUpOpenRewardLiquidityProps, OmittedProps>) => TaskIdPromise;
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
  }: Omit<UpdateRewardConfigProps, OmittedProps>) => TaskIdPromise;
  updateRewardDetails: ({
    rewardAddress,
    details: { name, symbol, descriptionLink },
    ignoreDefault,
    brandId,
  }: Omit<UpdateRewardDetailsProps, OmittedProps>) => TaskIdPromise;
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
  }: Omit<UpdateOpenRewardConfigProps, OmittedProps>) => TaskIdPromise;
  pauseOpenReward: ({ rewardAddress }: Omit<PauseOpenRewardProps, OmittedProps>) => TaskIdPromise;
  resumeOpenReward: ({ rewardAddress }: Omit<ResumeOpenRewardProps, OmittedProps>) => TaskIdPromise;
  activateOpenReward: ({
    rewardAddress,
  }: Omit<ActivateOpenRewardProps, OmittedProps>) => TaskIdPromise;
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
  }: Omit<SetUpOpenRewardProps, OmittedProps>) => TaskIdPromise;

  setUpWallet: ({
    persistLogin,
  }: Omit<SetUpWalletProps, OmittedProps>) => Promise<{ publicAddress: string } | undefined>;
  changeMainAccount: ({
    newMainAcctAddress,
  }: Omit<ChangeMainAccountProps, OmittedProps>) => TaskIdPromise;
  createReward: ({
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, OmittedProps>) => TaskIdPromise;
  getBrandDetails: ({
    getOnlyId,
  }: Omit<GetBrandDetailsProps, OmittedProps>) => Promise<
    { brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined
  >;
  meRegister: ({ brandName, onlinePresence }: Omit<MeRegisterProps, OmittedProps>) => TaskIdPromise;
  distributeRewards: ({
    reward_address,
    reward_recipient,
    reward_amounts,
  }: Omit<DistributeRewardsProps, OmittedProps>) => Promise<sendTransactionData | undefined>;
}
