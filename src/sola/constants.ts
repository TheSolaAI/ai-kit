export const API_URLS = {
  AUTH: {
    SETTINGS: {
      GET: 'auth/settings/',
      UPDATE: 'auth/settings/update/',
      UPDATE_CREDITS: 'auth/settings/charge_credits/',
    },
    WALLET: 'auth/wallet/',
  },
  CHAT_ROOMS: 'chatrooms/',
  SESSION: 'data/session/create',
  DATA: {
    NFT: {
      SYMBOL: 'data/nft/symbol',
      TOP_NFT: 'data/nft/top',
    },
    XSTOCKS: {
      TOP_XSTOCKS: 'data/xstocks/top_stocks',
    },
  },
  WALLET: {
    LIMIT_ORDER: {
      CREATE: 'api/wallet/jup/limit-order/create',
      SHOW: 'api/wallet/jup/limit-order/show',
    },
    BLOCKHASH: 'api/wallet/blockhash',
    RENT_EXEMPTION: 'api/wallet/rent-exemption',
    STAKE_ACCOUNT: 'api/wallet/stake-accounts',
    LULO: {
      ASSETS: 'api/wallet/lulo/assets',
      DEPOSIT: 'api/wallet/lulo/deposit',
      WITHDRAW: 'api/wallet/lulo/withdraw',
    },
    JUPITER: {
      SWAP: 'api/wallet/jup/swap',
    },
  },
};

export const GOAT_INDEX_API_URL = 'https://loadbalance.goatindex.ai/';

export const tokenList = {
  SOL: {
    MINT: 'So11111111111111111111111111111111111111112',
    DECIMALS: 9,
  },
  USDC: {
    MINT: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    DECIMALS: 6,
  },
  SEND: {
    MINT: 'SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa',
    DECIMALS: 6,
  },
  JUP: {
    MINT: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    DECIMALS: 6,
  },
  USDS: {
    MINT: 'USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA',
    DECIMALS: 6,
  },
  USDT: {
    MINT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    DECIMALS: 6,
  },
  SOLA: {
    MINT: 'B5UsiUYcTD3PcQa8r2uXcVgRmDL8jUYuXPiYjrY7pump',
    DECIMALS: 6,
  },
  BONK: {
    MINT: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    DECIMALS: 6,
  },
  WIF: {
    MINT: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
    DECIMALS: 6,
  },
};
