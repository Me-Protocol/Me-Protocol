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
} from "../../lib/types";
import { getBrandDetailsFN } from "../../module/getBrandDetails";
import { createRewardFN } from "../../module/createReward";
import { setUpOpenRewardFN } from "../../module/setUpOpenReward";
import { changeMainAccountFN } from "../../module/changeMainAccount";
import { activateOpenRewardFN } from "../../module/activateOpenReward";
import { resumeOpenRewardFN } from "../../module/resumeOpenReward";
import { pauseOpenRewardFN } from "../../module/pauseOpenReward";
import { changeOptimalOpenRewardFN } from "../../module/changeOptimalOpenReward";

export const MeProtocolContext = createContext<AllFnsProps | null>(null);

const MeProtocolProvider: FC<MeProtocolProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

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
    address,
  }: Omit<SetUpOpenRewardProps, "setLoading">) {
    return await setUpOpenRewardFN({
      magicEmail,
      address,
      setLoading,
    });
  }

  // ========================================= THIS IS THE FUNCTION TO CHANGE MAIN ACCOUNT (BRAND ADDRESS) ==========================================================
  async function changeMainAccount({
    magicEmail,
    address,
  }: Omit<ChangeMainAccountProps, "setLoading">) {
    return await changeMainAccountFN({
      magicEmail,
      address,
      setLoading,
    });
  }

   // ========================================= THIS IS THE FUNCTION TO ACTIVATE OPEN REWRAD ==========================================================
   async function activateOpenReward({
    magicEmail,
    address,
  }: Omit<ActivateOpenRewardProps, "setLoading">) {
    return await activateOpenRewardFN({
      magicEmail,
      address,
      setLoading,
    });
  }

     // ========================================= THIS IS THE FUNCTION TO RESUME OPEN REWRAD ==========================================================
     async function resumeOpenReward({
      magicEmail,
      address,
    }: Omit<ResumeOpenRewardProps, "setLoading">) {
      return await resumeOpenRewardFN({
        magicEmail,
        address,
        setLoading,
      });
    }

    // ========================================= THIS IS THE FUNCTION TO PAUSE OPEN REWRAD ==========================================================
    async function pauseOpenReward({
          magicEmail,
          address,
        }: Omit<PauseOpenRewardProps, "setLoading">) {
          return await pauseOpenRewardFN({
            magicEmail,
            address,
            setLoading,
          });
        }
    
    // ========================================= THIS IS THE FUNCTION TO CHANGE OPTIMAL OPEN REWRAD ==========================================================
    async function changeOptimalOpenReward({
      magicEmail,
      name,
      newOptimal,
    }: Omit<ChangeOptimalOpenRewardProps, "setLoading">) {
      return await changeOptimalOpenRewardFN({
        magicEmail,
        name,
        newOptimal,
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
        changeOptimalOpenReward
      }}
    >
      {children}
    </MeProtocolContext.Provider>
  );
};

export default MeProtocolProvider;
