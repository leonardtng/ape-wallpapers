import React, { useEffect, useState } from "react";
import { keyframes } from "@mui/styled-engine";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

const ellipsis = keyframes`
  to {
    width: 12px;
  }
`;

interface Props {
  type: "overlay" | "plain";
}

const ImageLoadingState: React.FC<Props> = ({ type }: Props) => {
  const theme = useTheme();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 1 : prevProgress
      );
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      height={type === "overlay" ? 562 : 604.75}
      width={type === "overlay" ? 259 : 287.75}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      sx={{
        backgroundColor: `${theme.palette.background.paper}BB`,
        ...(type === "overlay" && {
          top: "39px",
          left: "41px",
          borderRadius: "26px",
        }),
      }}
    >
      <Box position="relative" display="inline-flex" marginBottom={1}>
        <CircularProgress variant="determinate" value={progress} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
      <Box width="100%">
        <Typography
          variant="body1"
          sx={{
            ml: type === "overlay" ? "34px" : "48px",
            ":after": {
              overflow: "hidden",
              display: "inline-block",
              verticalAlign: "bottom",
              animation: `${ellipsis} steps(4,end) 1200ms infinite`,
              content: '"..."',
              width: 0,
            },
          }}
        >
          {progress === 100 ? (
            <span style={{ marginLeft: "8px" }}>Wallpaper Almost Ready</span>
          ) : progress <= 60 ? (
            <span style={{ marginLeft: "5px" }}>Fetching Image From IPFS</span>
          ) : (
            <span>Generating Your Wallpaper</span>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageLoadingState;
