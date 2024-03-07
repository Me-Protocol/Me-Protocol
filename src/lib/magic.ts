import { CHAIN_ID, JSON_RPC_URL } from "@developeruche/protocol-core";
import { Magic } from "magic-sdk";

const apiKey = "pk_live_FB79F672A43B8AC2";

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
