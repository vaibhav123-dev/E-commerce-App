import { Outlet } from "react-router-dom";
import { AdminNavbar } from "./components";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AdminPanel = () => {
  const { isAdmin } = useSelector((state) => state.user.user);
  const [isbackdrop, setIsbackdrop] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      setTimeout(() => {
        // navigate("/login");
        setIsbackdrop(false);
      }, 2000);
    }
  }, []);

  return (
    <>
      {isAdmin ? (
        <>
          <Typography variant="h5">Checking if you are admin or not</Typography>
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={isbackdrop}
            invisible={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <AdminNavbar />
          <Box component="main">
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};

export default AdminPanel;
