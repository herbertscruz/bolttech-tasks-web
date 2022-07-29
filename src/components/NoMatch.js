import { Box, Typography } from "@mui/material";

function NoMatch() {
  return (
    <div>
      <Box
        sx={{
          my: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">There's nothing here!</Typography>
      </Box>
    </div>
  );
}

export default NoMatch;
