import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "../../../../components/Container.jsx";
import Form from "./ProductForm.jsx";

const Product = () => {
  return (
    <>
      <Box
        position={"relative"}
        minHeight={"calc(100vh - 247px)"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={1}
        paddingTop={3}
        marginTop={5}
        marginRight={{ xs: 6, sm: 0 }}
      >
        <Container>
          <Grid container spacing={6}>
            <Grid
              item
              container
              alignItems={"center"}
              justifyContent={"center"}
              xs={12}
              md={11}
            >
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Product;
