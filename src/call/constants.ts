import { ethers } from "ethers";
import { ConfigForTypeAOpenRewards } from "./services";

export const AUTO_TASK_WEB_HOOK =
  "https://api.defender.openzeppelin.com/autotasks/c892d48f-5432-4f06-8721-37151deb7c20/runs/webhook/72e3ea12-98b4-47d3-b317-212e3ce70193/SRBGhSaLmzadNbeqiwbWpo";
export const OPEN_REWARD_DIAMOND = "0x0447f0429e240f119c35740a7A30a080Bc0Ee864";
export const ME_TOKEN = "0x6A8299CB8F45208fe6cd432eb18f26fBa60dB5f3";
export const BOUNTY_POOL = "";
export const TREASURY = "";
export const JSON_RPC_URL =
  "https://polygon-mumbai.g.alchemy.com/v2/bGRq4Ou6YB_plvpRZFDQsWW1MWukDWy6";
export const FORWARDER_ADDRESS = "0xd8253782c45a12053594b9deB72d8e8aB2Fca54c";
export const CHAIN_ID = 80001;
export const DEMO_PRIVATE_KEY = "602e9875b7933be975bf0f7243290916986c450de020e660fd48004f3db0ed1b";
export const DEMO_ADDRESS = "0x6C9024109236c18f2FF9971e950707b7359C3005";
export const GELATO_API_KEY = "_RK3gVQMjLjUieeiLHlLHSeHSH6BG_3uT89V_ndSvm0_";
export const OPEN_REWARD_IMPLEMENTATION = "0x4Bacd5C4D27EBd459EFe61769675998CB8423F03";

export const genPoolConfig = (): ConfigForTypeAOpenRewards => {
  const rand_ = [1, 2, 3, 4, 5, 6];

  const randomElement = rand_[Math.floor(Math.random() * rand_.length)];

  const PoolConfig: ConfigForTypeAOpenRewards = {
    rOptimal: randomElement * 1600000,
    maximumRLimit: randomElement * 1700000,
    minimumRewardAmountForConversation: ethers.utils.parseEther("1"),
    minimumMeAmountForConversation: ethers.utils.parseEther("1"),
    notifyRewardAmount: 0,
    notifyMeAmount: 0,
    defaultSlippageInPrecision: 5000000,
    allowSwaps: true,
  };

  return PoolConfig;
};
