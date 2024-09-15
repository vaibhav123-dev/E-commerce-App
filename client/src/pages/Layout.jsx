import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
