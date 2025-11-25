export interface TopXStocksResponse {
  data: XstockDataResponse[];
}

export interface XstockDataResponse {
  symbol: string;
  name: string;
  solana_address: string;
  image: string;
  market_cap: number;
  volume_24hr: number;
  price: number;
  price_change_24hr: number;
  liquidity: number;
}
