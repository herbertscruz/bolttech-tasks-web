import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import React from "react";
import { useAuth } from "./login/AuthProvider";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function SignIn() {
  const { onLogin } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);

  const handleClick = (message) => {
    setErrorMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "johnwick@bolttech.com",
      password: "Beloveddog2014",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onLogin(values).catch((err) => handleClick(err.message));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            my: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
          <Typography variant="h4">Sign In</Typography>
          <TextField
            label="Email"
            required
            id="email"
            name="email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            required
            id="password"
            name="password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Link href="#" sx={{ mr: 12, mb: 2 }}>
            Forget password?
          </Link>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </form>
    </div>
  );
}
export default SignIn;
