import { Box, Typography } from "@mui/material";

function Home() {
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
        <Typography variant="h4">Bolttech Tasks</Typography>
        <p>Welcome to Bolttech's multi-user task management web app.</p>
        <img src="/101-512.webp" alt="Task List" width="200" />
      </Box>
    </div>
  );
}

export default Home;
