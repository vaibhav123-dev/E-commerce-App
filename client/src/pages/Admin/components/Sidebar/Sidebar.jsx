import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import AdbIcon from "@mui/icons-material/Adb";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  DashboardOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  ReceiptOutlined,
  TimelineOutlined,
  WavesOutlined,
} from "@mui/icons-material";
import Item from "./items";
import { ToggledContext } from "../../AdminPanel";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Sidebar
      backgroundColor={
        mode === "dark" ? theme.palette.background.default : "white"
      }
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: mode === "dark" ? theme.palette.text.primary : "black",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
                <AdbIcon
                  sx={{
                    display: { xs: "none", md: "flex" },
                    mr: 1,
                    color:
                      mode === "dark" ? theme.palette.text.primary : "black",
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
                    color:
                      mode === "dark" ? theme.palette.text.primary : "black",
                  }}
                >
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color:
                        mode === "dark" ? theme.palette.text.primary : "black",
                    }}
                  >
                    Logo
                  </Link>
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: mode === "dark" ? "#868dfb" : "black",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item title="Dashboard" path="/" icon={<DashboardOutlined />} />
        </Menu>
        <Typography
          variant="h6"
          color={mode === "dark" ? theme.palette.text.secondary : "gray"}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Data" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: mode === "dark" ? "#868dfb" : "black",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item title="Manage Team" path="/team" icon={<PeopleAltOutlined />} />
          <Item
            title="Contacts Information"
            path="/contacts"
            icon={<ContactsOutlined />}
          />
          <Item
            title="Invoices Balances"
            path="/invoices"
            icon={<ReceiptOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={mode === "dark" ? theme.palette.text.secondary : "gray"}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Pages" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: mode === "dark" ? "#868dfb" : "black",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item title="Profile Form" path="/form" icon={<PersonOutlined />} />
          <Item
            title="Calendar"
            path="/calendar"
            icon={<CalendarTodayOutlined />}
          />
          <Item title="FAQ Page" path="/faq" icon={<HelpOutlineOutlined />} />
        </Menu>
        <Typography
          variant="h6"
          color={mode === "dark" ? theme.palette.text.secondary : "gray"}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Charts" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: mode === "dark" ? "#868dfb" : "black",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item title="Bar Chart" path="/bar" icon={<BarChartOutlined />} />
          <Item title="Pie Chart" path="/pie" icon={<DonutLargeOutlined />} />
          <Item title="Line Chart" path="/line" icon={<TimelineOutlined />} />
          <Item
            title="Geography Chart"
            path="/geography"
            icon={<MapOutlined />}
          />
          <Item title="Stream Chart" path="/stream" icon={<WavesOutlined />} />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
