import { ethers } from "ethers";

/**
 * User information interface
 */
export interface UserInfo {
  publicAddress: string;
  email: string;
}

/**
 * Transaction result interface
 */
export interface TransactionResult {
  taskId: string;
}

/**
 * Relay input interface for transaction execution
 */
export interface RelayInput {
  from: string;
  data: string;
  to: string;
}

/**
 * Web3 provider setup result
 */
export interface Web3ProviderSetup {
  signer: ethers.Signer;
  userInfo: UserInfo;
  userAccount: string;
}

/**
 * Authentication result
 */
export interface AuthenticationResult {
  signer: ethers.Signer;
  userInfo: UserInfo;
  userAccount: string;
}

/**
 * Generic operation result with single field
 */
export interface OperationResult {
  publicAddress?: string;
  brandId?: string;
  brandDetails?: any;
}

/**
 * Generic info interface for spending/swapping operations
 */
export interface OperationInfo {
  rewardAtHand: string;
  targettedReward: string;
  amountOfRewardAtHand: ethers.BigNumber;
  expectedAmountOfTargetedReward: ethers.BigNumber | string | number;
}

/**
 * Base workflow parameters shared across operations
 */
export interface BaseWorkflowParams {
  signer: ethers.Signer;
  userInfo: UserInfo;
  meApiKey: string;
  reqURL: string;
  GELATO_API_KEY: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  OPEN_REWARD_DIAMOND: string;
  costPayerId?: string;
  debug?: boolean;
  pk: any;
  hedera: boolean;
}
