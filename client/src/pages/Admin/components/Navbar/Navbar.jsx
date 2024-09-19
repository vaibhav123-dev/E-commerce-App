import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

const Navbar = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      sx={{
        backgroundColor:
          mode === "dark" ? theme.palette.background.default : "white",
        color: mode === "dark" ? theme.palette.text.primary : "black",
      }}
    >
      {/* Left Side: Menu Icon and Search */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Menu Icon for small devices */}
        <IconButton
          sx={{
            display: { xs: "flex", md: "none" },
            color: mode === "dark" ? theme.palette.text.primary : "black",
          }}
        >
          <MenuOutlined />
        </IconButton>

        {/* Search Bar: Hidden for extra small devices */}
        <Box
          display="flex"
          alignItems="center"
          bgcolor={
            mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[300]
          }
          borderRadius="3px"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchOutlined />
          </IconButton>
        </Box>
      </Box>

      {/* Right Side: Icons for Dark Mode, Notifications, Settings, Profile */}
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton>
          {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton>
          <PersonOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
