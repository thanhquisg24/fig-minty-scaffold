import { Chain, Config, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";

export const FIG_CHAIN: Chain = {
  chainId: 9999,
  chainName: "FIG Chain",
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: "0x989A8abf0393a63c29A5eA24e3Dc8278A95557D8",
  getExplorerAddressLink: (address: string) => `https://agnek.figchain.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://agnek.figchain.org/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: "https://rpc-agnek.figchain.org",
  blockExplorerUrl: "https://agnek.figchain.org",
  nativeCurrency: {
    name: "FIG",
    symbol: "FIG",
    decimals: 18,
  },
};

const configCustomChain: Config = {
  readOnlyChainId: FIG_CHAIN.chainId,
  readOnlyUrls: {
    [FIG_CHAIN.chainId]: "https://rpc-agnek.figchain.org",
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, FIG_CHAIN],
};

// IMPORTANT: Fill that object with your own data.

const config = {
  basename: "/",
  defaultPath: "/",
  DEFAULT_TOKEN_ID: 1,
  chainConfig: configCustomChain,
};

export default config;
