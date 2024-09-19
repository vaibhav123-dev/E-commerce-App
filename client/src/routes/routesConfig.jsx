import { Billing, General, Security } from "../pages/Account";
import AdminPanel from "../pages/Admin/AdminPanel";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/SignUp";
import { PrivateRoute, PublicLayout } from "../pages/Layout";
import NotFound from "../pages/NotFound";
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
        path: "/admin",
        element: <AdminPanel />,
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
];

export { routes };
