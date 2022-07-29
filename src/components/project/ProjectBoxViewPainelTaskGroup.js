import {
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import NextPlanIcon from "@mui/icons-material/NextPlan";

function ProjectBoxViewPainelTaskGroup({
  group,
  tasks = [],
  onMoveTask,
  onDeleteTask,
}) {
  return (
    <Grid item xs={12}>
      <Typography variant="h6">{group}</Typography>
      {tasks.map((task) => {
        return (
          <Grid container paddingLeft={2} key={task.id}>
            <Grid item xs={10}>
              <FormControlLabel
                control={<Checkbox />}
                label={task.description}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="next" onClick={() => onMoveTask(task)}>
                <NextPlanIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="delete" onClick={() => onDeleteTask(task)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProjectBoxViewPainelTaskGroup;
