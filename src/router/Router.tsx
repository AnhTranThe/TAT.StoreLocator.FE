import { useRoutes } from "react-router-dom";
import HomeContainer from "../pages/Client/HomeContainer/HomeContainer";
import ClientLayout from "../pages/ClientLayout";
import DashboardLayout from "../pages/DashboardLayout";
import Dashboard from "../viewsTemplate";
import NotFoundPage from "../viewsTemplate/error/notFound";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import AuthRoutes from "./routes/AuthRoutes";
import ErrorRoutes from "./routes/ErrorRoutes";
const Router = () => {
  // eslint-disable-next-line no-constant-condition
  const routes = useRoutes([
    AuthRoutes,
    ErrorRoutes,
    {
      path: "/admin",
      element: (
        <AdminPrivateRoute>
          <DashboardLayout />
        </AdminPrivateRoute>
      ),
      children: [
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        },

      ],
    },
    {
      path: "/",
      element: (
        <ClientLayout />
      ),
      children: [
        {
          path: "/",
          element: <HomeContainer />,
        },
      ],
    },
    {
      path: "*",
      children: [{ path: "*", element: <NotFoundPage /> }],
    },
  ]);

  return routes;
};


export default Router;
