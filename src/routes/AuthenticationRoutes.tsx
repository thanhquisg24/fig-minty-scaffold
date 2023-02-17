// ==============================|| AUTHENTICATION ROUTING ||============================== //

import ErrorPage from "../view/error";
import LoginView from "../view/login";
import SampleView from "../view/sample";

const AuthenticationRoutes = [
  {
    path: "login",
    element: <LoginView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "sample",
    element: <SampleView />,
    errorElement: <ErrorPage />,
  },
];

export default AuthenticationRoutes;
