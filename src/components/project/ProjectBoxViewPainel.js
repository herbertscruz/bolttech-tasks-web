import { Box, Grid } from "@mui/material";
import React from "react";
import ProjectBoxViewPainelTaskGroup from "./ProjectBoxViewPainelTaskGroup";
import ProjectBoxViewPainelTaskForm from "./ProjectBoxViewPainelTaskForm";
import { groupBy, upperCase, set } from "lodash";

function ProjectBoxViewPainel({
  boxColor,
  project,
  onSubmitTask,
  onMoveTask,
  onDeleteTask,
}) {
  const boxPanelCommonStyles = {
    border: 1,
    borderColor: boxColor,
    padding: "0em 0.7em 0em 0.7em",
  };

  const groups = groupBy(project?.tasks, (task) => task.status);

  const handleSubmitTask = (task, options) => {
    set(task, 'projectId', project.id);
    onSubmitTask(task, options);
  };
  
  return (
    <Box sx={{ ...boxPanelCommonStyles }}>
      <Grid container spacing={1} padding={1}>
        {Object.keys(groups).map((prop) => {
          return (
            <ProjectBoxViewPainelTaskGroup key={prop}
              group={upperCase(prop)}
              tasks={groups[prop]}
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
