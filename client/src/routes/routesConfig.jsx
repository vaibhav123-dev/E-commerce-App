import { Login } from "../pages/Auth/Login";
import { Signup } from "../pages/Auth/Signup";
import { AppLayout } from "../pages/Layout";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
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
  // {
  //   path: "/",
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: "/tasks",
  //       element: <Tasks />,
  //     },
  //     {
  //       path: "/completed/:status",
  //       element: <Tasks />,
  //     },
  //     {
  //       path: "/todo/:status",
  //       element: <Tasks />,
  //     },
  //     {
  //       path: "/trashed",
  //       element: <Trash />,
  //     },
  //     {
  //       path: "/in progress/:status",
  //       element: <Tasks />,
  //     },
  //     {
  //       path: "/task/:id",
  //       element: <TaskDetails />,
  //     },
  //     {
  //       path: "/team",
  //       element: <Users />,
  //     },
  //   ],
  // },
];

export { routes };
