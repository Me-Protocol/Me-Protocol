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

export const MeProtocolContext = createContext<AllFnsProps | null>(null);

const MeProtocolProvider: FC<MeProtocolProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  //------------------------------------------ Brands function ------------------------------------------------------------

  // ================================================================= THIS IS THE REGISTER FUNCTION  =================================================================
  async function meRegister({
    magicEmail,
    brandName,
    onlinePresence,
  }: Omit<MeRegisterProps, "setLoading">) {
    return await meRegisterFN({ magicEmail, brandName, onlinePresence, setLoading });
  }

  // ================================================================= THIS IS THE FUNCTION TO QUERY BRAND ID ===============================================================
  async function getBrandDetails({
    magicEmail,
    getOnlyId = false,
  }: {
    magicEmail: string;
    getOnlyId?: boolean;
  }): Promise<{ brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined> {
    return await getBrandDetailsFN({ magicEmail, setLoading, getOnlyId });
  }
  // =============================================================== THIS IS THE FUNCTION TO CREATE REWARD ===============================================================

  async function createReward({
    magicEmail,
    name,
    symbol,
    descriptionLink,
    totalSupply,
  }: Omit<CreateRewardProps, "setLoading">) {
    return await createRewardFN({
      magicEmail,
      name,
      symbol,
      descriptionLink,
      totalSupply,
      setLoading,
    });
  }

  // =============================================================== THIS IS THE FUNCTION TO SETUP OPENREWARDS ===============================================================
  async function setUpOpenReward({
    magicEmail,
    rewardAddress,
  }: Omit<SetUpOpenRewardProps, "setLoading">) {
    return await setUpOpenRewardFN({
      magicEmail,
      rewardAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE MAIN ACCOUNT (BRAND ADDRESS) ==========================================================
  async function changeMainAccount({
    magicEmail,
    newMainAcctAddress,
  }: Omit<ChangeMainAccountProps, "setLoading">) {
    return await changeMainAccountFN({
      magicEmail,
      newMainAcctAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO ACTIVATE OPEN REWRAD ==========================================================
  async function activateOpenReward({
    magicEmail,
    rewardAddress,
  }: Omit<ActivateOpenRewardProps, "setLoading">) {
    return await activateOpenRewardFN({
      magicEmail,
      rewardAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO RESUME OPEN REWRAD ==========================================================
  async function resumeOpenReward({
    magicEmail,
    rewardAddress,
  }: Omit<ResumeOpenRewardProps, "setLoading">) {
    return await resumeOpenRewardFN({
      magicEmail,
      rewardAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO PAUSE OPEN REWRAD ==========================================================
  async function pauseOpenReward({
    magicEmail,
    rewardAddress,
  }: Omit<PauseOpenRewardProps, "setLoading">) {
    return await pauseOpenRewardFN({
      magicEmail,
      rewardAddress,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE OPTIMAL OPEN REWRAD ==========================================================
  async function changeOptimalOpenReward({
    magicEmail,
    rewardName,
    newOptimalValue,
  }: Omit<ChangeOptimalOpenRewardProps, "setLoading">) {
    return await changeOptimalOpenRewardFN({
      magicEmail,
      rewardName,
      newOptimalValue,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE OPTIMAL OPEN REWRAD ==========================================================
  async function integrateReward({
    magicEmail,
    rewardAddress,
    descriptionLink,
    readTandC,
  }: Omit<IntegrateRewardProps, "setLoading">) {
    return await integrateRewardFN({
      magicEmail,
      rewardAddress,
      descriptionLink,
      readTandC,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE OPTIMAL OPEN REWRAD ==========================================================
  async function topUpOpenRewardLiquidity({
    magicEmail,
    address,
    rewardAmount,
    meAmount,
  }: Omit<TopUpOpenRewardLiquidityProps, "setLoading">) {
    return await topUpOpenRewardLiquidityFN({
      magicEmail,
      address,
      rewardAmount,
      meAmount,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE OPTIMAL OPEN REWRAD ==========================================================
  async function updateRewardConfig({
    magicEmail,
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
      magicEmail,
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

  // ========================================= THIS IS THE FUNCTION SPEND REWARD ON ISSUING BRAND  ==========================================================
  async function spendRewardOnIssuingBrand({
    magicEmail,
    spendAddress,
    spendAmount,
  }: Omit<SpendRewardOnIssuingBrandProps, "setLoading">) {
    return await spendRewardOnIssuingBrandFN({
      magicEmail,
      spendAddress,
      spendAmount,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION SPEND REWARD ON ISSUING BRAND  ==========================================================
  async function updateOpenRewardConfig({
    magicEmail,
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
      magicEmail,
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
      }}
    >
      {children}
    </MeProtocolContext.Provider>
  );
};

export default MeProtocolProvider;
