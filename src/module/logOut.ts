import { magic } from "../lib/magic";

export async function logOutFn(clearCache?: boolean) {
  try {
    return await magic.user.logout();
  } catch (error) {
    throw error;
  }
}
