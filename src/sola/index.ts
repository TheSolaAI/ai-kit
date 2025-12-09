/**
 * Use this tool context if you are using the SolanaKitToolSet.
 *
 * Check the README.md for more detailed usage instructions.
 */

import { aiProjectsToolSetFactory } from './aiProjectsToolSet';
import { luloToolSetFactory } from './luloToolSet';
import { nftToolSetFactory } from './nftToolSet';
import { onChainToolSetFactory } from './onChainToolSet';
import { stakingToolSetFactory } from './stakingToolSet';
import { tokenToolSetFactory } from './tokenToolSet';

// Tool Set Exports
export { aiProjectsToolSetFactory } from './aiProjectsToolSet';
export { luloToolSetFactory } from './luloToolSet';
export { nftToolSetFactory } from './nftToolSet';
export { onChainToolSetFactory } from './onChainToolSet';
export { stakingToolSetFactory } from './stakingToolSet';
export { tokenToolSetFactory } from './tokenToolSet';

// Schema Exports for Runtime Validation
export {
  stakingSchemas,
  stakingResultSchemas,
  // Individual result schemas
  nativeStakingResultSchema,
  nativeUnstakingResultSchema,
  withdrawalResultSchema,
  withdrawableAmountResultSchema,
  withdrawReadyResultSchema,
  stakeStatusResultSchema,
} from './stakingToolSet';

// API Client Exports
export { ApiClient, createApiClient } from './apiClient';
export type { ApiResponse, ApiError } from '@/types/api.types';

// Re-export the options type for easier access
export type ApiClientOptions = {
  dataServiceUrl?: string;
  walletServiceUrl?: string;
  goatIndexServiceUrl?: string;
  enableLogging?: boolean;
};

/**
 * Example usage:
 *
 * ```typescript
 * import { createApiClient } from '';
 *
 * // Initialize the API client
 * const apiClient = createApiClient({
 *   dataServiceUrl: 'https://api.example.com/data',
 *   walletServiceUrl: 'https://api.example.com/wallet',
 *   goatIndexServiceUrl: 'https://api.example.com/goat-index',
 *   enableLogging: true
 * });
 *
 * // Use in your application context
 * const context = {
 *   tools: {
 *     apiClient,
 *     // ... other tools
 *   }
 * };
 * ```
 */

/**
 * Context type specifically designed for SolanaKit tools.
 *
 * Contains the user's wallet public key and authentication token.
 */
export type { SolaKitToolContext } from './types';

/**
 * All Sola Kit toolset factories combined in a single array for convenience
 */
export const SOLA_KIT_TOOLS = [
  aiProjectsToolSetFactory,
  luloToolSetFactory,
  nftToolSetFactory,
  onChainToolSetFactory,
  stakingToolSetFactory,
  tokenToolSetFactory,
];

export { API_URLS, GOAT_INDEX_API_URL, tokenList } from './constants';
