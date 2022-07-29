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
import { last } from "lodash";

function ProjectBoxViewPainelTaskGroup({
  group,
  tasks = [],
  onChangeTask,
  onMoveTask,
  onDeleteTask,
}) {
  const pipe = process.env?.REACT_APP_PIPE?.split(",");

  const handlerChange = (event, task) => {
    onChangeTask({ ...task, marked: event?.target?.checked });
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h6">{group}</Typography>
      {tasks.length === 0 && (
        <Grid container paddingLeft={2}>
          <Grid item xs={10}>
              <p>---</p>
          </Grid>
        </Grid>
      )}
      {tasks.map((task) => {
        return (
          <Grid container paddingLeft={2} key={task.id}>
            <Grid item xs={10}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.marked ?? false}
                    onChange={(event) => handlerChange(event, task)}
                  />
                }
                label={task.description}
              />
            </Grid>
            <Grid item xs={1}>
              {task.status !== last(pipe) && (
                <IconButton aria-label="next" onClick={() => onMoveTask(task)}>
                  <NextPlanIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={1}>
              {task.status !== last(pipe) && (
                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteTask(task)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProjectBoxViewPainelTaskGroup;
