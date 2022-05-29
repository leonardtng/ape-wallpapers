import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectUserInput,
  setSelectedBaycId,
  setShowLockscreenOverlay,
} from "../features/userInputSlice";
import { LoadingButton } from "@mui/lab";

const InputSection = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isGeneratingImage, selectedBaycId, showLockscreenOverlay } =
    useAppSelector(selectUserInput);

  const [inputBaycId, setInputBaycId] = useState<number>(selectedBaycId);

  const handleSubmit = () => {
    dispatch(setSelectedBaycId(Number(inputBaycId)));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width="100%">
        <Typography variant="body2" sx={{ ml: 1, mb: 1 }}>
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
            mb: 3,
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputBaycId(Number(event.target.value));
          }}
        />
      </Box>

      <LoadingButton
        loading={isGeneratingImage}
        variant="contained"
        sx={{
          width: "100%",
          backgroundColor: `${theme.palette.primary.main} !important`,
          boxShadow: `0 0 10px ${theme.palette.primary.main} !important`,
          ":hover": {
            backgroundColor: theme.palette.primary.main,
            boxShadow: `0 0 20px ${theme.palette.primary.main} !important`,
          },
          mb: 2,
        }}
        onClick={handleSubmit}
      >
        Generate
      </LoadingButton>

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            value={showLockscreenOverlay}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setShowLockscreenOverlay(event.target.checked));
            }}
          />
        }
        label="Show Lockscreen Overlay"
      />
    </Box>
  );
};

export default InputSection;
