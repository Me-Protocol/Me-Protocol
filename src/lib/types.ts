import { sendTransactionData } from "@developeruche/runtime-sdk/dist/utils/interfaces";
import { BigNumber, BigNumberish, Wallet } from "ethers";
import { Dispatch, SetStateAction } from "react";

export interface MeProtocolProviderProps {
  children: React.ReactNode;
  email: string;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
}

// export interface MeRegisterProps {
//   setLoading: Dispatch<SetStateAction<boolean>>;
//   setError: Dispatch<SetStateAction<unknown>>;
//   meApiKey: string;
//   reqURL: string; GELATO_API_KEY:string;
//   costPayerId?: string;
//   email: string;
//   brandName: string;
//   onlinePresence: string;
// }

export interface CreateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupply: string;
}

export interface OnBoardRewardsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  email: string;
  reward_address: string;
  brand_id: BigNumber;
  persist: boolean;
  RUNTIME_URL: string;
}

export interface DeployRewardAndPoolProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  brandId: string;
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupplyVault: number | BigNumber;
  totalSupplyTreasury: number | BigNumber;
  rOptimal: number | BigNumber;
  maximumRLimit: number | BigNumber;
  minimumRewardAmountForConversation: number | BigNumber;
  minimumMeAmountForConversation: number | BigNumber;
  notifyRewardAmount: number | BigNumber;
  notifyMeAmount: number | BigNumber;
  persist: boolean;
}

export interface AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  currentBrandId: string;
  reward: string;
  rewardAmount: string;
  meAmount: string;
  persist: boolean;
}

export interface DistributeRewardsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  email: string;
  reward_address: string;
  reward_recipient: Array<string>;
  reward_amounts: Array<BigNumber>;
  persist: boolean;
  RUNTIME_URL: string;
}

export interface spendRewardsOnIssuingBrandWithVaultPermitProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  setSpendLoading: Dispatch<SetStateAction<boolean>>;
  setSpendingSteps: Dispatch<SetStateAction<number>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  email: string;
  reward_amount: BigNumber;
  reward_address: string;
  rewardId: string;
  costPayerId?: string;
  RUNTIME_URL: string;
}

export interface ChangeOptimalOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  persist: boolean;
}
export interface GetWalletFromEmailProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  userEmail: string;
  persist: boolean;
}

export interface ChangeMainAccountProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  newMainAcctAddress: string;
}

export interface ActivateOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  rewardAddress: string;
}
export interface IntegrateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  rewardAddress: string;
}

export interface PauseOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  getOnlyId?: boolean;
}

export interface GetExpectedAmountOfTargetedRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
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
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  spendInfo: SpendingInfo;
  email: string;
}

export interface SpendRewardsOnAnotherBrandWithVaultPermitProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSpendLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  setSpendingSteps: Dispatch<SetStateAction<number>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  spendInfo: SpendingInfo;
  email: string;
  rewardId: string;
  RUNTIME_URL: string;
}

export interface AddRewardMagicProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSpendLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  setSpendingSteps: Dispatch<SetStateAction<number>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  brand_id: BigNumber;
  // reward_address: string;
  reward_manager: string;
  RUNTIME_URL: string;
  role_id: BigNumber;
  persist: boolean;
}

export interface RemoveRewardMagicProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSpendLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  setSpendingSteps: Dispatch<SetStateAction<number>>;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  brand_id: BigNumber;
  // reward_address: string;
  reward_manager: string;
  role_id: BigNumber;
  persist: boolean;
  RUNTIME_URL: string;
}

export type OmittedProps = "setLoading" | "setSpendLoading" | "setSpendingSteps" | "email" | "setError" | "meApiKey" | "reqURL" | "costPayerId";
export type TaskIdPromise = Promise<{ taskId: string } | undefined>;

export interface AllFnsProps {
  error: unknown;
  loading: boolean;
  spendLoading: boolean;
  spendingSteps: number;
  magic: any;
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
  spendRewardOnIssuingBrand: ({ spendAddress, spendAmount }: Omit<SpendRewardOnIssuingBrandProps, OmittedProps>) => TaskIdPromise;
  getExpectedAmountOfTargetedReward: ({
    inputRewardAddress,
    outPutRewardAddress,
    amount,
    returnAsFormatted,
  }: Omit<GetExpectedAmountOfTargetedRewardProps, OmittedProps>) => Promise<BigNumberish | string | undefined>;
  swapWithDiffBrand: ({
    spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
  }: Omit<SwapWithDiffBrandProps, OmittedProps>) => TaskIdPromise;
  spendRewardsOnAnotherBrandWithVaultPermit: ({
    spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
    rewardId,
    RUNTIME_URL,
  }: Omit<SpendRewardsOnAnotherBrandWithVaultPermitProps, OmittedProps>) => TaskIdPromise;
  addRewardManager: ({
    brand_id,
    // reward_address,
    reward_manager,
    role_id,
    persist,
    RUNTIME_URL,
  }: Omit<AddRewardMagicProps, OmittedProps>) => Promise<any>;
  removeRewardManager: ({
    brand_id,
    // reward_address,
    reward_manager,
    role_id,
    persist,
    RUNTIME_URL,
  }: Omit<RemoveRewardMagicProps, OmittedProps>) => Promise<any>;
  onBoardRewards: ({ brand_id, reward_address, persist, RUNTIME_URL }: Omit<OnBoardRewardsProps, OmittedProps>) => Promise<
    | sendTransactionData
    | {
        taskId: string;
      }
  >;
  changeOptimalOpenReward: ({ rewardName, newOptimalValue }: Omit<ChangeOptimalOpenRewardProps, OmittedProps>) => TaskIdPromise;
  integrateReward: ({ descriptionLink, readTandC }: Omit<IntegrateRewardProps, OmittedProps>) => TaskIdPromise;
  topUpOpenRewardLiquidity: ({ rewardAmount, meAmount }: Omit<TopUpOpenRewardLiquidityProps, OmittedProps>) => TaskIdPromise;
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
  createMoreRewardToTreasury: ({ rewardAddress }: Omit<PauseOpenRewardProps & { amount: string }, OmittedProps>) => TaskIdPromise;
  changeROptimal: ({ rewardAddress }: Omit<PauseOpenRewardProps & { newROptimal: BigNumber }, OmittedProps>) => TaskIdPromise;
  resumeOpenReward: ({ rewardAddress }: Omit<ResumeOpenRewardProps, OmittedProps>) => TaskIdPromise;
  activateOpenReward: ({ rewardAddress }: Omit<ActivateOpenRewardProps, OmittedProps>) => TaskIdPromise;
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

  setUpWallet: ({ persist }: Omit<SetUpWalletProps, OmittedProps>) => Promise<{ publicAddress: string } | undefined>;
  getWalletFromEmail: ({ persist }: Omit<GetWalletFromEmailProps, OmittedProps>) => Promise<{ publicAddress: string } | undefined>;
  changeMainAccount: ({ newMainAcctAddress }: Omit<ChangeMainAccountProps, OmittedProps>) => TaskIdPromise;
  createReward: ({ name, symbol, descriptionLink, totalSupply }: Omit<CreateRewardProps, OmittedProps>) => TaskIdPromise;
  deployRewardAndPool: ({
    name,
    symbol,
    descriptionLink,
    totalSupplyVault,
    totalSupplyTreasury,
    brandId,
    rOptimal,
    maximumRLimit,
    minimumRewardAmountForConversation,
    minimumMeAmountForConversation,
    notifyRewardAmount,
    notifyMeAmount,
    persist,
  }: Omit<DeployRewardAndPoolProps, OmittedProps>) => TaskIdPromise;
  addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool: ({
    meAmount,
    reward,
    rewardAmount,
    currentBrandId,
    persist,
  }: Omit<AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps, OmittedProps>) => TaskIdPromise;
  getBrandDetails: ({
    getOnlyId,
  }: Omit<GetBrandDetailsProps, OmittedProps>) => Promise<{ brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined>;
  // meRegister: ({ brandName, onlinePresence }: Omit<MeRegisterProps, OmittedProps>) => TaskIdPromise;
  distributeRewards: ({
    reward_address,
    reward_recipient,
    reward_amounts,
    RUNTIME_URL,
    persist,
  }: Omit<DistributeRewardsProps, OmittedProps>) => Promise<sendTransactionData | undefined>;

  spendRewardsOnIssuingBrandWithVaultPermit: ({
    reward_address,
    reward_amount,
    rewardId,
    RUNTIME_URL,
  }: Omit<spendRewardsOnIssuingBrandWithVaultPermitProps, OmittedProps>) => TaskIdPromise;
  logOut: (clearCache?: boolean) => Promise<any>;
}
