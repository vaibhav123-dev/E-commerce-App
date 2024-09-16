import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Page from "../components/Page";
import { postRequest } from "../../../auth/apiRequest";
import { useSnackbar } from "../../../context";

const validationSchema = yup.object({
  currentPassword: yup.string().required("Please specify your password"),
  newPassword: yup
    .string()
    .required("Please specify your password")
    .min(8, "The password should have at minimum length of 8"),
  repeatPassword: yup
    .string()
    .required("Please specify your password")
    .min(8, "The password should have at minimum length of 8"),
});

const Security = () => {
  const showSnackbar = useSnackbar();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  const onSubmit = async (data, { resetForm }) => {
    if (data?.newPassword != data?.repeatPassword) {
      showSnackbar("Password does not match", "error");
      return;
    }
    try {
      const user = await postRequest("user/update-password", data);
      if (user) {
        showSnackbar("Password updated successfully", "success");
        resetForm();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showSnackbar("Failed to update password", "error");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <>
      <Page>
        <Box>
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <Typography variant="h6" fontWeight={700}>
              Change your password
            </Typography>
          </Box>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  variant={"subtitle2"}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Current password
                </Typography>
                <TextField
                  variant="outlined"
                  name={"currentPassword"}
                  type={"password"}
                  fullWidth
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.currentPassword &&
                    Boolean(formik.errors.currentPassword)
                  }
                  helperText={
                    formik.touched.currentPassword &&
                    formik.errors.currentPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={"subtitle2"}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  New password
                </Typography>
                <TextField
                  variant="outlined"
                  name={"newPassword"}
                  type={"password"}
                  fullWidth
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  helperText={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={"subtitle2"}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Repeat password
                </Typography>
                <TextField
                  variant="outlined"
                  name={"repeatPassword"}
                  type={"password"}
                  fullWidth
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.repeatPassword &&
                    Boolean(formik.errors.repeatPassword)
                  }
                  helperText={
                    formik.touched.repeatPassword &&
                    formik.errors.repeatPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "stretched", sm: "center" }}
                  justifyContent={"space-between"}
                  width={1}
                  margin={"0 auto"}
                >
                  <Button size={"large"} variant={"contained"} type={"submit"}>
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Page>
    </>
  );
};

export default Security;
