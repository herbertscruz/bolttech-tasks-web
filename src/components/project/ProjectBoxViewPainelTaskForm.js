import { Grid, TextField, Button } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function ProjectBoxViewPainelTaskForm({ onSubmitTask }) {
  const validationSchema = yup.object({
    description: yup
      .string("Enter your task description")
      .min(3, "Task description should be of minimum 3 characters length")
      .max(150, "Task description should be of maximum 150 characters length")
      .required("Task description is required"),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmitTask,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1} padding={1}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Task"
            required
            id="description"
            name="description"
            margin="normal"
            size="small"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ mt: 2, padding: "0.5em" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ProjectBoxViewPainelTaskForm;
