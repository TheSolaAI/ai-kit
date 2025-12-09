import { ApiClient } from './apiClient';

/**
 * Context type specifically designed for SolanaKit tools.
 *
 * Contains the user's wallet public key and authentication token.
 */
export interface SolaKitToolContext {
  /**
   * The public key of the user's wallet, used for Solana interactions.
   */
  walletPublicKey: string;

  /**
   * An authentication token to authorize operations on behalf of the user.
   */
  authToken: string;

  /**
   * The Sola API client instance for making API calls
   */
  apiClient: ApiClient;
}
