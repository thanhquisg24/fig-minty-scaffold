import { Contract, ethers } from "ethers";
import { nft_contract_abi, nft_contract_address } from "../abi/mint-nft-tx/nft-contract-info";

import { useContractFunction } from "@usedapp/core";

const simpleContractAbi = nft_contract_abi;
const simpleContractInterface = new ethers.utils.Interface(simpleContractAbi);

const contract = new Contract(nft_contract_address, simpleContractInterface);
export default function useMintContract() {
  const { state, send } = useContractFunction(contract, "mintNFT", {});
  return { state, send, nft_contract_address };
}
