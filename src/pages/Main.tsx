import React, { useEffect } from "react";
import { Box, Card, useTheme } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { fetchBaycMetadata } from "../features/baycMetadataSlice";
import NavBar from "../components/NavBar";
import TabSelect from "../components/TabSelect";
import GeneratedImage from "../components/GeneratedImage";

const Main: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBaycMetadata());
  }, [dispatch]);

  return (
    <Box
      height="calc(100vh - 64px)"
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <NavBar />
      <Box display="flex" justifyContent="center" height="100%" mt="64px">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "390px",
              borderRadius: 3,
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 10px ${theme.palette.primary.main}`,
              mr: 5,
            }}
          >
            <TabSelect />
          </Card>
          <Box>
            <GeneratedImage />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
