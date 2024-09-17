import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeModeToggler from "./ThemeModeToggler";
import { useTheme } from "@mui/material/styles";
import { postRequest } from "../auth/apiRequest";
import { clearTokens } from "../auth/localStorage";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { getInitials } from "./../services/index";

const pages = ["Products", "Pricing", "Blog"];
const settings = [
  {
    text: "Edit Profile",
    path: "/profile/general",
    icon: <PersonAddAltIcon sx={{ width: 20, height: 20, color: "blue" }} />,
  },
  {
    text: "Wishlist",
    path: "/register",
    icon: (
      <FavoriteBorderIcon sx={{ width: 20, height: 20, color: "#FF5733" }} />
    ),
  },
  {
    text: "Orders",
    path: "/dashboard",
    icon: (
      <AddShoppingCartIcon sx={{ width: 20, height: 20, color: "orange" }} />
    ),
  },
  {
    text: "Logout",
    path: "/logout",
    icon: <LogoutIcon sx={{ width: 20, height: 20, color: "red" }} />,
  },
];

function ResponsiveAppBar() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { firstName, lastName } = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const initials = getInitials(firstName, lastName);

  const handleLogout = async () => {
    try {
      await postRequest(`/user/logout`);
      navigate("/login");
      clearTokens();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:
          mode === "dark" ? theme.palette.background.default : "white",
        color: mode === "dark" ? theme.palette.text.primary : "black",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: mode === "dark" ? theme.palette.text.primary : "black",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
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

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: mode === "dark" ? theme.palette.text.primary : "black",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color:
                        mode === "dark" ? theme.palette.text.primary : "black",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo and Menu for larger screens */}
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: mode === "dark" ? theme.palette.text.primary : "black",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: mode === "dark" ? theme.palette.text.primary : "black",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: mode === "dark" ? theme.palette.text.primary : "black",
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* User Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={`${firstName} ${lastName}`}
                  sx={{
                    backgroundColor:
                      mode === "dark"
                        ? theme.palette.grey[900]
                        : theme.palette.grey[300],
                    color:
                      mode === "dark" ? theme.palette.text.primary : "black",
                    fontSize: "1.2rem",
                  }}
                >
                  {initials}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.text}
                  onClick={
                    setting.text === "Logout"
                      ? handleLogout
                      : handleCloseUserMenu
                  }
                >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    {setting.icon}
                    <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                      <Link
                        to={setting.path}
                        style={{
                          textDecoration: "none",
                          color:
                            mode === "dark"
                              ? theme.palette.text.primary
                              : "black",
                        }}
                      >
                        {setting.text}
                      </Link>
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Theme Mode Toggler */}
          <Box sx={{ ml: 2 }}>
            <ThemeModeToggler />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
