import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectBaycMetadata,
  setSelectedBaycId,
} from "../features/baycMetadataSlice";

const InputSection = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { selectedBaycId } = useAppSelector(selectBaycMetadata);

  const [inputBaycId, setInputBaycId] = useState<number>(selectedBaycId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputBaycId(Number(event.target.value));
  };

  const handleSubmit = () => {
    dispatch(setSelectedBaycId(Number(inputBaycId)));
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ marginLeft: 1, marginBottom: 1 }}>
        BAYC ID
      </Typography>
      <TextField
        fullWidth
        focused
        placeholder="8469"
        color="primary"
        type="number"
        sx={{
          boxShadow: `0 0 5px ${theme.palette.primary.main}`,
          marginBottom: 3,
        }}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        sx={{
          width: "100%",
          boxShadow: `0 0 10px ${theme.palette.primary.main}`,
          ":hover": {
            backgroundColor: theme.palette.primary.main,
            boxShadow: `0 0 20px ${theme.palette.primary.main}`,
          },
        }}
        onClick={handleSubmit}
      >
        Generate
      </Button>
    </Box>
  );
};

export default InputSection;
