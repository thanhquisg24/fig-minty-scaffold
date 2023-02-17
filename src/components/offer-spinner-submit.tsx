import { Button, Spinner } from "react-bootstrap";

export default function BtnSpinerSubmiting(props: { text: string; className: string; variant: any }): JSX.Element {
  const { text, className, variant } = props;
  return (
    <Button className={className} variant={variant} disabled>
      <Spinner as="span" className="me-2" animation="border" size="sm" role="status" aria-hidden="true" />
      {text}
    </Button>
  );
}
