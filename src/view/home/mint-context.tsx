/* eslint-disable @typescript-eslint/no-empty-function */

import React, { useEffect } from "react";
import { notifyMessageError, notifyMessageSuccess } from "../../emiter/AppEmitter";
import { pinFileToIPFS, pinJsonMetadata } from "../../pinata-pin-file";

import { useEthers } from "@usedapp/core";
import useMintContract from "@hooks/useMintContract";

interface IImageEx extends File {
  preview: string;
  name: string;
}
interface IState {
  name: string;
  description: string;
  imageBlob: IImageEx[];
  isLoading: boolean;
}
interface IResultSubmit {
  CID: string | null;
  contractAddress: string;
  tx: string | null | undefined;
}
interface IMintNftRowContextValues extends IState {
  doReloadData(): void;
  validateStateInput(): boolean;
  setValueState(value: Partial<IState>): void;
  doSubmitNft: () => Promise<void>;
  resultSubmit: IResultSubmit;
}

const defaultValuesContext = {
  doSubmitNft: () => {
    return Promise.reject();
  },
  doReloadData: () => {},
  setValueState: () => {},
  validateStateInput: () => {
    return false;
  },
  name: "",
  description: "",
  imageBlob: [],
  isLoading: false,
  resultSubmit: { CID: null, contractAddress: "", tx: null },
};
export const MintNftContext = React.createContext<IMintNftRowContextValues>(defaultValuesContext);

export const useMintNftContext = (): IMintNftRowContextValues => {
  const context = React.useContext(MintNftContext);
  return { ...context };
};

export const MintNftContextProvider = (props: {
  children: JSX.Element | JSX.Element[] | string | string[] | undefined | any;
  doReloadData(): void;
}): JSX.Element => {
  const { children, doReloadData } = props;
  const { state: contractState, send: sendTxContract, nft_contract_address } = useMintContract();
  const { account, library } = useEthers();
  const [state, setState] = React.useState<IState>({
    name: "",
    description: "",
    imageBlob: [],
    isLoading: false,
  });
  const [resultSubmit, setResultSubmit] = React.useState<IResultSubmit>({
    CID: null,
    contractAddress: "",
    tx: null,
  });
  const setValueState = (value: Partial<IState>): void => {
    setState({ ...state, ...value });
  };
  const startLoading = () => {
    setState({ ...state, isLoading: true });
  };
  const stopLoading = () => {
    setState({ ...state, isLoading: false });
  };

  const validateStateInput = (): boolean => {
    if (state.name.trim().length === 0) {
      notifyMessageError("Please input Name!");
      return false;
    }
    if (state.description.trim().length === 0) {
      notifyMessageError("Please input Description!");
      return false;
    }
    if (state.imageBlob.length === 0) {
      notifyMessageError("Please select/upload Image!");
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (contractState.status === "Success") {
      setState({ name: "", description: "", imageBlob: [], isLoading: false });
      if (contractState.receipt) {
        notifyMessageSuccess(contractState.receipt.transactionHash);
        setResultSubmit({ ...resultSubmit, tx: contractState.receipt.transactionHash });
      }
    } else if (contractState.status === "Fail" || contractState.status === "Exception") {
      stopLoading();
      notifyMessageError("Mint Nft Error Please try again!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractState]);
  const doSubmitNft = async (): Promise<void> => {
    const { name, description, imageBlob } = state;
    if (account && library) {
      startLoading();
      //1.Upload image
      const resultImageUpload = await pinFileToIPFS(imageBlob[0], name);
      //2.Upload metadata json
      const resultMetadata = await pinJsonMetadata({
        name,
        description,
        image: resultImageUpload.IpfsHash,
      });
      setResultSubmit({ CID: resultImageUpload.IpfsHash, contractAddress: nft_contract_address, tx: null });
      //3.Create and sign TX to onchain
      await sendTxContract(account, `ipfs://${resultMetadata.IpfsHash}`);
    }
  };

  return (
    <MintNftContext.Provider
      value={{ doSubmitNft, validateStateInput, setValueState, doReloadData, ...state, resultSubmit }}
    >
      {children}
    </MintNftContext.Provider>
  );
};
