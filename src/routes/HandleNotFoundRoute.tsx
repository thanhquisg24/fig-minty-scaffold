import { Navigate } from "react-router-dom";

const HandleNotFoundRoutes = [
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

export default HandleNotFoundRoutes;
