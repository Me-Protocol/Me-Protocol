import { useContext } from "react";
import { AllFnsProps } from "../../lib/types";
import { MeProtocolContext } from "../MeProtocol/MeProtocolProvider";

const useMeProtocol = () => {
  const context = useContext<AllFnsProps | null>(MeProtocolContext);

  if (!context) {
    throw new Error("useMeProtocol must be used within a MeProtocolProvider");
  }
  return context;
};
export default useMeProtocol;
