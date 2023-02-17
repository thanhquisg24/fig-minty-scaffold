import AccountModal from "@components/AccountModal";
import ConnectButton from "@components/ConnectButton";
import { useState } from "react";

export default function ConnectWalletContainer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const onHandleOpen = () => {
    setShow(true);
  };
  return (
    <>
      <ConnectButton handleOpenModal={onHandleOpen} />
      <AccountModal isOpen={show} onClose={handleClose} />
    </>
  );
}
