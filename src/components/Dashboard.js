import { Grid, Snackbar, Alert } from "@mui/material";
import React from "react";
import ProjectBoxView from "./project/ProjectBoxView";
import ProjectBoxCreate from "./project/ProjectBoxCreate";
import { useAuth } from "./login/AuthProvider";
import { delay, first } from "lodash";
import {
  createProject,
  deleteProject,
  deleteTask,
  getProjectsByUser,
  saveTask,
} from "../services/api";
import useInit from "../useInit";

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [severityMessage, setSeverityMessage] = React.useState("error");
  const [projects, setProjects] = React.useState([]);
  const { token, onLogout } = useAuth();
  const boxColor = "grey.300";
  const pipe = process.env?.REACT_APP_PIPE?.split(",");

  useInit(() => loadProjects());

  const loadProjects = () => {
    getProjectsByUser(token?.token, token?.userId)
      .then((data) => {
        if (data?.status === 401) {
          delay(() => onLogout(), 6000);
        }
        if (data?.status >= 400) {
          handleClick(process.env.REACT_APP_ERROR_0005, "error");
        } else {
          setProjects(data);
        }
      })
      .catch((err) => handleClick(err.message, "error"));
  };

  const responseTreat = (promise, resetForm, errorMessage, successMessage) => {
    promise
      .then((data) => {
        if (data?.status === 401) {
          delay(() => onLogout(), 6000);
        }
        if (data?.status >= 400) {
          handleClick(errorMessage, "error");
        } else {
          handleClick(successMessage, "success");
          if (resetForm) resetForm({ values: "" });
          loadProjects();
        }
      })
      .catch((err) => handleClick(err.message, "error"));
  };

  const handleClick = (message, severity) => {
    setErrorMessage(message);
    setSeverityMessage(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmitProject = (values, { resetForm }) => {
    responseTreat(
      createProject(token.token, values),
      resetForm,
      process.env.REACT_APP_ERROR_0007,
      process.env.REACT_APP_ERROR_0006
    );
  };

  const onEditProject = (project) => {
    handleClick("Under construction, will be available soon", "error");
  };

  const onDeleteProject = ({ id }) => {
    responseTreat(
      deleteProject(token.token, id),
      null,
      process.env.REACT_APP_ERROR_0008,
      process.env.REACT_APP_ERROR_0009
    );
  };

  const onSubmitTask = (task, { resetForm }) => {
    task.status = first(pipe);
    responseTreat(
      saveTask(token.token, task),
      resetForm,
      process.env.REACT_APP_ERROR_0014,
      process.env.REACT_APP_ERROR_0015
    );
  };

  const onChangeTask = (task) => {
    responseTreat(
      saveTask(token.token, task),
      null,
      process.env.REACT_APP_ERROR_0014,
      process.env.REACT_APP_ERROR_0015
    );
  };

  const onMoveTask = (task) => {
    const idx = pipe.findIndex((step) => step === task.status);
    task.status = pipe[idx + 1];
    responseTreat(
      saveTask(token.token, task),
      null,
      process.env.REACT_APP_ERROR_0012,
      process.env.REACT_APP_ERROR_0013
    );
  };

  const onDeleteTask = ({ id }) => {
    responseTreat(
      deleteTask(token.token, id),
      null,
      process.env.REACT_APP_ERROR_0010,
      process.env.REACT_APP_ERROR_0011
    );
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={severityMessage}
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Grid container spacing={2} padding={2}>
        {projects.map((project) => {
          return (
            <ProjectBoxView
              key={project.id}
              boxColor={boxColor}
              project={project}
              onEditProject={onEditProject}
              onDeleteProject={onDeleteProject}
              onSubmitTask={onSubmitTask}
              onChangeTask={onChangeTask}
              onMoveTask={onMoveTask}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
        <ProjectBoxCreate onSubmitProject={onSubmitProject} />
      </Grid>
    </div>
  );
}

export default Dashboard;
