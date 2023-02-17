import ErrorPage from "../view/error";
import HomeView from "../view/home";
import { NotFoundView } from "../view/404";
import RequireAuth from "./RequireAuth";

// project imports

const MainRoutes = [
  {
    path: "/",
    index: true,
    element: (
      <RequireAuth>
        <HomeView />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/404",
    element: <NotFoundView />,
    errorElement: <ErrorPage />,
  },
];

export default MainRoutes;
