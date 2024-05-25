import { useRoutes } from "react-router-dom";
import HomeContainer from "../pages/Client/HomeContainer/HomeContainer";
import ManagementBox from "../pages/Client/ManagerBox/ManagerBox";
import ProfileManage from "../pages/Client/ProfileManage/ProfileManage";
import ReviewBox from "../pages/Client/ReviewBox/ReviewBox";
import SearchBox from "../pages/Client/SearchBox/SearchBox";
import WishlistBox from "../pages/Client/WishlistBox/WishlistBox";
import ClientLayout from "../pages/ClientLayout";
import CategoryAdmin from '../pages/Dashboard/Category/CategoryAdmin';
import GalleryAdmin from "../pages/Dashboard/Gallery/GalleryAdmin";
import ProductAdmin from "../pages/Dashboard/Product/ProductAdmin";
import ReviewAdmin from "../pages/Dashboard/Review/ReviewAdmin";
import StoreAdmin from "../pages/Dashboard/Store/StoreAdmin";
import UserAdmin from "../pages/Dashboard/User/UserAdmin";
import WishlistAdmin from "../pages/Dashboard/Wishlist/WishlistAdmin";
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
        {
          path: "/admin/store",
          element: <StoreAdmin />,
        },
        {
          path: "/admin/product",
          element: <ProductAdmin />,
        },
        {
          path: "/admin/category",
          element: <CategoryAdmin />,
        },
        {
          path: "/admin/wishlist",
          element: <WishlistAdmin />,
        },
        {
          path: "/admin/review",
          element: <ReviewAdmin />,
        },
        {
          path: "/admin/user",
          element: <UserAdmin />,
        },
        {
          path: "/admin/gallery",
          element: <GalleryAdmin />,
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
