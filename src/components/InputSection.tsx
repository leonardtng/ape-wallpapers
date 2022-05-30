import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectUserInput,
  setSelectedBaycId,
  setSelectedBaycLogoOverlay,
  setShowLockscreenOverlay,
} from "../features/userInputSlice";
import { LoadingButton } from "@mui/lab";
import { DownloadRounded, HelpOutlineRounded } from "@mui/icons-material";
import { UserInputState } from "../models";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 160,
    marginBottom: "6px !important",
  },
});

const InputSection = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {
    // nftMode,
    imageDisplayMode,
    showLockscreenOverlay,
    isGeneratingImage,
    selectedBaycId,
    generatedBaycBackground,
    selectedBaycLogoOverlay,
  } = useAppSelector(selectUserInput);

  const [inputBaycId, setInputBaycId] = useState<number>(selectedBaycId);
  const [inputBaycLogoOverlay, setBaycLogoOverlay] = useState<
    UserInputState["selectedBaycLogoOverlay"]
  >(selectedBaycLogoOverlay);

  const handleSubmit = () => {
    dispatch(setSelectedBaycId(inputBaycId));
    dispatch(setSelectedBaycLogoOverlay(inputBaycLogoOverlay));
  };

  const handleDownload = () => {
    var a = document.createElement("a");
    a.href = generatedBaycBackground;
    a.download = `${selectedBaycId}.jpg`;
    a.click();
    a.remove();
  };

  const baycLogoOverlay = [
    {
      value: "none",
      label: "None",
    },
    {
      value: "baycLogoBlack",
      label: "BAYC Logo Black",
    },
    {
      value: "baycLogoWhite",
      label: "BAYC Logo White",
    },
  ];

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
            mb: 2,
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputBaycId(Number(event.target.value));
          }}
        />
      </Box>

      <Box width="100%">
        <Box display="flex" alignItems="flex-end" mb={1}>
          <Typography variant="body2" sx={{ ml: 1, mr: "4px" }}>
            Logo Overlay
          </Typography>
          <CustomWidthTooltip
            title="Contact me on Twitter to add your community's logo here!"
            placement="top"
          >
            <HelpOutlineRounded
              sx={{
                height: "16px",
                width: "16px",
                mb: "1px",
                cursor: "pointer",
              }}
            />
          </CustomWidthTooltip>
        </Box>

        <Select
          fullWidth
          sx={{
            mb: 4,
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: `0 0 5px ${theme.palette.primary.main}`,
            fieldset: {
              border: "none",
            },
            "&.MuiSvgIcon-root": {
              color: "#ffffff !important",
            },
          }}
          value={inputBaycLogoOverlay}
          onChange={(event: SelectChangeEvent) => {
            setBaycLogoOverlay(
              event.target.value as UserInputState["selectedBaycLogoOverlay"]
            );
          }}
        >
          {baycLogoOverlay.map((logoOverlay) => (
            <MenuItem value={logoOverlay.value}>{logoOverlay.label}</MenuItem>
          ))}
        </Select>
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
