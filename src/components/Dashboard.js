import { Grid, Snackbar, Alert } from "@mui/material";
import React, { useCallback, useEffect } from "react";
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

function Dashboard() {
  const boxColor = "grey.300";
  const pipe = process.env.REACT_APP_PIPE.split(",");
  const { token, user, onLogout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [severityMessage, setSeverityMessage] = React.useState("error");
  const [projects, setProjects] = React.useState([]);

  const loadProjects = useCallback(() => {
    if (token && user) {
      getProjectsByUser(token?.token, user?.id)
        .then((data) => {
          if (data?.status === 401) {
            delay(() => {
              onLogout();
            }, 6000);
          }
          if (data?.status >= 400) {
            handleClick(process.env.REACT_APP_ERROR_0005, "error");
          } else {
            setProjects(data);
          }
        })
        .catch((err) => handleClick(err.message, "error"));
    }
  }, [token, user, onLogout]);

  useEffect(
    () => loadProjects(token, user, onLogout),
    [loadProjects, token, user, onLogout]
  );

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
    createProject(token.token, values)
      .then((data) => {
        if (data?.status === 401) {
          delay(() => {
            onLogout();
          }, 6000);
        }
        if (data?.status >= 400) {
          handleClick(process.env.REACT_APP_ERROR_0007, "error");
        } else {
          handleClick(process.env.REACT_APP_ERROR_0006, "success");
          resetForm({ values: "" });
          loadProjects(token, user, onLogout);
        }
      })
      .catch((err) => handleClick(err.message, "error"));
  };

  const onEditProject = (project) => {
    handleClick("Under construction, will be available soon", "error");
  };

  const onDeleteProject = ({ id }) => {
    deleteProject(token.token, id)
      .then((data) => {
        if (data?.status === 401) {
          delay(() => {
            onLogout();
          }, 6000);
        }
        if (data?.status >= 400) {
          handleClick(process.env.REACT_APP_ERROR_0008, "error");
        } else {
          handleClick(process.env.REACT_APP_ERROR_0009, "success");
          loadProjects(token, user, onLogout);
        }
      })
      .catch((err) => handleClick(err.message, "error"));
  };

  const onSubmitTask = (task, { resetForm }) => {
    task.status = first(pipe);
    saveTask(token.token, task)
      .then((data) => {
        if (data?.status === 401) {
          delay(() => {
            onLogout();
          }, 6000);
        }
        if (data?.status >= 400) {
          handleClick(process.env.REACT_APP_ERROR_0014, "error");
        } else {
          handleClick(process.env.REACT_APP_ERROR_0015, "success");
          resetForm({ values: "" });
          loadProjects(token, user, onLogout);
        }
      })
      .catch((err) => handleClick(err.message, "error"));
  };

  const onMoveTask = (task) => {
    const idx = pipe.findIndex((step) => step === task.status);
    task.status = pipe[idx + 1];
    saveTask(token.token, task)
      .then((data) => {
        if (data?.status === 401) {
          delay(() => {
            onLogout();
          }, 6000);
        }
        if (data?.status >= 400) {
          handleClick(process.env.REACT_APP_ERROR_0012, "error");
        } else {
          handleClick(process.env.REACT_APP_ERROR_0013, "success");
          loadProjects(token, user, onLogout);
        }
      })
      .catch((err) => handleClick(err.message, "error"));
  };

  const onDeleteTask = ({ id }) => {
    deleteTask(token.token, id)
      .then((data) => {
        if (data?.status === 401) {
          delay(() => {
            onLogout();
          }, 6000);
        }
        if (data?.status >= 400) {
          handleClick(process.env.REACT_APP_ERROR_0010, "error");
        } else {
          handleClick(process.env.REACT_APP_ERROR_0011, "success");
          loadProjects(token, user, onLogout);
        }
      })
      .catch((err) => handleClick(err.message, "error"));
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
