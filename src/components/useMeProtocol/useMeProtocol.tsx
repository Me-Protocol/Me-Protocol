import { useContext } from "react";
import { MeProtocolContext, MeRegisterProps } from "../MeProtocol/MeProtocolProvider";

const useMeProtocol = () => {
  const context = useContext<{
    meRegister: ({
      magicEmail,
      brandName,
      onlinePresence,
    }: MeRegisterProps) => Promise<{ transactionHash: string } | undefined>;
  } | null>(MeProtocolContext);

  if (!context) {
    throw new Error("useMeProtocol must be used within a MeProtocolProvider");
  }

  return context;
};

export default useMeProtocol;
