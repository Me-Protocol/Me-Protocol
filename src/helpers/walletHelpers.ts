import { waitForConnection } from "./connection";
import { setupWeb3Provider } from "./web3Provider";
import { OperationResult } from "./types";
import { Magic } from "magic-sdk";
import Web3 from "web3";

/**
 * Simple wallet setup parameters
 */
export interface WalletSetupParams {
  magic: Magic;
  email: string;
}

/**
 * Executes simple wallet operations (setup, get address from email)
 *
 * This is a simplified version of authentication that doesn't require
 * complex transaction handling, just gets the wallet address.
 *
 * @param magic - Magic instance
 * @param magicWeb3 - Magic web3 instance
 * @param email - User email
 * @param forceLogout - Whether to force logout first (for getWalletFromEmail)
 * @returns Promise resolving to wallet operation result
 * @throws Error if wallet setup fails
 */
export async function executeSimpleWalletOperation(
  magic: Magic,
  magicWeb3: Web3,
  email: string,
  forceLogout: boolean = false
): Promise<OperationResult> {
  try {
    // Force logout if requested (for getWalletFromEmail)
    if (forceLogout && (await magic.user.isLoggedIn())) {
      await magic.user.logout();
    }

    const isLoggedIn = await magic.user.isLoggedIn();

    if (!isLoggedIn) {
      // User not logged in - perform login
      await magic.auth.loginWithEmailOTP({ email });
      await waitForConnection(magicWeb3);
      const { userInfo } = await setupWeb3Provider(magic, magicWeb3);
      return { publicAddress: userInfo.publicAddress };
    }

    // User is logged in - check email match
    const { email: connectedEmail } = await magic.user.getInfo();

    if (email !== connectedEmail) {
      // Email mismatch - logout and login with correct email
      await magic.user.logout();
      await magic.auth.loginWithEmailOTP({ email });
      await waitForConnection(magicWeb3);
      const { userInfo } = await setupWeb3Provider(magic, magicWeb3);
      return { publicAddress: userInfo.publicAddress };
    }

    // User is logged in with correct email
    await waitForConnection(magicWeb3);
    const { userInfo } = await setupWeb3Provider(magic, magicWeb3);
    return { publicAddress: userInfo.publicAddress };
  } catch (error) {
    throw new Error(`Wallet operation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
