import Web3 from "web3";

export const createWeb3: any = async (magic: any) => {
  return typeof window !== "undefined" && new Web3(magic.rpcProvider);
};
