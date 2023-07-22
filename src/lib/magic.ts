import { Magic } from "magic-sdk";

const apiKey = "pk_live_F05B7044F5E51FDA";

const createMagic = (key: string) => {
  const customNodeOptions = {
    rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/bGRq4Ou6YB_plvpRZFDQsWW1MWukDWy6", // Polygon RPC URL
    chainId: 80001, // Polygon chain id
  };

  return (
    typeof window !== "undefined" &&
    new Magic(key, {
      network: customNodeOptions,
    })
  );
};

export const magic: any = createMagic(apiKey);
