import React, { FC, createContext, useState } from "react";
import { meRegisterFN } from "../../module/meRegister";
import {
  MeRegisterProps,
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

export const MeProtocolContext = createContext<AllFnsProps | null>(null);

const MeProtocolProvider: FC<MeProtocolProviderProps> = ({
  children,
  email,
  meApiKey,
  reqURL,
  costPayerId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>([]);

  // ============================================= THIS IS THE REGISTER FUNCTION  ============================================================
  async function setUpWallet({ persistLogin }: Omit<SetUpWalletProps, OmittedProps>) {
    return await setUpWalletFN({
      email,
      setLoading,
      setError,
      persistLogin,
      meApiKey,
      reqURL,
      costPayerId,
    });
  }
  // ================================================================= THIS IS THE REGISTER FUNCTION  =================================================================
  async function meRegister({ brandName, onlinePresence }: Omit<MeRegisterProps, OmittedProps>) {
    return await meRegisterFN({
      email,
      brandName,
      onlinePresence,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      costPayerId,
    });
  }

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
      costPayerId,
    });
  }

  // =============================================================== THIS IS THE FUNCTION TO CREATE REWARD ===============================================================
  async function createReward({
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, OmittedProps>) {
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
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE MAIN ACCOUNT (BRAND ADDRESS) ==========================================================
  async function changeMainAccount({
    newMainAcctAddress,
  }: Omit<ChangeMainAccountProps, OmittedProps>) {
    return await changeMainAccountFN({
      email,
      newMainAcctAddress,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO ACTIVATE OPEN REWRAD ==========================================================
  async function activateOpenReward({
    rewardAddress,
  }: Omit<ActivateOpenRewardProps, OmittedProps>) {
    return await activateOpenRewardFN({
      email,
      rewardAddress,
      setLoading,
      setError,
      meApiKey,
      reqURL,
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
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE OPTIMAL OPEN REWRAD ==========================================================
  async function changeOptimalOpenReward({
    rewardName,
    newOptimalValue,
  }: Omit<ChangeOptimalOpenRewardProps, OmittedProps>) {
    return await changeOptimalOpenRewardFN({
      email,
      rewardName,
      newOptimalValue,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO INTEGRATE OPEN REWRAD ==========================================================
  async function integrateReward({
    rewardAddress,
    descriptionLink,
    readTandC,
  }: Omit<IntegrateRewardProps, OmittedProps>) {
    return await integrateRewardFN({
      email,
      rewardAddress,
      descriptionLink,
      readTandC,
      setLoading,
      setError,
      meApiKey,
      reqURL,
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO TOP UP OPEN REWRAD LIQUIDITY ==========================================================
  async function topUpOpenRewardLiquidity({
    address,
    rewardAmount,
    meAmount,
  }: Omit<TopUpOpenRewardLiquidityProps, OmittedProps>) {
    return await topUpOpenRewardLiquidityFN({
      email,
      address,
      rewardAmount,
      meAmount,
      setLoading,
      setError,
      meApiKey,
      reqURL,
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
      costPayerId,
    });
  }

  //------------------------------------------ Consumer function ------------------------------------------------------------

  // ========================================= THIS IS THE FUNCTION TO SPEND REWARD ON ISSUING BRAND  ==========================================================
  async function spendRewardOnIssuingBrand({
    spendAddress,
    spendAmount,
  }: Omit<SpendRewardOnIssuingBrandProps, OmittedProps>) {
    return await spendRewardOnIssuingBrandFN({
      email,
      spendAddress,
      spendAmount,
      setLoading,
      setError,
      meApiKey,
      reqURL,
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
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO UPDATE BRAND DETAILS ==========================================================

  async function updateBrandDetails({
    brandId,
    brandDetails: { name, onlinePresence },
    ignoreDefault,
  }: Omit<UpdateBrandDetailsProps, OmittedProps>) {
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
      costPayerId,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO swapWithDiffBrand ==========================================================
  async function swapWithDiffBrand({
    spendInfo: {
      rewardAtHand,
      targettedReward,
      amountOfRewardAtHand,
      expectedAmountOfTargetedReward,
    },
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
      costPayerId,
    });
  }

  return (
    <MeProtocolContext.Provider
      value={{
        error,
        meRegister,
        loading,
        getBrandDetails,
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
      }}
    >
      {children}
    </MeProtocolContext.Provider>
  );
};

export default MeProtocolProvider;
