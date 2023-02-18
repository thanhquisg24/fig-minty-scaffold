import { Button, Form } from "react-bootstrap";

import BtnSpinerSubmiting from "@components/offer-spinner-submit";
import MintResultModal from "./min-result-modal";
import { notifyMessageError } from "@emiter/AppEmitter";
import { useEthers } from "@usedapp/core";
import { useMintNftContext } from "../mint-context";
import { useState } from "react";

export default function MintForm() {
  const { doSubmitNft, setValueState, name, description, isLoading, validateStateInput } = useMintNftContext();
  const { account } = useEthers();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const onHandleOpen = () => {
    if (account === undefined) {
      notifyMessageError("Please connect your wallet!");
      return;
    }
    const isValidForm = validateStateInput();
    if (isValidForm) {
      setShow(true);
      doSubmitNft()
        .then()
        .catch((error) => {
          notifyMessageError(error.message);
        });
    }
  };

  return (
    <div className="box-even">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setValueState({ name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setValueState({ description: e.target.value })}
          />
        </Form.Group>
        {isLoading ? (
          <BtnSpinerSubmiting text="Minting..." className="w-100 mt-4" variant="primary" />
        ) : (
          <Button variant="primary" type="button" className=" w-100 mt-4" onClick={() => onHandleOpen()}>
            Mint
          </Button>
        )}
      </Form>
      <MintResultModal isOpen={show} onClose={handleClose} />
    </div>
  );
}
