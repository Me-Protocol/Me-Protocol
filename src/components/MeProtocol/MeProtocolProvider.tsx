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

export const MeProtocolContext = createContext<AllFnsProps | null>(null);

const MeProtocolProvider: FC<MeProtocolProviderProps> = ({ children, brandEmail }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>([]);

  // ================================================================= THIS IS THE REGISTER FUNCTION  =================================================================
  async function meRegister({
    brandName,
    onlinePresence,
  }: Omit<MeRegisterProps, "setLoading" | "brandEmail" | "setError">) {
    return await meRegisterFN({ brandEmail, brandName, onlinePresence, setLoading, setError });
  }

  // ================================================================= THIS IS THE FUNCTION TO QUERY BRAND ID ===============================================================
  async function getBrandDetails({
    getOnlyId = false,
  }: {
    getOnlyId?: boolean;
  }): Promise<{ brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined> {
    return await getBrandDetailsFN({ brandEmail, setLoading, setError, getOnlyId });
  }
  // =============================================================== THIS IS THE FUNCTION TO CREATE REWARD ===============================================================

  async function createReward({
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, "setLoading" | "brandEmail" | "setError">) {
    return await createRewardFN({
      brandEmail,
      name,
      symbol,
      descriptionLink,
      totalSupply,
      setLoading,
      setError,
    });
  }

  // =============================================================== THIS IS THE FUNCTION TO SETUP OPENREWARDS ===============================================================
  async function setUpOpenReward({
    rewardAddress,
  }: Omit<SetUpOpenRewardProps, "setLoading" | "brandEmail" | "setError">) {
    return await setUpOpenRewardFN({
      brandEmail,
      rewardAddress,
      setLoading,
      setError,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE MAIN ACCOUNT (BRAND ADDRESS) ==========================================================
  async function changeMainAccount({
    newMainAcctAddress,
  }: Omit<ChangeMainAccountProps, "setLoading" | "brandEmail" | "setError">) {
    return await changeMainAccountFN({
      brandEmail,
      newMainAcctAddress,
      setLoading,
      setError,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO ACTIVATE OPEN REWRAD ==========================================================
  async function activateOpenReward({
    rewardAddress,
  }: Omit<ActivateOpenRewardProps, "setLoading" | "brandEmail" | "setError">) {
    return await activateOpenRewardFN({
      brandEmail,
      rewardAddress,
      setLoading,
      setError,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO RESUME OPEN REWRAD ==========================================================
  async function resumeOpenReward({
    rewardAddress,
  }: Omit<ResumeOpenRewardProps, "setLoading" | "brandEmail" | "setError">) {
    return await resumeOpenRewardFN({
      brandEmail,
      rewardAddress,
      setLoading,
      setError,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO PAUSE OPEN REWRAD ==========================================================
  async function pauseOpenReward({
    rewardAddress,
  }: Omit<PauseOpenRewardProps, "setLoading" | "brandEmail" | "setError">) {
    return await pauseOpenRewardFN({
      brandEmail,
      rewardAddress,
      setLoading,
      setError,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE OPTIMAL OPEN REWRAD ==========================================================
  async function changeOptimalOpenReward({
    rewardName,
    newOptimalValue,
  }: Omit<ChangeOptimalOpenRewardProps, "setLoading" | "brandEmail" | "setError">) {
    return await changeOptimalOpenRewardFN({
      brandEmail,
      rewardName,
      newOptimalValue,
      setLoading,
      setError,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO INTEGRATE OPEN REWRAD ==========================================================
  async function integrateReward({
    rewardAddress,
    descriptionLink,
    readTandC,
  }: Omit<IntegrateRewardProps, "setLoading" | "brandEmail" | "setError">) {
    return await integrateRewardFN({
      brandEmail,
      rewardAddress,
      descriptionLink,
      readTandC,
      setLoading,
      setError,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO TOP UP OPEN REWRAD LIQUIDITY ==========================================================
  async function topUpOpenRewardLiquidity({
    address,
    rewardAmount,
    meAmount,
  }: Omit<TopUpOpenRewardLiquidityProps, "setLoading" | "brandEmail" | "setError">) {
    return await topUpOpenRewardLiquidityFN({
      brandEmail,
      address,
      rewardAmount,
      meAmount,
      setLoading,
      setError,
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
  }: Omit<UpdateRewardConfigProps, "setLoading" | "brandEmail" | "setError">) {
    return await updateRewardConfigFN({
      brandEmail,
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
    });
  }

  //------------------------------------------ Consumer function ------------------------------------------------------------

  // ========================================= THIS IS THE FUNCTION TO SPEND REWARD ON ISSUING BRAND  ==========================================================
  async function spendRewardOnIssuingBrand({
    spendAddress,
    spendAmount,
  }: Omit<SpendRewardOnIssuingBrandProps, "setLoading" | "brandEmail" | "setError">) {
    return await spendRewardOnIssuingBrandFN({
      brandEmail,
      spendAddress,
      spendAmount,
      setLoading,
      setError,
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
  }: Omit<UpdateOpenRewardConfigProps, "setLoading" | "brandEmail" | "setError">) {
    return await updateOpenRewardConfigFN({
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
      setLoading,
      setError,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO UPDATE REWARD DETAILS ==========================================================
  async function updateRewardDetails({
    rewardAddress,
    details: { name, symbol, descriptionLink },
    brandId,
    ignoreDefault,
  }: Omit<UpdateRewardDetailsProps, "setLoading" | "brandEmail" | "setError">) {
    return await updateRewardDetailsFN({
      brandEmail,
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
    });
  }
  // ========================================= THIS IS THE FUNCTION TO getExpectedAmountOfTargetedReward ==========================================================
  async function getExpectedAmountOfTargetedReward({
    inputRewardAddress,
    outPutRewardAddress,
    amount,
    returnAsFormatted,
  }: Omit<GetExpectedAmountOfTargetedRewardProps, "setLoading" | "brandEmail" | "setError">) {
    return await getExpectedAmountOfTargetedRewardFN({
      inputRewardAddress,
      outPutRewardAddress,
      amount,
      setLoading,
      setError,
      returnAsFormatted,
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
  }: Omit<SwapWithDiffBrandProps, "setLoading" | "brandEmail" | "setError">) {
    return await swapWithDiffBrandFN({
      brandEmail,
      setLoading,
      setError,
      spendInfo: {
        rewardAtHand,
        targettedReward,
        amountOfRewardAtHand,
        expectedAmountOfTargetedReward,
      },
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
      }}
    >
      {children}
    </MeProtocolContext.Provider>
  );
};

export default MeProtocolProvider;
