import { ethers } from "ethers";
import { UserInfo, Web3ProviderSetup } from "./types";
import { NO_ACCOUNTS_FOUND_ERROR } from "./connection";
import Web3 from "web3";
import { Magic } from "magic-sdk";

/**
 * Helper function to setup web3 provider and get user account
 *
 * @param magic - Magic instance for wallet interaction
 * @param magicWeb3 - Magic web3 instance
 * @returns Promise resolving to web3 provider setup with signer, user info, and account
 * @throws Error if no accounts are found or setup fails
 */
export async function setupWeb3Provider(magic: Magic, magicWeb3: Web3): Promise<Web3ProviderSetup> {
  const accounts = await magicWeb3.eth.getAccounts();

  if (accounts.length === 0) {
    throw new Error(NO_ACCOUNTS_FOUND_ERROR);
  }

  const userAccount = accounts[0];
  const provider = await magic.wallet.getProvider();
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const signer = web3Provider.getSigner(userAccount);
  const userInfo = (await magic.user.getInfo()) as UserInfo;

  return { signer, userInfo, userAccount };
}
