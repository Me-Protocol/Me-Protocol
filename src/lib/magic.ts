import { CHAIN_ID, JSON_RPC_URL } from "@developeruche/protocol-core";
import { Magic } from "magic-sdk";

const apiKey = "pk_live_F05B7044F5E51FDA";

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
