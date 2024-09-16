import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const NotFound = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <>
      <Box
        bgcolor={theme.palette.alternate.main}
        position={"relative"}
        minHeight={"calc(100vh - 247px)"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={1}
        marginTop={-12}
        paddingTop={12}
      >
        <Container>
          <Grid container>
            <Grid
              item
              container
              alignItems={"center"}
              justifyContent={"center"}
              xs={12}
              md={6}
            >
              <Box>
                <Typography
                  variant="h1"
                  component={"h1"}
                  align={isMd ? "left" : "center"}
                  sx={{ fontWeight: 700 }}
                >
                  404
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.secondary"
                  align={isMd ? "left" : "center"}
                >
                  Oops! Looks like you followed a bad link.
                  <br />
                  If you think this is a problem with us, please tell us
                </Typography>
                <Box
                  marginTop={4}
                  display={"flex"}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <Button variant="contained" color="primary" size="large">
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Back home
                    </Link>
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item container justifyContent={"center"} xs={12} md={6}>
              <Box height={1} width={1} maxWidth={500}>
                <Box
                  component={"img"}
                  src={
                    "https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration6.svg"
                  }
                  width={1}
                  height={1}
                  sx={{
                    filter:
                      theme.palette.mode === "dark"
                        ? "brightness(0.8)"
                        : "none",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
