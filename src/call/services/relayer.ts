import axios from "axios"
import {AUTO_TASK_WEB_HOOK, CHAIN_ID, FORWARDER_ADDRESS, OPEN_REWARD_DIAMOND} from "../constants"
import { forwarderContract } from "../contracts"
import { ForwardRequest, EIP712Domain } from "../utils"
import { signTypedData } from "./wallet"

export interface AutoTaskRequest {
    signature: string
    request: {
        value: number
        gas: number
        nonce: string
        to: string
        from: string
        data: string
    }
}

export interface inputType {
    from: string
    to: string
    data: string
}

export const prepData = async (input: inputType, account:any) => {
    const nonce = await forwarderContract.getNonce(input.from)
        .then((nonce: any) => nonce.toString());

    let request_: any = {
        ...input,
        value: 0,
        gas: 1e6,
        nonce: Number(nonce),
    }

    const typedData = {
        types: {
            ForwardRequest,
        },
        domain: {
            name: 'MinimalForwarder',
            version: '0.0.1',
            chainId: CHAIN_ID,
            verifyingContract: FORWARDER_ADDRESS,
          },
        primaryType: 'ForwardRequest',
        message: request_
    }

    return {
        typedData,
        request: request_
    }
}

export const relay = async (typedData: any, request: any, signature: any) => {
    const toPush =  {
        signature,
        request
    }

    console.log("toPush", toPush);
    
    console.log("pushing to auto task");

    return push(toPush);
}


export const push = (request: AutoTaskRequest) => {
    console.log("pushing to auto task__ 2");
    return axios.post(AUTO_TASK_WEB_HOOK, request);
}