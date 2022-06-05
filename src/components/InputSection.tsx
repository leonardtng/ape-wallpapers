import React, { useEffect, useState } from "react";
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
  setIsGeneratingMaycImage,
  setSelectedBaycId,
  setSelectedBaycLogoOverlay,
  setSelectedMaycId,
  setSelectedMaycLogoOverlay,
  setShowLockscreenOverlay,
} from "../features/userInputSlice";
import { LoadingButton } from "@mui/lab";
import { DownloadRounded, HelpOutlineRounded } from "@mui/icons-material";
import { UserInputState } from "../models";
import {
  fetchMaycDetails,
  selectMaycDetails,
} from "../features/maycDetailsSlice";

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

  const maycDetails = useAppSelector(selectMaycDetails);
  const {
    nftMode,
    imageDisplayMode,
    showLockscreenOverlay,
    isGeneratingBaycImage,
    selectedBaycId,
    generatedBaycBackground,
    selectedBaycLogoOverlay,
    isGeneratingMaycImage,
    selectedMaycId,
    generatedMaycBackground,
    selectedMaycLogoOverlay,
  } = useAppSelector(selectUserInput);

  const [inputBaycId, setInputBaycId] = useState<number>(selectedBaycId);
  const [inputBaycLogoOverlay, setBaycLogoOverlay] = useState<
    UserInputState["selectedBaycLogoOverlay"]
  >(selectedBaycLogoOverlay);

  const [inputMaycId, setInputMaycId] = useState<number>(selectedMaycId);
  const [inputMaycLogoOverlay, setMaycLogoOverlay] = useState<
    UserInputState["selectedMaycLogoOverlay"]
  >(selectedMaycLogoOverlay);

  const handleSubmit = () => {
    if (nftMode === "bayc") {
      dispatch(setSelectedBaycId(inputBaycId));
      dispatch(setSelectedBaycLogoOverlay(inputBaycLogoOverlay));
    } else {
      dispatch(setIsGeneratingMaycImage(true));
      dispatch(fetchMaycDetails(inputMaycId));
      dispatch(setSelectedMaycId(inputMaycId));
      dispatch(setSelectedMaycLogoOverlay(inputMaycLogoOverlay));
    }
  };

  useEffect(() => {
    if (maycDetails.status === "FAILED") {
      dispatch(setIsGeneratingMaycImage(false));
    }
  }, [dispatch, maycDetails.status]);

  const handleDownload = () => {
    var a = document.createElement("a");
    a.href =
      nftMode === "bayc" ? generatedBaycBackground : generatedMaycBackground;
    a.download = `${nftMode}-${
      nftMode === "bayc" ? selectedBaycId : selectedMaycId
    }.jpg`;
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

  const maycLogoOverlay = [
    {
      value: "none",
      label: "None",
    },
    {
      value: "maycLogoSlime",
      label: "MAYC Logo Slime",
    },
    {
      value: "maycLogoBlack",
      label: "MAYC Logo Black",
    },
    {
      value: "maycLogoWhite",
      label: "MAYC Logo White",
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <Box width="100%">
        <Typography variant="body2" sx={{ ml: 1, mb: 1 }}>
          {nftMode === "bayc" ? "BAYC ID" : "MAYC ID"}
        </Typography>
        <TextField
          fullWidth
          focused
          defaultValue={nftMode === "bayc" ? selectedBaycId : selectedMaycId}
          onFocus={(event) => {
            event.target.select();
          }}
          color="primary"
          type="number"
          sx={{
            boxShadow: `0 0 5px ${theme.palette.primary.main}`,
            mb: 2,
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            nftMode === "bayc"
              ? setInputBaycId(Number(event.target.value))
              : setInputMaycId(Number(event.target.value));
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
          }}
          value={
            nftMode === "bayc" ? inputBaycLogoOverlay : inputMaycLogoOverlay
          }
          onChange={(event: SelectChangeEvent) => {
            nftMode === "bayc"
              ? setBaycLogoOverlay(
                  event.target
                    .value as UserInputState["selectedBaycLogoOverlay"]
                )
              : setMaycLogoOverlay(
                  event.target
                    .value as UserInputState["selectedMaycLogoOverlay"]
                );
          }}
        >
          {nftMode === "bayc"
            ? baycLogoOverlay.map((logoOverlay) => (
                <MenuItem key={logoOverlay.value} value={logoOverlay.value}>
                  {logoOverlay.label}
                </MenuItem>
              ))
            : maycLogoOverlay.map((logoOverlay) => (
                <MenuItem key={logoOverlay.value} value={logoOverlay.value}>
                  {logoOverlay.label}
                </MenuItem>
              ))}
        </Select>
      </Box>

      <LoadingButton
        loading={
          (nftMode === "bayc" && isGeneratingBaycImage) ||
          (nftMode === "mayc" && isGeneratingMaycImage)
        }
        variant="contained"
        type="submit"
        sx={{
          width: "100%",
          mb: 3,
          backgroundColor: `${theme.palette.primary.main} !important`,
          boxShadow: `0 0 10px ${theme.palette.primary.main} !important`,
          ":hover": {
            backgroundColor: theme.palette.primary.main,
            boxShadow: `0 0 20px ${theme.palette.primary.main} !important`,
          },
          "& .MuiLoadingButton-loadingIndicator": {
            color: theme.palette.text.primary,
          },
        }}
        onClick={handleSubmit}
      >
        Generate
      </LoadingButton>

      <LoadingButton
        loading={
          (nftMode === "bayc" && isGeneratingBaycImage) ||
          (nftMode === "mayc" && isGeneratingMaycImage)
        }
        variant="contained"
        sx={{
          width: "100%",
          mb: 2,
          backgroundColor: `${theme.palette.secondary.main} !important`,
          boxShadow: `0 0 10px ${theme.palette.secondary.main} !important`,
          ":hover": {
            backgroundColor: theme.palette.secondary.main,
            boxShadow: `0 0 20px ${theme.palette.secondary.main} !important`,
          },
          "& .MuiLoadingButton-loadingIndicator": {
            color: theme.palette.text.primary,
          },
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
          />
        }
        label="Show Lockscreen Overlay"
      />
    </Box>
  );
};

export default InputSection;
