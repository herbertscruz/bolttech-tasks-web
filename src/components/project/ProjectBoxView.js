import { Grid } from "@mui/material";
import React from "react";
import ProjectBoxViewPainel from "./ProjectBoxViewPainel";
import ProjectBoxViewTitle from "./ProjectBoxViewTitle";

function ProjectBoxView({
  boxColor,
  project,
  onEditProject,
  onDeleteProject,
  onSubmitTask,
  onChangeTask,
  onMoveTask,
  onDeleteTask,
}) {
  return (
    <Grid item xs={4}>
      <ProjectBoxViewTitle
        boxColor={boxColor}
        project={project}
        onEditProject={onEditProject}
        onDeleteProject={onDeleteProject}
      />
      <ProjectBoxViewPainel
        boxColor={boxColor}
        project={project}
        onSubmitTask={onSubmitTask}
        onChangeTask={onChangeTask}
        onMoveTask={onMoveTask}
        onDeleteTask={onDeleteTask}
      />
    </Grid>
  );
}

export default ProjectBoxView;
