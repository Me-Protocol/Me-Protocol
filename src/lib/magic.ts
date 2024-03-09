import { CHAIN_ID, JSON_RPC_URL } from "@developeruche/protocol-core";
import { Magic } from "magic-sdk";

const apiKey = "pk_live_C375E621E344EE98"; //mumbai

const createMagic = (key: any) => {
  const customNodeOptions = {
    rpcUrl: JSON_RPC_URL,
    chainId: CHAIN_ID,
  };

  return (
    typeof window !== "undefined" &&
    new Magic(key, {
      network: customNodeOptions,
    })
  );
};

export const magic: any = createMagic(apiKey);
