import { Billing, General, Security } from "../pages/Account";
import AdminLayout from "../pages/Admin/AdminPanel";
import { Product } from "../pages/Admin/components";
import Dashboard from "../pages/Admin/components/Dashboard";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/SignUp";
import { PrivateRoute, PublicLayout } from "../pages/Layout";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products/Products";
import Home from "./../pages/Home/Home";

const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Signup />,
        errorElement: <NotFound />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <NotFound />,
      },
      {
        path: "/products/fashion",
        element: <Products />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/profile/general",
        element: <General />,
      },
      {
        path: "/profile/security",
        element: <Security />,
      },
      {
        path: "/profile/billing",
        element: <Billing />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
        errorElement: <NotFound />,
      },
      {
        path: "/admin/products",
        element: <Product />,
        errorElement: <NotFound />,
      },
      // {
      //   path: "/admin/products",
      //   element: <Product />,
      //   errorElement: <NotFound />,
      // },
      // {
      //   path: "/admin/products",
      //   element: <Product />,
      //   errorElement: <NotFound />,
      // },
    ],
  },
];

export { routes };
