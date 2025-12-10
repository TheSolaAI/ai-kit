/**
 * Use this tool context if you are using the SolanaKitToolSet.
 *
 * Check the README.md for more detailed usage instructions.
 */

import { aiProjectsToolSetFactory } from './aiProjectsToolSet';
import { nftToolSetFactory } from './nftToolSet';
import { onChainToolSetFactory } from './onChainToolSet';
import { stakingToolSetFactory } from './stakingToolSet';
import { tokenToolSetFactory } from './tokenToolSet';

// Tool Set Exports (all tools including lulo can be imported individually)
export { aiProjectsToolSetFactory } from './aiProjectsToolSet';
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
  nextjsServiceUrl?: string;
  enableLogging?: boolean;
};

/**
 * Context type specifically designed for SolanaKit tools.
 *
 * Contains the user's wallet public key and authentication token.
 */
export type { SolaKitToolContext } from './types';

/**
 * All Sola Kit toolset factories combined in a single array for convenience.
 *
 * NOTE: This array is evaluated during module initialization, so any toolsets
 * with circular dependencies should be lazy-loaded separately.
 */
export const SOLA_KIT_TOOLS = [
  aiProjectsToolSetFactory,
  nftToolSetFactory,
  onChainToolSetFactory,
  stakingToolSetFactory,
  tokenToolSetFactory,
];

/**
 * Get all toolset factories including those that need lazy-loading.
 * This function safely imports lulo after all other modules are initialized.
 *
 * @example
 * ```typescript
 * import { getAllToolSetFactories } from '@sola-labs/ai-kit';
 *
 * const toolsetFactories = getAllToolSetFactories();
 * // Use with AIKit
 * const aiKit = new AIKit({
 *   toolSetFactories: toolsetFactories,
 *   // ... other options
 * });
 * ```
 */
export async function getAllToolSetFactories() {
  const { luloToolSetFactory } = await import('./luloToolSet');
  return [...SOLA_KIT_TOOLS, luloToolSetFactory];
}

export { API_URLS, GOAT_INDEX_API_URL, tokenList } from './constants';
