import React, { ReactNode } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
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
          <Typography variant="h5" component="div">
            Metaler
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 5 }}>{children}</Box>
    </Box>
  );
};
