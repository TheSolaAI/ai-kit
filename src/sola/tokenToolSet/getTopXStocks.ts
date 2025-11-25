import { z } from 'zod';
import { createToolFactory } from '@/tools';
import { API_URLS, SolaKitToolContext } from '..';
import { ApiClient } from '../apiClient';
import { TopXStocksResponse } from '@/types/xstocks.types';

const getTopXStocksParams = z.object({});

export const getTopXStocksToolFactory = createToolFactory(
  {
    description: 'Retrieves the currently top 10 xstocks.',
    parameters: getTopXStocksParams,
  },
  async (_params, context: SolaKitToolContext) => {
    if (!context.authToken) {
      return {
        success: false,
        error: 'No auth token provided',
        data: undefined,
      };
    }

    try {
      const response = await context.apiClient.get<TopXStocksResponse>(
        API_URLS.DATA.XSTOCKS.TOP_XSTOCKS,
        undefined,
        'data',
        context.authToken
      );

      if (ApiClient.isApiError(response)) {
        return {
          success: false,
          error: 'Failed to fetch top xstocks',
          data: undefined,
        };
      }

      const trendingXStocks = response.data;

      return {
        success: true,
        data: trendingXStocks,
        error: undefined,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Unable to retrieve top xstocks',
        data: undefined,
      };
    }
  }
);
