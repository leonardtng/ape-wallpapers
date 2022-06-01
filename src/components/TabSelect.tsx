import React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import InputSection from "./InputSection";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectUserInput,
  setNftMode,
  setShowLockscreenOverlay,
} from "../features/userInputSlice";

const TabSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const { nftMode } = useAppSelector(selectUserInput);

  const handleChange = (_: React.SyntheticEvent, newValue: "bayc" | "mayc") => {
    dispatch(setShowLockscreenOverlay(true));
    dispatch(setNftMode(newValue));
  };

  return (
    <TabContext value={nftMode}>
      <Box sx={{ borderBottom: 1, borderColor: "#1F2747" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="BAYC" value="bayc" />
          <Tab label="MAYC" value="mayc" />
        </TabList>
      </Box>
      <TabPanel value="bayc">
        <InputSection />
      </TabPanel>
      <TabPanel value="mayc">
        <InputSection />
      </TabPanel>
    </TabContext>
  );
};

export default TabSelect;
