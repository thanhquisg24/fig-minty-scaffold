import React from "react";

interface IMintNftRowContextValues {
  doReloadData(): void;
}

const defaultValuesContext = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  doReloadData: () => {},
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
  const [stateInput, setStateInput] = React.useState();
  const [stateResult, setStateResult] = React.useState();

  return <MintNftContext.Provider value={{ doReloadData }}>{children}</MintNftContext.Provider>;
};
