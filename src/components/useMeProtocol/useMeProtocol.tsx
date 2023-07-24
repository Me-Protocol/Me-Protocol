import { useContext } from "react";
import { MeProtocolContext } from "../MeProtocol/MeProtocolProvider";
import { MeRegisterProps } from "../../lib/types";

const useMeProtocol = () => {
  const context = useContext<{
    loading: boolean;
    getBrandId: ({
      magicEmail,
    }: {
      magicEmail: string;
    }) => Promise<{ brandId: string } | undefined>;
    meRegister: ({
      magicEmail,
      brandName,
      onlinePresence,
    }: Omit<MeRegisterProps, "setLoading">) => Promise<{ transactionHash: string } | undefined>;
  } | null>(MeProtocolContext);

  if (!context) {
    throw new Error("useMeProtocol must be used within a MeProtocolProvider");
  }
  return context;
};
export default useMeProtocol;
