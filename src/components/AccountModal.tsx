import { Button, Modal } from "react-bootstrap";
import { shortenIfAddress, useEthers } from "@usedapp/core";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { FIG_CHAIN } from "../config";
import Identicon from "./Identicon";

// import { formatUnits } from "ethers/lib/utils";

type Props = {
  isOpen: any;
  onClose: any;
};
// const FIG_ADDRESS = "0x3AA56A9c28b77223709d040e32B74694f6381847";

export default function AccountModal({ isOpen, onClose }: Props) {
  const { account, deactivate } = useEthers();
  // const daiBalance = useTokenBalance(FIG_ADDRESS, account);

  function handleDeactivateAccount() {
    deactivate();
    onClose();
  }
  const viewExplorer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (account) {
      const url = FIG_CHAIN.getExplorerAddressLink(account);
      window.open(url, "_blank");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Account</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex justify-content-between">
          <b>Connected with MetaMask</b>
          <Button variant="outline-danger" size="sm" onClick={() => handleDeactivateAccount()}>
            <i className="fa-solid fa-power-off"></i> Disconnect wallet
          </Button>
        </div>

        <div className="d-flex flex-row p-2">
          <Identicon />
          <span className="ms-2">{shortenIfAddress(account)}</span>
          {/* {daiBalance && <p>FIG balance:{formatUnits(daiBalance, 18)} </p>} */}
        </div>

        <div className="d-flex flex-row p-2">
          <CopyToClipboard text={account || ""}>
            <Button variant="link">
              <i className="fa-solid fa-copy fa-lg"></i> Copy Address
            </Button>
          </CopyToClipboard>
          <Button variant="link" onClick={(e) => viewExplorer(e)}>
            <i className="fa-solid fa-arrow-up-right-from-square fa-lg"></i> View on Explorer
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
