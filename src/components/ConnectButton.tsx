import { shortenIfAddress, useEthers } from "@usedapp/core";

import Identicon from "./Identicon";

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <button type="button" className="btn-connect-wallet getstarted scrollto d-inline-flex" onClick={handleOpenModal}>
      <Identicon />
      <span className="text-white mx-2">{shortenIfAddress(account)}</span>
    </button>
  ) : (
    <button type="button" onClick={() => handleConnectWallet()} className="btn-connect-wallet getstarted scrollto">
      Connect to a wallet
    </button>
  );
}
