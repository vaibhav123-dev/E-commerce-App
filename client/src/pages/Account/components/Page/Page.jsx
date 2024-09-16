import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "../../../../components/Container";
import { Link, useLocation } from "react-router-dom";

const pages = [
  {
    id: "general",
    title: "General",
    path: "/profile/general", // Updated path to be absolute
  },
  {
    id: "security",
    title: "Security",
    path: "/profile/security", // Updated path to be absolute
  },
  {
    id: "billing",
    title: "Billing Information",
    path: "/profile/billing", // Updated path to be absolute
  },
];

const Page = ({ children }) => {
  console.log(children);
  console.log("page");
  const theme = useTheme();
  const location = useLocation(); // Get the current path
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname); // Update activeLink based on current path
  }, [location.pathname]);

  return (
    <Box>
      <Box bgcolor={"primary.main"} paddingY={4}>
        <Container>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ color: "common.white" }}
          >
            Account settings
          </Typography>
          <Typography variant="h6" sx={{ color: "common.white" }}>
            Change account information and settings
          </Typography>
        </Container>
      </Box>
      <Container paddingTop={"0 !important"} marginTop={-8}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ boxShadow: 3 }}>
              <List
                disablePadding
                sx={{
                  display: { xs: "inline-flex", md: "flex" },
                  flexDirection: { xs: "row", md: "column" },
                  overflow: "auto",
                  flexWrap: "nowrap",
                  width: "100%",
                  paddingY: { xs: 3, md: 4 },
                  paddingX: { xs: 4, md: 0 },
                }}
              >
                {pages.map((item) => (
                  <ListItem
                    key={item.id}
                    disableGutters
                    sx={{
                      marginRight: { xs: 2, md: 0 },
                      flex: 0,
                      paddingX: { xs: 0, md: 3 },
                      borderLeft: {
                        xs: "none",
                        md: "2px solid transparent",
                      },
                      borderLeftColor: {
                        md:
                          activeLink === item.path
                            ? theme.palette.primary.main
                            : "transparent",
                      },
                    }}
                  >
                    <Link
                      to={item.path}
                      style={{
                        textDecoration: "none",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        noWrap
                        color={
                          activeLink === item.path
                            ? "text.primary"
                            : "text.secondary"
                        }
                      >
                        {item.title}
                      </Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card sx={{ boxShadow: 3, padding: 4 }}>{children}</Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Page;
