import React from "react";
import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
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
          <Typography variant="h5" sx={{ ml: 2 }}>
            Ape Lockscreens
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            Created by{" "}
            <Link
              color="secondary"
              href="https://twitter.com/Brainy8469"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Brainy8469
            </Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
