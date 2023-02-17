import AuthenticationRoutes from "./AuthenticationRoutes";
import HandleNotFoundRoutes from "./HandleNotFoundRoute";
import MainRoutes from "./MainRoutes";
import { useRoutes } from "react-router-dom";

// export const routerConfig = createBrowserRouter([...AuthenticationRoutes, ...MainRoutes], {
//   basename: config.basename,
// });

export default function ThemeRoutes() {
  return useRoutes([...MainRoutes, ...AuthenticationRoutes, ...HandleNotFoundRoutes]);
}
