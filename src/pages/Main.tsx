import React, { useEffect } from "react";
import { Box, Card, Grid, useTheme } from "@mui/material";
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
      sx={{
        height: "calc(100vh - 64px)",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <NavBar />
      <Grid container spacing={0} sx={{ height: "100%", mt: "64px" }}>
        <Grid item xs={1} lg={3} xl={4}></Grid>
        <Grid
          item
          xs={10}
          lg={6}
          xl={4}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "45%",
              height: 300,
              borderRadius: 3,
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 10px ${theme.palette.primary.main}`,
            }}
          >
            <TabSelect />
          </Card>
          <Box sx={{ width: "45%" }}>
            <GeneratedImage />
          </Box>
        </Grid>
        <Grid item xs={1} lg={3} xl={4}></Grid>
      </Grid>
    </Box>
  );
};

export default Main;
