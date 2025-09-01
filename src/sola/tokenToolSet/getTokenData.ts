import { z } from 'zod';
import { createToolFactory } from '@/tools';
import { SolaKitToolContext } from '..';
import { ApiClient } from '../apiClient';
import { TokenDataResponse } from '@/types/token.types';

const getTokenDataParams = z.object({
  token_address: z
    .string()
    .min(1)
    .max(100)
    .describe(
      'The exact token contract address, symbol, or name. For symbols provide the $ symbol (e.g., $SOL, $JUP, $BONK)'
    ),
});

export const getTokenDataToolFactory = createToolFactory(
  {
    description:
      'Get details such as the price, market cap, liquidity, price change, volume of buy and sell',
    parameters: getTokenDataParams,
  },
  async (params, context: SolaKitToolContext) => {
    const { token_address } = params;

    console.log(token_address);
    let tokenSymbol = token_address.trim();

    const apiSymbol = tokenSymbol.startsWith('$')
      ? tokenSymbol
      : `$${tokenSymbol}`;

    // Fix: Use the original token_address for address detection and fallback
    const isAddress = token_address.length > 35;
    const tokenAddressFallback = isAddress ? token_address : '';

    console.log('starting the get request');

    try {
      const url = isAddress
        ? `data/token/address?token_address=${token_address}` // Use raw address
        : `data/token/symbol?symbol=${apiSymbol}`;

      if (!context.authToken) {
        return {
          success: false,
          error: 'No auth token provided',
          data: undefined,
        };
      }

      const response = await context.apiClient.get<TokenDataResponse>(
        url,
        undefined,
        'data'
      );

      console.log('got an response');
      console.log(response.success);

      if (!ApiClient.isApiError(response)) {
        console.log('it is an api response');
        console.log(response);
        console.log('response');
        return {
          success: true,
          data: response.data,
          textResponse: false,
        };
      } else {
        console.log('here attempt 1');
        // Fallback attempt 1: After failed API response
        if (tokenAddressFallback) {
          const ds = await fetchTokenDataFromDexScreener(tokenAddressFallback);
          console.log(ds);
          console.log('attempt1');
          if (ds) {
            return { success: true, data: ds, textResponse: false };
          }
        }

        return {
          success: false,
          error: response?.errors?.[0]?.detail || 'Invalid response',
          data: undefined,
        };
      }
    } catch (error) {
      console.log('entering error block');

      // Fallback attempt 2: After exception
      if (tokenAddressFallback) {
        const ds = await fetchTokenDataFromDexScreener(tokenAddressFallback);
        console.log(ds);
        console.log('attempt2');
        if (ds) {
          return { success: true, data: ds, textResponse: false };
        }
      }

      return {
        success: false,
        error: 'Failed to fetch token data',
        data: undefined,
      };
    }
  }
);

// Fallback: fetch token market data from DexScreener and map to TokenDataResponse
async function fetchTokenDataFromDexScreener(
  tokenAddress: string
): Promise<TokenDataResponse | null> {
  try {
    // DexScreener: Get pools for a given token address on Solana
    // Docs: /token-pairs/v1/{chainId}/{tokenAddress}
    const url = `https://api.dexscreener.com/token-pairs/v1/solana/${tokenAddress}`;
    const res = await fetch(url, { method: 'GET' });

    if (!res.ok) {
      console.error(`DexScreener returned ${res.status} for ${url}`);
      return null;
    }

    const pairs: any[] = await res.json();
    if (!Array.isArray(pairs) || pairs.length === 0) {
      return null;
    }

    // Choose the pool with highest USD liquidity to avoid illiquid/stale pairs
    const best = pairs
      .filter(p => p?.baseToken?.address?.length > 0)
      .sort((a, b) => (b?.liquidity?.usd || 0) - (a?.liquidity?.usd || 0))[0];

    if (!best) return null;

    const toNum = (v: any): number => {
      if (v === null || v === undefined) return 0;
      const n = typeof v === 'string' ? parseFloat(v) : Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    // Map DexScreener -> TokenDataResponse
    const mapped: TokenDataResponse = {
      address: best.baseToken.address || tokenAddress,
      decimals: 0,
      symbol: best.baseToken.symbol || '',
      name: best.baseToken.name || '',
      marketCap: toNum(best.marketCap),
      fdv: toNum(best.fdv),
      extensions: {} as any,
      logoURI: '',
      liquidity: toNum(best?.liquidity?.usd),
      price: toNum(best?.priceUsd),
      priceChange30mPercent: 0,
      priceChange1hPercent: toNum(best?.priceChange?.h1),
      priceChange4hPercent: 0,
      priceChange24hPercent: toNum(best?.priceChange?.h24),
      uniqueWallet30m: 0,
      uniqueWallet1h: 0,
      uniqueWallet4h: 0,
      uniqueWallet24h: 0,
      holder: 0,
      sell30m: toNum(best?.txns?.m5?.sells),
      buy30m: toNum(best?.txns?.m5?.buys),
      vBuy30mUSD: 0,
      vSell30mUSD: 0,
      sell1h: toNum(best?.txns?.h1?.sells),
      buy1h: toNum(best?.txns?.h1?.buys),
      vBuy1hUSD: 0,
      vSell1hUSD: 0,
      sell4h: 0,
      buy4h: 0,
      vBuy4hUSD: 0,
      vSell4hUSD: 0,
      sell24h: toNum(best?.txns?.h24?.sells),
      buy24h: toNum(best?.txns?.h24?.buys),
      vBuy24hUSD: 0,
      vSell24hUSD: 0,
    };

    return mapped;
  } catch (err) {
    console.error('DexScreener fallback error:', err);
    return null;
  }
}
