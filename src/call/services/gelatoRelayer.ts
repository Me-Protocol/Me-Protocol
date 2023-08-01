import { CallWithERC2771Request, GelatoRelay } from "@gelatonetwork/relay-sdk";
import { GELATO_API_KEY, OPEN_REWARD_DIAMOND } from "../constants";

export interface inputType {
  to: string;
  data: string;
  from: string;
}

export async function relay(input: inputType, wallet: any) {
  const relay = new GelatoRelay();

  const request: CallWithERC2771Request = {
    chainId: 80001,
    target: OPEN_REWARD_DIAMOND,
    data: input.data,
    user: input.from,
  };

  const relayResponse = await relay.sponsoredCallERC2771(request, wallet, GELATO_API_KEY);

  return relayResponse;
}