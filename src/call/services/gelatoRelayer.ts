import { CallWithERC2771Request, GelatoRelay, ERC2771Type, SignatureData } from "@gelatonetwork/relay-sdk";
import { GELATO_API_KEY, OPEN_REWARD_DIAMOND } from "../constants";
import axios from "axios";


export interface inputType {
    to: string
    data: string
    from: string
}

export async function relay(input: inputType, wallet: any) {
    const relay = new GelatoRelay();

    const request: CallWithERC2771Request = {
        chainId: 80001,
        target: OPEN_REWARD_DIAMOND,
        data: input.data,
        user: input.from,
      };
    
      const {struct, signature} = await relay.getSignatureDataERC2771(request, wallet, ERC2771Type.SponsoredCall);

      console.log("struct", JSON.stringify(struct));
        console.log("signature", signature);


    
    //   const relayResponse = await relay.sponsoredCallERC2771WithSignature(struct, signature, GELATO_API_KEY);
      let relayResponse = await axios.post("https://8b55-102-89-22-124.ngrok-free.app/cost/request", {
        data: struct,
        tnxType: "relayer",
        narration: "1",
        network: "MUMBAI",
        signature
    }, {
        headers: {
            Authorization: `Bearer b5hnok5zcoongvz406l8`
        }
    });

    console.log("relayResponse", relayResponse);

    const relayResponse_ = {
        taskId: relayResponse.data.data.taskId,
    }

    return relayResponse_;
}