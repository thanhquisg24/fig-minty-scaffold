import ErrorPage from "../view/error";
import HomeView from "../view/home";
import { NotFoundView } from "../view/404";

// project imports

const MainRoutes = [
  {
    path: "/",
    index: true,
    element: <HomeView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/404",
    element: <NotFoundView />,
    errorElement: <ErrorPage />,
  },
];

export default MainRoutes;
