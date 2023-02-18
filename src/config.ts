import { Config, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";

import { FIG_CHAIN_COST as FIG_CHAIN } from "./abi/constants";

export { FIG_CHAIN };

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
