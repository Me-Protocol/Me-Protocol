import { useContext } from "react";
import { MeProtocolContext } from "../MeProtocol/MeProtocolProvider";

const useMeProtocol = () => {
  const context = useContext(MeProtocolContext);

  if (!context) {
    throw new Error("useMeProtocol must be used within a MeProtocolProvider");
  }

  return context;
};

export default useMeProtocol;
