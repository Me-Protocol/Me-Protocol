import Web3 from "web3";
import { delay } from "./delay";

// Constants
export const CONNECTION_RETRY_DELAY = 1000; // 1 second
export const CONNECTION_TIMEOUT = 30000; // 30 seconds
export const NO_ACCOUNTS_FOUND_ERROR = "no accounts found";

/**
 * Helper function to wait for web3 connection with timeout
 *
 * @param magicWeb3 - The Magic web3 instance to check for connection
 * @throws Error if connection timeout is reached
 */
export async function waitForConnection(magicWeb3: Web3): Promise<void> {
  const startTime = Date.now();
  let isConnected = magicWeb3;

  while (!isConnected && Date.now() - startTime < CONNECTION_TIMEOUT) {
    await delay(CONNECTION_RETRY_DELAY);
    isConnected = magicWeb3;
  }

  if (!isConnected) {
    throw new Error("Connection timeout: Unable to establish web3 connection");
  }
}
