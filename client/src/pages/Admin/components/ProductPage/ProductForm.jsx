import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as yup from "yup";
import { postRequest } from "../../../../auth/apiRequest";
import { addProducts } from "../../../../redux/slices/productSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "../../../../context";

const validationSchema = yup.object({
  name: yup.string().required("Please enter the product name"),
  description: yup.string(),
  price: yup.number().required("Please specify the price"),
  category: yup.string().required("Please select a category"),
  brand: yup.string(),
  stock: yup.number().required("Please specify the stock"),
  ratings: yup.number().required("Please specify the ratings"),
  numReviews: yup.number().required("Please specify the number of reviews"),
});

const Form = () => {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    ratings: 0,
    numReviews: 0,
    images: [""],
  };

  const dispatch = useDispatch();
  const showSnackbar = useSnackbar();

  const onSubmit = async (data, { resetForm }) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "images") {
        data.images.forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const product = await postRequest("/product/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(addProducts(product?.data));
      showSnackbar("Product added successful", "success");
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
    enableReinitialize: true, // Add this if needed for dynamic initialValues
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          ADD PRODUCT
        </Typography>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          formik.handleSubmit(e); // Call formik submit handler
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Product Name
            </Typography>
            <TextField
              label="Name *"
              variant="outlined"
              name="name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Description
            </Typography>
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Price
            </Typography>
            <TextField
              label="Price *"
              variant="outlined"
              name="price"
              fullWidth
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Category
            </Typography>
            <TextField
              select
              label="Category *"
              variant="outlined"
              name="category"
              fullWidth
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              <MenuItem value="electronics">Electronic</MenuItem>
              <MenuItem value="beauty">Beauty</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="appliances">Appliances</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Brand
            </Typography>
            <TextField
              label="Brand"
              variant="outlined"
              name="brand"
              fullWidth
              value={formik.values.brand}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Stock
            </Typography>
            <TextField
              label="Stock *"
              variant="outlined"
              name="stock"
              type="number"
              fullWidth
              value={formik.values.stock}
              onChange={formik.handleChange}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={formik.touched.stock && formik.errors.stock}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Ratings
            </Typography>
            <TextField
              label="Ratings *"
              variant="outlined"
              name="ratings"
              type="number"
              fullWidth
              value={formik.values.ratings}
              onChange={formik.handleChange}
              error={formik.touched.ratings && Boolean(formik.errors.ratings)}
              helperText={formik.touched.ratings && formik.errors.ratings}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Number of Reviews
            </Typography>
            <TextField
              label="Number of Reviews *"
              variant="outlined"
              name="numReviews"
              type="number"
              fullWidth
              value={formik.values.numReviews}
              onChange={formik.handleChange}
              error={
                formik.touched.numReviews && Boolean(formik.errors.numReviews)
              }
              helperText={formik.touched.numReviews && formik.errors.numReviews}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Images
            </Typography>
            <Box display="flex" alignItems="center" flexDirection="column">
              <Button
                variant="outlined"
                component="label"
                sx={{
                  padding: "10px 15px",
                  width: "100%",
                  borderRadius: 1,
                  borderColor:
                    formik.touched.images && formik.errors.images
                      ? "error.main"
                      : "primary.main",
                  color:
                    formik.touched.images && formik.errors.images
                      ? "error.main"
                      : "text.primary",
                  "&:hover": {
                    borderColor:
                      formik.touched.images && formik.errors.images
                        ? "error.dark"
                        : "primary.dark",
                  },
                }}
              >
                Upload Images
                <input
                  type="file"
                  name="images"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    formik.setFieldValue("images", Array.from(e.target.files));
                  }}
                />
              </Button>
              <Typography
                variant="body2"
                color={
                  formik.touched.images && formik.errors.images
                    ? "error.main"
                    : "text.secondary"
                }
                sx={{ marginTop: 1 }}
              >
                {formik.values.images && formik.values.images.length > 0
                  ? `${formik.values.images.length} file(s) selected`
                  : "No files selected"}
              </Typography>
              {formik.touched.images && formik.errors.images && (
                <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                  {formik.errors.images}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button size={"large"} variant={"contained"} type="submit">
                Add Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
