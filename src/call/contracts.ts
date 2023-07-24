import { ethers } from 'ethers';
import { FORWARDER_ADDRESS, JSON_RPC_URL, OPEN_REWARD_DIAMOND, ME_TOKEN as ME_TOKEN_ADDR, DEMO_PRIVATE_KEY, CHAIN_ID } from './constants';
import ADMIN_MODULE_ABI from "./abis/admin";
import BRAND_MODULE_ABI from "./abis/brands";
import { WITH_PERMIT, WITHOUT_PERMIT} from "./abis/users";
import SECRETORY_ABI from "./abis/secretory";
import FORWARDER_ABI from "./abis/forwarder";
import REWARD_FACTORY_WITH_PERMIT from "./abis/rewardFactoryPermit";
import REWARD_WITH_PERMIT from "./abis/reward";
import ME_TOKEN from "./abis/meToken";
import POOL_FACTORY from "./abis/poolFactory";

export const defaultProvider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);
export const defaultSigner = new ethers.Wallet(DEMO_PRIVATE_KEY, defaultProvider);


export const adminContract = new ethers.Contract(OPEN_REWARD_DIAMOND, ADMIN_MODULE_ABI, defaultProvider);
export const userContractWithPermit = new ethers.Contract(OPEN_REWARD_DIAMOND, WITH_PERMIT, defaultProvider);
export const userContractWithoutPermit = new ethers.Contract(OPEN_REWARD_DIAMOND, WITHOUT_PERMIT, defaultProvider);
export const brandContract = new ethers.Contract(OPEN_REWARD_DIAMOND, BRAND_MODULE_ABI, defaultProvider);
export const secretoryContract = new ethers.Contract(OPEN_REWARD_DIAMOND, SECRETORY_ABI, defaultProvider);
export const forwarderContract = new ethers.Contract(FORWARDER_ADDRESS, FORWARDER_ABI, defaultProvider);
export const rewardFactory = new ethers.Contract(OPEN_REWARD_DIAMOND, REWARD_FACTORY_WITH_PERMIT, defaultProvider);
export const poolFactory = new ethers.Contract(OPEN_REWARD_DIAMOND, POOL_FACTORY, defaultProvider);
export const meToken = new ethers.Contract(ME_TOKEN_ADDR, ME_TOKEN, defaultSigner);


export const rewardWithPermit = (rewardAddress: string) => {
    return new ethers.Contract(rewardAddress, REWARD_WITH_PERMIT, defaultProvider);
}

export async function getPermitSignature(
  signer: any, 
  token: any, 
  spender: any, 
  value: any, 
  deadline: any
) {
    const [nonce, name, version, chainId] = await Promise.all([
      token.nonces(signer._address),
      token.name(),
      "1",
      CHAIN_ID,
    ])

    console.log(nonce, name, version, chainId)
  
    return ethers.utils.splitSignature(
      await signer._signTypedData(
        {
          name,
          version,
          chainId,
          verifyingContract: token.address,
        },
        {
          Permit: [
            {
              name: "owner",
              type: "address",
            },
            {
              name: "spender",
              type: "address",
            },
            {
              name: "value",
              type: "uint256",
            },
            {
              name: "nonce",
              type: "uint256",
            },
            {
              name: "deadline",
              type: "uint256",
            },
          ],
        },
        {
          owner: signer._address,
          spender,
          value,
          nonce,
          deadline,
        }
      )
    )
  }