import React from "react";
import {
  AppBar,
  Box,
  Hidden,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import ApeLogo from "../../assets/ape-logo.svg";
import { PhoneIphoneRounded } from "@mui/icons-material";

const NavBar: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: `0 0 20px ${theme.palette.primary.main}`,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={ApeLogo} alt="Ape" height="26px" />
          <PhoneIphoneRounded sx={{ height: "32px", ml: 1 }} />
          <Hidden mdDown>
            <Typography variant="h5" sx={{ ml: 1 }}>
              Ape Wallpapers
            </Typography>
          </Hidden>
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
