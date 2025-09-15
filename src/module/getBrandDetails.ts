import { GetBrandDetailsProps, BrandDetailsProps } from "../lib/types";
import { getBrandDetails } from "../helpers/utilityHelpers";

/**
 * Gets brand details for the authenticated user.
 *
 * This function handles user authentication and retrieves brand configuration
 * by user address.
 *
 * @param params - Configuration object containing required parameters
 * @returns Promise resolving to brand details or brand ID
 * @throws Error if authentication or brand details retrieval fails
 */
export async function getBrandDetailsFN({
  email,
  magic,
  getOnlyId = false,
  setLoading,
  setError,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
}: GetBrandDetailsProps): Promise<{ brandId: string } | { brandDetails: BrandDetailsProps } | undefined> {
  // Input validation
  if (!email) {
    throw new Error("Missing required parameter: email");
  }

  setLoading(true);

  try {
    // Handle authentication
    if (!(await magic.user.isLoggedIn())) {
      await magic.auth.loginWithEmailOTP({ email });
    }

    // Get user info
    const loggedInUserInfo = await magic.user.getInfo();

    if (!loggedInUserInfo.publicAddress) {
      throw new Error("User is not logged in");
    }

    // Get brand details
    const result = await getBrandDetails(magic, loggedInUserInfo.publicAddress, getOnlyId, JSON_RPC_URL, OPEN_REWARD_DIAMOND);

    return result.brandId ? { brandId: result.brandId } : { brandDetails: result.brandDetails };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Get brand details failed:", errorMessage);

    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}
