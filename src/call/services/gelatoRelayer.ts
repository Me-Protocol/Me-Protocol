import {
  CallWithERC2771Request,
  GelatoRelay,
  ERC2771Type,
  SignatureData,
} from "@gelatonetwork/relay-sdk";
import { GELATO_API_KEY, OPEN_REWARD_DIAMOND } from "../constants";
// import axios from "axios";
import axios, * as others from "axios";

export interface inputType {
  to: string;
  data: string;
  from: string;
}

export async function relay(
  input: inputType,
  wallet: any,
  meApiKey: string,
  reqURL: string,
  costPayerId?: string
) {
  const relay = new GelatoRelay();

  // console.log(meApiKey, reqURL, "PARAMS PASSED");

  const request: CallWithERC2771Request = {
    chainId: 80001,
    target: OPEN_REWARD_DIAMOND,
    data: input.data,
    user: input.from,
  };
  // console.log(request, "this is request");
  // console.log(wallet, "this is wallet");
  const { struct, signature } = await relay.getSignatureDataERC2771(
    request,
    wallet,
    ERC2771Type.SponsoredCall
  );

  // console.log("struct", JSON.stringify(struct));
  // console.log("signature", signature);

  const relayBody = costPayerId
    ? {
        data: struct,
        tnxType: "relayer",
        narration: "1",
        network: "MUMBAI",
        signature,
        brandId: costPayerId,
      }
    : {
        data: struct,
        tnxType: "relayer",
        narration: "1",
        network: "MUMBAI",
        signature,
      };
  //   const relayResponse = await relay.sponsoredCallERC2771WithSignature(struct, signature, GELATO_API_KEY);

  let relayResponse = await axios.post(`${reqURL}`, relayBody, {
    headers: {
      Authorization: `Bearer ${meApiKey}`,
    },
  });

  // console.log("relayResponse", relayResponse);

  const relayResponse_ = {
    taskId: relayResponse.data.data.taskId,
  };

  return relayResponse_;
}
