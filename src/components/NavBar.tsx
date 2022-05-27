import React from "react";
import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import Ape from "../assets/ape.svg";

const NavBar: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 20px ${theme.palette.primary.main}`,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={Ape} alt="Ape" height="32" />
          <Typography variant="h5" sx={{ marginLeft: 2 }}>
            Ape Lockscreens
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
