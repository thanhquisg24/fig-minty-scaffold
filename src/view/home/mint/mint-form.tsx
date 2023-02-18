import { Button, Form } from "react-bootstrap";

export default function MintForm() {
  return (
    <div className="box-even">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
          <Form.Control type="text" size="lg" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
          <Form.Control type="text" size="lg" placeholder="Enter Description" />
        </Form.Group>

        <Button variant="primary" type="submit" className=" w-100 mt-4">
          Mint
        </Button>
      </Form>
    </div>
  );
}
