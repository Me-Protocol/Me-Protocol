import { Magic } from "magic-sdk";
import { MagicProps } from "../lib/types";

export const createMagic = ({ key, CHAIN_ID, JSON_RPC_URL }: MagicProps) => {
  return new Magic(key, {
    network: {
      rpcUrl: JSON_RPC_URL,
      chainId: CHAIN_ID,
    },
  });
};
