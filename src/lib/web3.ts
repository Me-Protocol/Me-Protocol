import { Magic } from "magic-sdk";
import Web3 from "web3";

export const createWeb3: any = async (magic: Magic) => {
  return typeof window !== "undefined" && new Web3(magic.rpcProvider);
};
