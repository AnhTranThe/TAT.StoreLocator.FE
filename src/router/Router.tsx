import { useRoutes } from "react-router-dom";
import HomeContainer from "../pages/Client/HomeContainer/HomeContainer";
import ProfileManage from "../pages/Client/ProfileManage/ProfileManage";
import ReviewBox from "../pages/Client/ReviewBox/ReviewBox";
import SearchBox from "../pages/Client/SearchBox/SearchBox";
import WishlistBox from "../pages/Client/WishlistBox/WishlistBox";
import ClientLayout from "../pages/ClientLayout";
import DashboardLayout from "../pages/DashboardLayout";
import Dashboard from "../viewsTemplate";
import NotFoundPage from "../viewsTemplate/error/notFound";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import AuthRoutes from "./routes/AuthRoutes";
import ErrorRoutes from "./routes/ErrorRoutes";
import ManagementBox from "../pages/Client/ManagerBox/ManagerBox";
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
          children: [

            {
              path: "/",
              element: <SearchBox />
            },
            {
              path: "/wishlists/:userId",
              element: <WishlistBox />
            },
            {
              path: "/reviews/:userId",
              element: <ReviewBox />
            },
          ]
        },
        {
          path: "/management/:userId",
          element: <ManagementBox />,
          children: [
            {
              path: "/management/:userId/profile",
              element: <ProfileManage />
            }
          ]
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
