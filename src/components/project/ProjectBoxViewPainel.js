import { Box, Grid } from "@mui/material";
import React from "react";
import ProjectBoxViewPainelTaskGroup from "./ProjectBoxViewPainelTaskGroup";
import ProjectBoxViewPainelTaskForm from "./ProjectBoxViewPainelTaskForm";
import { groupBy, upperCase } from "lodash";

function ProjectBoxViewPainel({
  boxColor,
  project,
  onSubmitTask,
  onChangeTask,
  onMoveTask,
  onDeleteTask,
}) {
  const boxPanelCommonStyles = {
    border: 1,
    borderColor: boxColor,
    padding: "0em 0.7em 0em 0.7em",
  };

  const pipe = process.env?.REACT_APP_PIPE?.split(",");

  const groups = groupBy(project?.tasks, (task) => task.status);

  const handleSubmitTask = (task, options) => {
    onSubmitTask({ ...task, projectId: project.id }, options);
  };

  return (
    <Box sx={{ ...boxPanelCommonStyles }}>
      <Grid container spacing={1} padding={1}>
        {pipe.map((prop) => {
          return (
            <ProjectBoxViewPainelTaskGroup
              key={prop}
              group={upperCase(prop)}
              tasks={groups[prop] ?? []}
              onChangeTask={onChangeTask}
              onMoveTask={onMoveTask}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
      </Grid>
      <ProjectBoxViewPainelTaskForm onSubmitTask={handleSubmitTask} />
    </Box>
  );
}

export default ProjectBoxViewPainel;
