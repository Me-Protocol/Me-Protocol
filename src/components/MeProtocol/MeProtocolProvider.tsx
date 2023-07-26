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

  //------------------------------------------ Brands function ------------------------------------------------------------

  // ================================================================= THIS IS THE REGISTER FUNCTION  =================================================================
  async function meRegister({ brandName, onlinePresence }: Omit<MeRegisterProps, "setLoading">) {
    return await meRegisterFN({ brandEmail, brandName, onlinePresence, setLoading });
  }

  // ================================================================= THIS IS THE FUNCTION TO QUERY BRAND ID ===============================================================
  async function getBrandDetails({
    getOnlyId = false,
  }: {
    brandEmail: string;
    getOnlyId?: boolean;
  }): Promise<{ brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined> {
    return await getBrandDetailsFN({ brandEmail, setLoading, getOnlyId });
  }
  // =============================================================== THIS IS THE FUNCTION TO CREATE REWARD ===============================================================

  async function createReward({
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, "setLoading">) {
    return await createRewardFN({
      brandEmail,
      name,
      symbol,
      descriptionLink,
      totalSupply,
      setLoading,
    });
  }

  // =============================================================== THIS IS THE FUNCTION TO SETUP OPENREWARDS ===============================================================
  async function setUpOpenReward({ rewardAddress }: Omit<SetUpOpenRewardProps, "setLoading">) {
    return await setUpOpenRewardFN({
      brandEmail,
      rewardAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE MAIN ACCOUNT (BRAND ADDRESS) ==========================================================
  async function changeMainAccount({
    newMainAcctAddress,
  }: Omit<ChangeMainAccountProps, "setLoading">) {
    return await changeMainAccountFN({
      brandEmail,
      newMainAcctAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO ACTIVATE OPEN REWRAD ==========================================================
  async function activateOpenReward({
    rewardAddress,
  }: Omit<ActivateOpenRewardProps, "setLoading">) {
    return await activateOpenRewardFN({
      brandEmail,
      rewardAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO RESUME OPEN REWRAD ==========================================================
  async function resumeOpenReward({ rewardAddress }: Omit<ResumeOpenRewardProps, "setLoading">) {
    return await resumeOpenRewardFN({
      brandEmail,
      rewardAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO PAUSE OPEN REWRAD ==========================================================
  async function pauseOpenReward({ rewardAddress }: Omit<PauseOpenRewardProps, "setLoading">) {
    return await pauseOpenRewardFN({
      brandEmail,
      rewardAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE OPTIMAL OPEN REWRAD ==========================================================
  async function changeOptimalOpenReward({
    rewardName,
    newOptimalValue,
  }: Omit<ChangeOptimalOpenRewardProps, "setLoading">) {
    return await changeOptimalOpenRewardFN({
      brandEmail,
      rewardName,
      newOptimalValue,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO INTEGRATE OPEN REWRAD ==========================================================
  async function integrateReward({
    rewardAddress,
    descriptionLink,
    readTandC,
  }: Omit<IntegrateRewardProps, "setLoading">) {
    return await integrateRewardFN({
      brandEmail,
      rewardAddress,
      descriptionLink,
      readTandC,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO TOP UP OPEN REWRAD LIQUIDITY ==========================================================
  async function topUpOpenRewardLiquidity({
    address,
    rewardAmount,
    meAmount,
  }: Omit<TopUpOpenRewardLiquidityProps, "setLoading">) {
    return await topUpOpenRewardLiquidityFN({
      brandEmail,
      address,
      rewardAmount,
      meAmount,
      setLoading,
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
  }: Omit<UpdateRewardConfigProps, "setLoading">) {
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
    });
  }

  //------------------------------------------ Consumer function ------------------------------------------------------------

  // ========================================= THIS IS THE FUNCTION TO SPEND REWARD ON ISSUING BRAND  ==========================================================
  async function spendRewardOnIssuingBrand({
    spendAddress,
    spendAmount,
  }: Omit<SpendRewardOnIssuingBrandProps, "setLoading">) {
    return await spendRewardOnIssuingBrandFN({
      brandEmail,
      spendAddress,
      spendAmount,
      setLoading,
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
  }: Omit<UpdateOpenRewardConfigProps, "setLoading">) {
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
    });
  }

  // ========================================= THIS IS THE FUNCTION TO UPDATE REWARD DETAILS ==========================================================
  async function updateRewardDetails({
    rewardAddress,
    details: { name, symbol, descriptionLink },
    brandId,
    ignoreDefault,
  }: Omit<UpdateRewardDetailsProps, "setLoading">) {
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
    });
  }
  // ========================================= THIS IS THE FUNCTION TO getExpectedAmountOfTargetedReward ==========================================================
  async function getExpectedAmountOfTargetedReward({
    inputRewardAddress,
    outPutRewardAddress,
    amount,
    returnAsFormatted,
  }: Omit<GetExpectedAmountOfTargetedRewardProps, "setLoading">) {
    return await getExpectedAmountOfTargetedRewardFN({
      inputRewardAddress,
      outPutRewardAddress,
      amount,
      setLoading,
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
  }: Omit<SwapWithDiffBrandProps, "setLoading">) {
    return await swapWithDiffBrandFN({
      brandEmail,
      setLoading,
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
