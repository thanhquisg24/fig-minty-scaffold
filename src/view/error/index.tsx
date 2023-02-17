import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">{error.status || "500"}</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> Sorry, an unexpected error has occurred.
        </p>
        <p className="lead">{error.statusText || error.message}</p>
      </div>
    </div>
  );
}
