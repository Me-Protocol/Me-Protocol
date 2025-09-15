import axios from "axios";
import { ethers } from "ethers";
import { VaultPermitParams, signConsent } from "@developeruche/protocol-core";

/**
 * Parameters for vault permit request
 */
export interface VaultPermitRequest {
  reqURL: string;
  meApiKey: string;
  value: string;
  brandId: string;
  rewardAddress: string;
  signature: string;
}

/**
 * Helper function to get vault permit from API
 *
 * @param params - Vault permit request parameters
 * @returns Promise resolving to vault permit data
 * @throws Error if permit request fails
 */
export async function getVaultPermit(params: VaultPermitRequest): Promise<VaultPermitParams> {
  const { reqURL, meApiKey, value, brandId, rewardAddress, signature } = params;

  try {
    const response = await axios.post<{ data: VaultPermitParams }>(
      `${reqURL}/reward/get-vault-permit`,
      {
        value,
        brandId,
        rewardAddress,
        sign: signature,
      },
      {
        headers: {
          Authorization: `Bearer ${meApiKey}`,
        },
      }
    );

    const vaultPermitData = response.data?.data;
    if (!vaultPermitData) {
      throw new Error("Failed to obtain vault permit data from API response");
    }

    return vaultPermitData;
  } catch (error) {
    throw new Error(`Vault permit request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Helper function to sign consent and get vault permit
 *
 * @param signer - Ethers signer instance
 * @param tokenAddress - Token address for consent
 * @param amount - Amount to sign consent for
 * @param permitParams - Vault permit request parameters
 * @returns Promise resolving to vault permit data
 * @throws Error if signing or permit request fails
 */
export async function signConsentAndGetVaultPermit(
  signer: ethers.Signer,
  tokenAddress: string,
  amount: string,
  permitParams: Omit<VaultPermitRequest, "signature" | "value">
): Promise<VaultPermitParams> {
  try {
    // Sign consent for the token amount
    const signature = await signConsent(
      signer as any, // Type assertion for compatibility
      tokenAddress,
      amount
    );

    // Get vault permit using the signature
    const vaultPermitData = await getVaultPermit({
      ...permitParams,
      signature,
      value: amount,
    });

    return vaultPermitData;
  } catch (error) {
    throw new Error(`Sign consent and permit request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
