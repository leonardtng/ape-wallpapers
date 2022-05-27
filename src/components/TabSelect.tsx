import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import InputSection from "./InputSection";

const TabSelect: React.FC = () => {
  const [value, setValue] = useState("bayc");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "#1F2747" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="BAYC" value="bayc" />
          <Tab label="MAYC" value="mayc" />
        </TabList>
      </Box>
      <TabPanel value="bayc">
        <InputSection />
      </TabPanel>
      <TabPanel value="mayc">Item Two</TabPanel>
    </TabContext>
  );
};

export default TabSelect;
