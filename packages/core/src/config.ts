export type Network = "mainnet" | "testnet";

export interface NetworkConfig {
  network: Network;
  api: string;
  price: string;
  stat: string;
  wsPrice: string;
  wsUser: string;
  app: string;
  cardanoNetworkId: 0 | 1;
  cardanoAddressPrefix: "addr" | "addr_test";
}

export const NETWORKS: Record<Network, NetworkConfig> = {
  mainnet: {
    network: "mainnet",
    api: "https://api.strikefinance.org",
    price: "https://api.strikefinance.org/price",
    stat: "https://api.strikefinance.org/stat",
    wsPrice: "wss://api.strikefinance.org/ws/price",
    wsUser: "wss://api.strikefinance.org/ws/user-api",
    app: "https://app.strikefinance.org",
    cardanoNetworkId: 1,
    cardanoAddressPrefix: "addr",
  },
  testnet: {
    network: "testnet",
    api: "https://api-v2-testnet.strikefinance.org",
    price: "https://api-v2-testnet.strikefinance.org/price",
    stat: "https://api-v2-testnet.strikefinance.org/stat",
    wsPrice: "wss://api-v2-testnet.strikefinance.org/ws/price",
    wsUser: "wss://api-v2-testnet.strikefinance.org/ws/user-api",
    app: "https://testnet.strikefinance.org",
    cardanoNetworkId: 0,
    cardanoAddressPrefix: "addr_test",
  },
};

export const NEW_ACCOUNT_MIN_DEPOSIT_USD = 100;
export const BUILDER_REGISTRATION_MIN_USD = 100;
export const MIN_DEPOSIT_USD = 5;
export const MAX_BUILDER_FEE_BPS = 100;
