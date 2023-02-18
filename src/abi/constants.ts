export const FIG_CHAIN_COST = {
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
