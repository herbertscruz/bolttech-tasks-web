import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./login/AuthProvider";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navigation() {
  const { token, onLogout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={NavLink} to="/">
              {" "}
              Bolttech
            </Button>
          </Typography>
          {!token && (
            <div>
              <Button component={NavLink} to="/signin" color="inherit">
                Sign In
              </Button>
              <Button component={NavLink} to="/signup" color="inherit">
                Sign Up
              </Button>
            </div>
          )}
          {token && (
            <div>
              <Button component={NavLink} to="/dashboard" color="inherit">
                Dashboard
              </Button>
              <Button component={NavLink} to="/account" color="inherit">
                Account
              </Button>
              <Button color="inherit" onClick={onLogout}>
                Sign Out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;
