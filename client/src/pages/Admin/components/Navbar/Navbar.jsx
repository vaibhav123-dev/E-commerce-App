import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Hidden,
  CssBaseline,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { Link } from "react-router-dom";
import ThemeModeToggler from "./../../../../components/ThemeModeToggler";
import AdbIcon from "@mui/icons-material/Adb";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  {
    name: "Products",
    path: "/admin/products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  { name: "Orders", path: "/admin/orders", icon: <PlaylistAddCheckIcon /> },
  { name: "Statistics", path: "/admin/statistics", icon: <QueryStatsIcon /> },
  { name: "Users", path: "/admin/users", icon: <PeopleAltIcon /> },
];

const drawerWidth = 250;

function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const mode = theme.palette.mode;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100vh", // Ensure it takes full height of the screen
        overflowY: "auto", // Enable vertical scrolling
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo and Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          marginLeft: "50px",
        }}
      >
        <AdbIcon
          sx={{
            display: { xs: "block", md: "flex" },
            mr: 1,
            color: mode === "dark" ? theme.palette.text.primary : "black",
          }}
        />
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: mode === "dark" ? theme.palette.text.primary : "black",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: mode === "dark" ? theme.palette.text.primary : "black",
            }}
          >
            Logo
          </Link>
        </Typography>
      </Box>

      {/* Menu Items */}
      <List>
        {menuItems.map(({ name, path, icon }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton component={Link} to={path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:
            mode === "dark" ? theme.palette.background.default : "white",
          color: mode === "dark" ? theme.palette.text.primary : "black",
        }}
      >
        <Toolbar>
          {/* Menu button for mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>

          {/* Spacer to push the ThemeModeToggler to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Theme Mode Toggler */}
          <Box>
            <ThemeModeToggler />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile.
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                height: "100vh", // Full height for mobile drawer
                overflowY: "auto", // Enable vertical scrolling
              },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        {/* Permanent Drawer for larger screens */}
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      ></Box>
    </Box>
  );
}

export default AdminNavbar;
