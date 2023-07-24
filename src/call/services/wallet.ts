const ethSigUtil = require('eth-sig-util');
import { DEMO_PRIVATE_KEY } from "../constants";


// Idealy this function would taking a clousre function that would be signing the typed data as there is no direct contact with the private key from this codebase
export const signTypedData = (data: any) => {
    const privateKey = Buffer.from(DEMO_PRIVATE_KEY.replace(/^0x/, ''), 'hex');
    console.log(ethSigUtil, privateKey, data)
    return ethSigUtil.signTypedMessage(privateKey, { data });
}