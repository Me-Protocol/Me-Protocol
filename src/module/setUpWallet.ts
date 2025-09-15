import { createWeb3 } from "../lib/web3";
import { SetUpWalletProps } from "../lib/types";
import { OperationResult } from "../helpers/types";
import { executeSimpleWalletOperation } from "../helpers/walletHelpers";

/**
 * Sets up a wallet by authenticating the user and returning their public address.
 *
 * This function handles user authentication and wallet setup.
 *
 * @param params - Configuration object containing required parameters
 * @returns Promise resolving to wallet operation result with publicAddress
 * @throws Error if authentication or wallet setup fails
 */
export async function setUpWalletFN({ email, magic, setLoading, setError, persist }: SetUpWalletProps): Promise<OperationResult> {
  // Input validation
  if (!email) {
    throw new Error("Missing required parameter: email");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Execute simple wallet operation
    const result = await executeSimpleWalletOperation(magic, magicWeb3, email, false);

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Set up wallet failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);

    // Logout user if not persisting session
    if (!persist) {
      try {
        await magic.user.logout();
      } catch (logoutError) {
        console.warn("Failed to logout user:", logoutError);
      }
    }
  }
}
