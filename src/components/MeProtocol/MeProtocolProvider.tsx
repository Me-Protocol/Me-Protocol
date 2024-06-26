import React, { FC, createContext, useState } from "react";
import {
  // MeRegisterProps,
  MeProtocolProviderProps,
  BrandDetailsProps,
  CreateRewardProps,
  SetUpOpenRewardProps,
  ChangeMainAccountProps,
  AllFnsProps,
  ActivateOpenRewardProps,
  ResumeOpenRewardProps,
  PauseOpenRewardProps,
  ChangeOptimalOpenRewardProps,
  IntegrateRewardProps,
  TopUpOpenRewardLiquidityProps,
  UpdateRewardConfigProps,
  SpendRewardOnIssuingBrandProps,
  UpdateOpenRewardConfigProps,
  UpdateRewardDetailsProps,
  GetExpectedAmountOfTargetedRewardProps,
  SwapWithDiffBrandProps,
  UpdateBrandDetailsProps,
  UpdateGeneralConfigProps,
  SetUpWalletProps,
  OmittedProps,
  DistributeRewardsProps,
  spendRewardsOnIssuingBrandWithVaultPermitProps,
  SpendRewardsOnAnotherBrandWithVaultPermitProps,
  AddRewardMagicProps,
  DeployRewardAndPoolProps,
  AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps,
  OnBoardRewardsProps,
  GetWalletFromEmailProps,
} from "../../lib/types";
import { getBrandDetailsFN } from "../../module/getBrandDetails";
import { createRewardFN } from "../../module/createReward";
import { setUpOpenRewardFN } from "../../module/setUpOpenReward";
import { changeMainAccountFN } from "../../module/changeMainAccount";
import { activateOpenRewardFN } from "../../module/activateOpenReward";
import { resumeOpenRewardFN } from "../../module/resumeOpenReward";
import { pauseOpenRewardFN } from "../../module/pauseOpenReward";
import { changeOptimalOpenRewardFN } from "../../module/changeOptimalOpenReward";
import { integrateRewardFN } from "../../module/integrateReward";
import { topUpOpenRewardLiquidityFN } from "../../module/topUpOpenRewardLiquidity";
import { updateRewardConfigFN } from "../../module/updateRewardConfig";
import { spendRewardOnIssuingBrandFN } from "../../module/spendRewardOnIssuingBrand";
import { updateOpenRewardConfigFN } from "../../module/updateOpenRewardConfig";
import { updateRewardDetailsFN } from "../../module/updateRewardDetails";
import { getExpectedAmountOfTargetedRewardFN } from "../../module/getExpectedAmountOfTargetedReward";
import { swapWithDiffBrandFN } from "../../module/swapWithDiffBrand";
import { updateBrandDetailsFN } from "../../module/updateBrandDetails";
import { updateGeneralConfigFN } from "../../module/updateGeneralConfig";
import { setUpWalletFN } from "../../module/setUpWallet";
import { distributeRewardsFN } from "../../module/distributeRewards";
import { spendRewardsOnIssuingBrandWithVaultPermitFN } from "../../module/spendRewardsOnIssuingBrandWithVaultPermit";
import { spendRewardsOnAnotherBrandWithVaultPermitFN } from "../../module/spendRewardsOnAnotherBrandWithVaultPermit";
import { logOutFn } from "../../module/logOut";
import { addRewardManagerFN } from "../../module/addRewardManager";
import { removeRewardManagerFN } from "../../module/removeRewardManager";
import { deployRewardAndPoolFN } from "../../module/deployRewardAndPool";
import { addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolFN } from "../../module/addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool";
import { onBoardRewardsFN } from "../../module/onboardReward";
import { createMoreRewardToTreasuryFN } from "../../module/createMoreRewardToTreasury";
import { changeROptimalFN } from "../../module/changeROptimal";
import { BigNumber } from "ethers";
import { getWalletFromEmailFN } from "../../module/getWalletFromEmail";
import { magic } from "../../lib/magic";
import { createMoreRewardsToVaultFN } from "../../module/createMoreRewardToVault";

export const MeProtocolContext = createContext<AllFnsProps | null>(null);

const MeProtocolProvider: FC<MeProtocolProviderProps> = ({ children, email, meApiKey, reqURL, costPayerId, GELATO_API_KEY, debug }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [spendLoading, setSpendLoading] = useState<boolean>(false);
  const [spendingSteps, setSpendingSteps] = useState<number>(0);
  const [error, setError] = useState<unknown>([]);

  // ============================================= THIS IS THE REGISTER FUNCTION  ============================================================
  async function setUpWallet({ persist }: Omit<SetUpWalletProps, OmittedProps>) {
    return await setUpWalletFN({
      email,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
      persist,
    });
  }
  async function getWalletFromEmail({ userEmail, persist }: Omit<GetWalletFromEmailProps, OmittedProps>) {
    return await getWalletFromEmailFN({
      userEmail,
      setLoading,
      setError,
      persist,
    });
  }
  // ================================================================= THIS IS THE REGISTER FUNCTION  =================================================================
  // async function meRegister({ brandName, onlinePresence }: Omit<MeRegisterProps, OmittedProps>) {
  //   return await meRegisterFN({
  //     email,
  //     brandName,
  //     onlinePresence,
  //     setLoading,
  //     setError,
  //     meApiKey,
  //     reqURL,GELATO_API_KEY,
  //     costPayerId,
  //   });
  // }

  // ================================================================= THIS IS THE FUNCTION TO QUERY BRAND ID ===============================================================
  async function getBrandDetails({
    getOnlyId = false,
  }: {
    getOnlyId?: boolean;
  }): Promise<{ brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined> {
    return await getBrandDetailsFN({
      email,
      setLoading,
      setError,
      getOnlyId,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // =============================================================== THIS IS THE FUNCTION TO CREATE REWARD ===============================================================
  async function createReward({ name, symbol, descriptionLink, totalSupply }: Omit<CreateRewardProps, OmittedProps>) {
    return await createRewardFN({
      email,
      name,
      symbol,
      descriptionLink,
      totalSupply,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // =============================================================== THIS IS THE FUNCTION TO SETUP OPENREWARDS ===============================================================
  async function setUpOpenReward({
    rewardAddress,
    allowSwaps,
    defaultSlippageInPrecision,
    maximumRLimit,
    minimumMeAmountForConversation,
    minimumRewardAmountForConversation,
    notifyMeAmount,
    notifyRewardAmount,
    rOptimal,
  }: Omit<SetUpOpenRewardProps, OmittedProps>) {
    return await setUpOpenRewardFN({
      email,
      rewardAddress,
      setLoading,
      setError,
      allowSwaps,
      defaultSlippageInPrecision,
      maximumRLimit,
      minimumMeAmountForConversation,
      minimumRewardAmountForConversation,
      notifyMeAmount,
      notifyRewardAmount,
      rOptimal,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE MAIN ACCOUNT (BRAND ADDRESS) ==========================================================
  async function changeMainAccount({ newMainAcctAddress }: Omit<ChangeMainAccountProps, OmittedProps>) {
    return await changeMainAccountFN({
      email,
      newMainAcctAddress,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO ACTIVATE OPEN REWRAD ==========================================================
  async function activateOpenReward({ rewardAddress }: Omit<ActivateOpenRewardProps, OmittedProps>) {
    return await activateOpenRewardFN({
      email,
      rewardAddress,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO RESUME OPEN REWRAD ==========================================================
  async function resumeOpenReward({ rewardAddress }: Omit<ResumeOpenRewardProps, OmittedProps>) {
    return await resumeOpenRewardFN({
      email,
      rewardAddress,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO PAUSE OPEN REWRAD ==========================================================
  async function pauseOpenReward({ rewardAddress }: Omit<PauseOpenRewardProps, OmittedProps>) {
    return await pauseOpenRewardFN({
      email,
      rewardAddress,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE OPTIMAL OPEN REWRAD ==========================================================
  async function changeOptimalOpenReward({ rewardName, newOptimalValue }: Omit<ChangeOptimalOpenRewardProps, OmittedProps>) {
    return await changeOptimalOpenRewardFN({
      email,
      rewardName,
      newOptimalValue,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO INTEGRATE OPEN REWRAD ==========================================================
  async function integrateReward({ rewardAddress, descriptionLink, readTandC }: Omit<IntegrateRewardProps, OmittedProps>) {
    return await integrateRewardFN({
      email,
      rewardAddress,
      descriptionLink,
      readTandC,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO TOP UP OPEN REWRAD LIQUIDITY ==========================================================
  async function topUpOpenRewardLiquidity({ address, rewardAmount, meAmount }: Omit<TopUpOpenRewardLiquidityProps, OmittedProps>) {
    return await topUpOpenRewardLiquidityFN({
      email,
      address,
      rewardAmount,
      meAmount,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO UPDATE REWARD CONFIG REWRAD ==========================================================
  async function updateRewardConfig({
    address,
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
  }: Omit<UpdateRewardConfigProps, OmittedProps>) {
    return await updateRewardConfigFN({
      email,
      address,
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
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  //------------------------------------------ Consumer function ------------------------------------------------------------

  // ========================================= THIS IS THE FUNCTION TO SPEND REWARD ON ISSUING BRAND  ==========================================================
  async function spendRewardOnIssuingBrand({ spendAddress, spendAmount }: Omit<SpendRewardOnIssuingBrandProps, OmittedProps>) {
    return await spendRewardOnIssuingBrandFN({
      email,
      spendAddress,
      spendAmount,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION UPDATE OPENREWARD CONFIG ==========================================================
  async function updateOpenRewardConfig({
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
  }: Omit<UpdateOpenRewardConfigProps, OmittedProps>) {
    return await updateOpenRewardConfigFN({
      email,
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
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO UPDATE REWARD DETAILS ==========================================================
  async function updateRewardDetails({
    rewardAddress,
    details: { name, symbol, descriptionLink },
    brandId,
    ignoreDefault,
  }: Omit<UpdateRewardDetailsProps, OmittedProps>) {
    return await updateRewardDetailsFN({
      email,
      rewardAddress,
      details: {
        name,
        symbol,
        descriptionLink,
      },
      brandId,
      ignoreDefault,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO UPDATE BRAND DETAILS ==========================================================

  async function updateBrandDetails({ brandId, brandDetails: { name, onlinePresence }, ignoreDefault }: Omit<UpdateBrandDetailsProps, OmittedProps>) {
    return await updateBrandDetailsFN({
      email,
      brandId,
      brandDetails: {
        name,
        onlinePresence,
      },
      ignoreDefault,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO UPDATE GENERAL CONFIG ==========================================================
  async function updateGeneralConfig({
    brandId,
    generalConfig: { enableBountyRewards, enableCais, payIncomingGasFees, payOutgoingGasFees },
    ignoreDefault,
  }: Omit<UpdateGeneralConfigProps, OmittedProps>) {
    return await updateGeneralConfigFN({
      email,
      brandId,
      generalConfig: {
        enableBountyRewards,
        enableCais,
        payIncomingGasFees,
        payOutgoingGasFees,
      },
      ignoreDefault,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO getExpectedAmountOfTargetedReward ==========================================================
  async function getExpectedAmountOfTargetedReward({
    inputRewardAddress,
    outPutRewardAddress,
    amount,
    returnAsFormatted,
  }: Omit<GetExpectedAmountOfTargetedRewardProps, OmittedProps>) {
    return await getExpectedAmountOfTargetedRewardFN({
      inputRewardAddress,
      outPutRewardAddress,
      amount,
      setLoading,
      setError,
      returnAsFormatted,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO swapWithDiffBrand ==========================================================
  async function swapWithDiffBrand({
    spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
  }: Omit<SwapWithDiffBrandProps, OmittedProps>) {
    return await swapWithDiffBrandFN({
      email,
      setLoading,
      setError,
      spendInfo: {
        rewardAtHand,
        targettedReward,
        amountOfRewardAtHand,
        expectedAmountOfTargetedReward,
      },
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
    });
  }

  async function distributeRewards({
    reward_address,
    reward_amounts,
    reward_recipient,
    persist,
    RUNTIME_URL,
  }: Omit<DistributeRewardsProps, OmittedProps>) {
    return await distributeRewardsFN({
      email,
      reward_address,
      reward_amounts,
      reward_recipient,
      setError,
      setLoading,
      persist,
      RUNTIME_URL,
    });
  }
  async function spendRewardsOnIssuingBrandWithVaultPermit({
    reward_address,
    rewardId,
    reward_amount,
    RUNTIME_URL,
    orderId,
  }: Omit<spendRewardsOnIssuingBrandWithVaultPermitProps, OmittedProps>) {
    return await spendRewardsOnIssuingBrandWithVaultPermitFN({
      email,
      reward_address,
      rewardId,
      reward_amount,
      setError,
      setLoading,
      setSpendLoading,
      setSpendingSteps,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
      RUNTIME_URL,
      orderId,
    });
  }

  async function spendRewardsOnAnotherBrandWithVaultPermit({
    rewardId,
    spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
    orderId,
    RUNTIME_URL,
  }: Omit<SpendRewardsOnAnotherBrandWithVaultPermitProps, OmittedProps>) {
    return await spendRewardsOnAnotherBrandWithVaultPermitFN({
      email,
      spendInfo: {
        rewardAtHand,
        targettedReward,
        amountOfRewardAtHand,
        expectedAmountOfTargetedReward,
      },
      rewardId,
      setError,
      setSpendLoading,
      setSpendingSteps,
      setLoading,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
      RUNTIME_URL,
      orderId,
    });
  }

  async function addRewardManager({
    brand_id,
    // reward_address,
    reward_manager,
    role_id,
    persist,
    RUNTIME_URL,
  }: Omit<AddRewardMagicProps, OmittedProps>) {
    return await addRewardManagerFN({
      email,
      setError,
      setSpendLoading,
      setSpendingSteps,
      setLoading,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      brand_id,
      // reward_address,
      reward_manager,
      role_id,
      costPayerId,
      persist,
      RUNTIME_URL,
    });
  }
  async function removeRewardManager({
    brand_id,
    // reward_address,
    reward_manager,
    role_id,
    persist,
    RUNTIME_URL,
  }: Omit<AddRewardMagicProps, OmittedProps>) {
    return await removeRewardManagerFN({
      email,
      setError,
      setSpendLoading,
      setSpendingSteps,
      setLoading,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      brand_id,
      // reward_address,
      reward_manager,
      role_id,
      costPayerId,
      persist,
      RUNTIME_URL,
    });
  }
  async function onBoardRewards({ brand_id, reward_address, persist, RUNTIME_URL }: Omit<OnBoardRewardsProps, OmittedProps>) {
    return await onBoardRewardsFN({
      email,
      setError,
      setLoading,
      brand_id,
      reward_address,
      persist,
      RUNTIME_URL,
    });
  }
  async function deployRewardAndPool({
    brandId,
    descriptionLink,
    name,
    symbol,
    totalSupplyVault,
    totalSupplyTreasury,
    rOptimal,
    maximumRLimit,
    minimumRewardAmountForConversation,
    minimumMeAmountForConversation,
    notifyRewardAmount,
    notifyMeAmount,
    persist,
  }: Omit<DeployRewardAndPoolProps, OmittedProps>) {
    return await deployRewardAndPoolFN({
      email,
      setError,
      setLoading,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      brandId,
      descriptionLink,
      name,
      symbol,
      totalSupplyVault,
      totalSupplyTreasury,
      costPayerId,
      rOptimal,
      maximumRLimit,
      minimumRewardAmountForConversation,
      minimumMeAmountForConversation,
      notifyRewardAmount,
      notifyMeAmount,
      persist,
    });
  }
  async function addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool({
    meAmount,
    reward,
    rewardAmount,
    currentBrandId,
    persist,
  }: Omit<AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps, OmittedProps>) {
    return await addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolFN({
      email,
      setError,
      setLoading,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
      meAmount,
      reward,
      rewardAmount,
      currentBrandId,
      persist,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO UpDaTE OPEN REWRAD ==========================================================
  async function createMoreRewardToTreasury({ rewardAddress, amount }: Omit<PauseOpenRewardProps & { amount: string }, OmittedProps>) {
    return await createMoreRewardToTreasuryFN({
      email,
      rewardAddress,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
      amount,
    });
  }
  async function createMoreRewardToVault({ rewardAddress, amount }: Omit<PauseOpenRewardProps & { amount: string }, OmittedProps>) {
    return await createMoreRewardsToVaultFN({
      email,
      rewardAddress,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
      amount,
    });
  }
  async function changeROptimal({ rewardAddress, newROptimal }: Omit<PauseOpenRewardProps & { newROptimal: BigNumber }, OmittedProps>) {
    return await changeROptimalFN({
      email,
      rewardAddress,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      GELATO_API_KEY,
      debug,
      costPayerId,
      newROptimal,
    });
  }
  async function logOut(clearCache = true) {
    return await logOutFn(clearCache);
  }
  // function magicInfo() {
  //   return magic;
  // }

  return (
    <MeProtocolContext.Provider
      value={{
        error,
        loading,
        spendLoading,
        spendingSteps,
        // meRegister,
        getBrandDetails,
        getWalletFromEmail,
        createReward,
        setUpOpenReward,
        changeMainAccount,
        activateOpenReward,
        resumeOpenReward,
        pauseOpenReward,
        changeOptimalOpenReward,
        integrateReward,
        topUpOpenRewardLiquidity,
        updateRewardConfig,
        spendRewardOnIssuingBrand,
        updateOpenRewardConfig,
        updateRewardDetails,
        getExpectedAmountOfTargetedReward,
        swapWithDiffBrand,
        updateBrandDetails,
        updateGeneralConfig,
        setUpWallet,
        distributeRewards,
        spendRewardsOnIssuingBrandWithVaultPermit,
        spendRewardsOnAnotherBrandWithVaultPermit,
        addRewardManager,
        removeRewardManager,
        deployRewardAndPool,
        addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool,
        onBoardRewards,
        createMoreRewardToTreasury,
        createMoreRewardToVault,
        changeROptimal,
        logOut,
        magic,
      }}
    >
      {children}
    </MeProtocolContext.Provider>
  );
};

export default MeProtocolProvider;
