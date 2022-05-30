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
import { DownloadRounded } from "@mui/icons-material";

const InputSection = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {
    imageDisplayMode,
    showLockscreenOverlay,
    isGeneratingImage,
    selectedBaycId,
    generatedBaycBackground,
  } = useAppSelector(selectUserInput);

  const [inputBaycId, setInputBaycId] = useState<number>(selectedBaycId);

  const handleSubmit = () => {
    dispatch(setSelectedBaycId(inputBaycId));
  };

  const handleDownload = () => {
    var a = document.createElement("a");
    a.href = generatedBaycBackground;
    a.download = `${selectedBaycId}.jpg`;
    a.click();
    a.remove();
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
          mb: 3,
        }}
        onClick={handleSubmit}
      >
        Generate
      </LoadingButton>

      <LoadingButton
        loading={isGeneratingImage}
        variant="contained"
        sx={{
          width: "100%",
          backgroundColor: `${theme.palette.secondary.main} !important`,
          boxShadow: `0 0 10px ${theme.palette.secondary.main} !important`,
          ":hover": {
            backgroundColor: theme.palette.secondary.main,
            boxShadow: `0 0 20px ${theme.palette.secondary.main} !important`,
          },
          mb: 2,
        }}
        onClick={handleDownload}
      >
        <DownloadRounded sx={{ mr: 1 }} />
        Save Wallpaper
      </LoadingButton>

      <FormControlLabel
        disabled={imageDisplayMode !== "preview"}
        control={
          <Checkbox
            defaultChecked
            value={showLockscreenOverlay}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setShowLockscreenOverlay(event.target.checked));
            }}
            sx={{
              "&.Mui-disabled": {
                color: theme.palette.text.disabled,
              },
            }}
          />
        }
        label="Show Lockscreen Overlay"
      />
    </Box>
  );
};

export default InputSection;
