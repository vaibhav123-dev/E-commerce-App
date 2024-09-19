import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { createContext, useState } from "react";

export const ToggledContext = createContext(null);

function AdminPanel() {
  const [toggled, setToggled] = useState(false);
  const values = { toggled, setToggled };
  return (
    <ToggledContext.Provider value={values}>
      <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            maxWidth: "100%",
          }}
        >
          <Navbar />
          <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ToggledContext.Provider>
  );
}

export default AdminPanel;
