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
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [{}],
  },
];

export { routes };
