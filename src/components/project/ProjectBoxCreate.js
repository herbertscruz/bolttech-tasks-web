import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function ProjectBoxCreate({onSubmitProject}) {
  const boxColor = "grey.300";
  
  const boxCreateProject = {
    border: 1,
    borderColor: boxColor,
    backgroundColor: boxColor,
    padding: "2em 5em 2em 5em",
    textAlign: "center",
  };
  
  const validationSchema = yup.object({
    name: yup
      .string("Enter your project name")
      .min(3, "Project name should be of minimum 3 characters length")
      .max(150, "Project name should be of maximum 150 characters length")
      .required("Project name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmitProject,
  });

  return (
    <Grid item xs={4}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ ...boxCreateProject }}>
          <Typography variant="h6">Create a new project</Typography>
          <TextField
            fullWidth
            inputProps={{ style: { backgroundColor: "white" } }}
            label="Project name"
            required
            id="name"
            name="name"
            margin="normal"
            variant="filled"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Create Project
          </Button>
        </Box>
      </form>
    </Grid>
  );
}

export default ProjectBoxCreate;
