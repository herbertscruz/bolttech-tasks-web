import { Box, Typography, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProjectBoxViewTitle({
  boxColor,
  project,
  onEditProject,
  onDeleteProject,
}) {
  const boxTitleCommonStyles = {
    border: 1,
    borderColor: boxColor,
    backgroundColor: boxColor,
    padding: "0.7em",
  };

  return (
    <Box sx={{ ...boxTitleCommonStyles }}>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h6">{project.name}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="edit" onClick={() => onEditProject(project)}>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="delete" onClick={() => onDeleteProject(project)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectBoxViewTitle;
