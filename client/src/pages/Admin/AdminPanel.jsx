import { Outlet } from "react-router-dom";
import { AdminNavbar } from "./components";
import { Box } from "@mui/material";

const AdminPanel = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminPanel;
