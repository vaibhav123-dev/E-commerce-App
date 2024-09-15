import { Login } from "../pages/Auth/Login";
import { Signup } from "../pages/Auth/Signup";
import { PrivateRoute, PublicLayout } from "../pages/Layout";

const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
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
