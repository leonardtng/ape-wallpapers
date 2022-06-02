import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";

export const LockscreenOverlayLoadingState: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      height={562}
      width={259}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      sx={{
        backgroundColor: `${theme.palette.background.paper}BB`,
        top: "39px",
        left: "41px",
        borderRadius: "26px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export const PlainImageLoadingState: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      height={604.75}
      width={287.75}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      sx={{
        backgroundColor: `${theme.palette.background.paper}BB`,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
