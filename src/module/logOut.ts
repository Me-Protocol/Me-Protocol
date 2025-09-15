import { Magic } from "magic-sdk";
import { performLogout } from "../helpers/utilityHelpers";

/**
 * Logs out the user from Magic Link authentication.
 *
 * @param magic - Magic instance
 * @param clearCache - Whether to clear cache (optional)
 * @returns Promise resolving to logout result
 * @throws Error if logout fails
 */
export async function logOutFn(magic: Magic, clearCache?: boolean): Promise<void> {
  return performLogout(magic, clearCache);
}
