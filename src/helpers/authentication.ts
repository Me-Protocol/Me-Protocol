import { AuthenticationResult } from "./types";
import { waitForConnection } from "./connection";
import { setupWeb3Provider } from "./web3Provider";
import { Magic } from "magic-sdk";
import Web3 from "web3";

/**
 * Helper function to handle user authentication for Magic Link
 *
 * This function handles three authentication scenarios:
 * 1. User not logged in - performs login
 * 2. User logged in with different email - logout and re-login
 * 3. User logged in with correct email - proceed with existing session
 *
 * @param magic - Magic instance for authentication
 * @param magicWeb3 - Magic web3 instance
 * @param email - Email address to authenticate with
 * @returns Promise resolving to authentication result with signer and user info
 * @throws Error if authentication fails
 */
export async function handleUserAuthentication(magic: Magic, magicWeb3: Web3, email: string): Promise<AuthenticationResult> {
  const isLoggedIn = await magic.user.isLoggedIn();

  if (!isLoggedIn) {
    // User not logged in - perform login
    await magic.auth.loginWithEmailOTP({ email });
    await waitForConnection(magicWeb3);
    return setupWeb3Provider(magic, magicWeb3);
  }

  // User is logged in - check email match
  const { email: connectedEmail } = await magic.user.getInfo();

  if (email !== connectedEmail) {
    // Email mismatch - logout and login with correct email
    await magic.user.logout();
    await magic.auth.loginWithEmailOTP({ email });
    await waitForConnection(magicWeb3);
    return setupWeb3Provider(magic, magicWeb3);
  }

  // User is logged in with correct email
  await waitForConnection(magicWeb3);
  return setupWeb3Provider(magic, magicWeb3);
}
