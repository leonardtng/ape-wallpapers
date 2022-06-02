import React, { useEffect } from "react";
import { Box, Card, Hidden, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchBaycMetadata } from "../features/baycMetadataSlice";
import NavBar from "../components/NavBar";
import TabSelect from "../components/TabSelect";
import GeneratedBaycImage from "../components/GeneratedBaycImage";
import { selectUserInput } from "../features/userInputSlice";
import GeneratedMaycImage from "../components/GeneratedMaycImage";
import ImageDisplayModeToggle from "../components/ImageDisplayModeToggle";

const Main: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { nftMode } = useAppSelector(selectUserInput);

  useEffect(() => {
    dispatch(fetchBaycMetadata());
  }, [dispatch]);

  return (
    <Box
      height="calc(100vh - 64px)"
      sx={{
        height: {
          md: "calc(100vh - 64px)",
          xs: "fit-content",
        },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <NavBar />
      <Box display="flex" justifyContent="center" height="100%" mt="64px">
        <Box
          sx={{
            display: {
              md: "flex",
              xs: "block",
            },
            justifyContent: "center",
            alignItems: "center",
            padding: {
              md: 3,
              xs: 1,
            },
            mt: {
              md: 0,
              xs: 3,
            },
          }}
        >
          <Card
            sx={{
              width: {
                md: "390px",
                xs: "100%",
              },
              borderRadius: 3,
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 10px ${theme.palette.primary.main}`,
              mr: {
                md: 5,
                xs: 0,
              },
            }}
          >
            <TabSelect />
          </Card>
          <Hidden mdUp>
            <Box width="100%" mt={3} display="flex" justifyContent="center">
              <Box width="100%">
                <ImageDisplayModeToggle orientation="horizontal" />
              </Box>
            </Box>
          </Hidden>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              justifyContent: {
                md: "space-between",
                xs: "center",
              },
              width: {
                md: "430px",
                xs: "100%",
              },
              minWidth: "350px",
            }}
          >
            {nftMode === "bayc" ? (
              <GeneratedBaycImage />
            ) : (
              <GeneratedMaycImage />
            )}
            <Hidden mdDown>
              <ImageDisplayModeToggle orientation="vertical" />
            </Hidden>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
