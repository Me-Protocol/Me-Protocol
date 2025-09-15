import { createWeb3 } from "../lib/web3";
import { GetWalletFromEmailProps } from "../lib/types";
import { OperationResult } from "../helpers/types";
import { executeSimpleWalletOperation } from "../helpers/walletHelpers";

/**
 * Gets a wallet public address from an email by forcing fresh authentication.
 *
 * This function forces logout if needed and authenticates with the provided email
 * to get the corresponding wallet address.
 *
 * @param params - Configuration object containing required parameters
 * @returns Promise resolving to wallet operation result with publicAddress
 * @throws Error if authentication or wallet retrieval fails
 */
export async function getWalletFromEmailFN({ userEmail, magic, setLoading, setError, persist }: GetWalletFromEmailProps): Promise<OperationResult> {
  // Input validation
  if (!userEmail) {
    throw new Error("Missing required parameter: userEmail");
  }

  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!magicWeb3) {
      throw new Error("Failed to create web3 instance");
    }

    // Execute simple wallet operation with forced logout
    const result = await executeSimpleWalletOperation(magic, magicWeb3, userEmail, true);

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Get wallet from email failed:", errorMessage);

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
