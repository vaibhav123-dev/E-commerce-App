import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/SignUp";
import { PrivateRoute, PublicLayout } from "../pages/Layout";
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
      },
      {
        path: "/login",
        element: <Login />,
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
