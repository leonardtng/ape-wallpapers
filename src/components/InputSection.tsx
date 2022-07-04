import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DownloadRounded, HelpOutlineRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
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
import {
  selectUserInput,
  setIsGeneratingMaycImage,
  setSelectedBaycCustomText,
  setSelectedBaycId,
  setSelectedBaycLogoOverlay,
  setSelectedMaycCustomText,
  setSelectedMaycId,
  setSelectedMaycLogoOverlay,
  setShowLockscreenOverlay,
} from "../features/userInputSlice";
import { UserInputState } from "../models";
import {
  fetchMaycDetails,
  selectMaycDetails,
} from "../features/maycDetailsSlice";
import TextColorPicker from "./UI/TextColorPicker";

const CleanTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
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
    selectedBaycCustomText,
    isGeneratingMaycImage,
    selectedMaycId,
    generatedMaycBackground,
    selectedMaycLogoOverlay,
    selectedMaycCustomText,
  } = useAppSelector(selectUserInput);

  const [inputBaycId, setInputBaycId] = useState<number>(selectedBaycId);
  const [inputBaycLogoOverlay, setBaycLogoOverlay] = useState<
    UserInputState["selectedBaycLogoOverlay"]
  >(selectedBaycLogoOverlay);
  const [inputBaycCustomText, setInputBaycCustomText] = useState<
    UserInputState["selectedBaycCustomText"]
  >(selectedBaycCustomText);

  const [inputMaycId, setInputMaycId] = useState<number>(selectedMaycId);
  const [inputMaycLogoOverlay, setMaycLogoOverlay] = useState<
    UserInputState["selectedMaycLogoOverlay"]
  >(selectedMaycLogoOverlay);
  const [inputMaycCustomText, setInputMaycCustomText] = useState<
    UserInputState["selectedMaycCustomText"]
  >(selectedMaycCustomText);

  const handleSubmit = useCallback(() => {
    if (nftMode === "bayc") {
      dispatch(setSelectedBaycId(inputBaycId));
      dispatch(setSelectedBaycLogoOverlay(inputBaycLogoOverlay));
      dispatch(setSelectedBaycCustomText(inputBaycCustomText));
    } else {
      dispatch(setIsGeneratingMaycImage(true));
      dispatch(fetchMaycDetails(inputMaycId));
      dispatch(setSelectedMaycId(inputMaycId));
      dispatch(setSelectedMaycLogoOverlay(inputMaycLogoOverlay));
      dispatch(setSelectedMaycCustomText(inputMaycCustomText));
    }
  }, [
    dispatch,
    inputBaycId,
    inputBaycLogoOverlay,
    inputBaycCustomText,
    inputMaycId,
    inputMaycLogoOverlay,
    nftMode,
    inputMaycCustomText,
  ]);

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

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleSubmit]);

  const sharedOverlays = [
    {
      value: "apeFestDefault",
      label: "ApeFest '22 Default",
    },
    {
      value: "apeFest1",
      label: "ApeFest '22 Graffiti 1",
    },
    {
      value: "apeFest2",
      label: "ApeFest '22 Graffiti 2",
    },
    {
      value: "apeFest3",
      label: "ApeFest '22 Graffiti 3",
    },
    {
      value: "apeFest4",
      label: "ApeFest '22 Graffiti 4",
    },
  ];

  const baycLogoOverlays = [
    {
      value: "none",
      label: "None",
    },
    {
      value: "black",
      label: "BAYC Logo Black",
    },
    {
      value: "white",
      label: "BAYC Logo White",
    },
    ...sharedOverlays,
  ];

  const maycLogoOverlays = [
    {
      value: "none",
      label: "None",
    },
    {
      value: "slime",
      label: "MAYC Logo Slime",
    },
    {
      value: "black",
      label: "MAYC Logo Black",
    },
    {
      value: "white",
      label: "MAYC Logo White",
    },
    ...sharedOverlays,
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width="100%">
        <Typography variant="body2" sx={{ ml: 1, mb: 1 }}>
          {nftMode === "bayc" ? "BAYC ID" : "MAYC ID"}
        </Typography>
        <TextField
          fullWidth
          defaultValue={nftMode === "bayc" ? selectedBaycId : selectedMaycId}
          onFocus={(event) => {
            event.target.select();
          }}
          color="primary"
          type="number"
          sx={{
            boxShadow: `0 0 5px ${theme.palette.primary.main}`,
            mb: 2,
            "& fieldset": {
              border: `2px solid ${theme.palette.primary.main} !important`,
            },
            ":hover": {
              boxShadow: `0 0 10px ${theme.palette.primary.main}`,
            },
            "& .Mui-focused": {
              boxShadow: `0 0 15px ${theme.palette.primary.main}`,
            },
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
          <CleanTooltip
            sx={{ maxWidth: 164 }}
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
          </CleanTooltip>
        </Box>

        <Select
          fullWidth
          sx={{
            mb: 2,
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: `0 0 5px ${theme.palette.primary.main}`,
            fieldset: {
              border: "none",
            },
            ":hover": {
              boxShadow: `0 0 10px ${theme.palette.primary.main}`,
            },
            "& .Mui-focused": {
              boxShadow: `0 0 15px ${theme.palette.primary.main}`,
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
            ? baycLogoOverlays.map((logoOverlay) => (
                <MenuItem key={logoOverlay.value} value={logoOverlay.value}>
                  {logoOverlay.label}
                </MenuItem>
              ))
            : maycLogoOverlays.map((logoOverlay) => (
                <MenuItem key={logoOverlay.value} value={logoOverlay.value}>
                  {logoOverlay.label}
                </MenuItem>
              ))}
        </Select>
      </Box>

      <Box width="100%" mb={2}>
        <Typography variant="body2" sx={{ ml: 1, mb: 1 }}>
          Custom Caption
        </Typography>
        <CleanTooltip
          placement="top"
          title={
            (nftMode === "bayc" && inputBaycLogoOverlay === "none") ||
            (nftMode === "mayc" && inputMaycLogoOverlay === "none")
              ? "Please select a logo overlay to enable custom text, or contact me on twitter to have it done for you manually"
              : ""
          }
        >
          <TextField
            fullWidth
            disabled={
              inputBaycLogoOverlay === "none" || inputMaycLogoOverlay === "none"
            }
            placeholder="Twitter Handle / Discord ID / etc."
            defaultValue={
              nftMode === "bayc"
                ? selectedBaycCustomText.content
                : selectedMaycCustomText.content
            }
            onFocus={(event) => {
              event.target.select();
            }}
            color="primary"
            sx={{
              boxShadow: `0 0 5px ${theme.palette.primary.main}`,
              mb: 2,
              "& fieldset": {
                border: `2px solid ${theme.palette.primary.main} !important`,
              },
              ":hover": {
                boxShadow: `0 0 10px ${theme.palette.primary.main}`,
              },
              "& .Mui-focused": {
                boxShadow: `0 0 15px ${theme.palette.primary.main}`,
              },
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              nftMode === "bayc"
                ? setInputBaycCustomText((prev) => ({
                    ...prev,
                    content: event.target.value,
                  }))
                : setInputMaycCustomText((prev) => ({
                    ...prev,
                    content: event.target.value,
                  }));
            }}
            InputProps={{
              endAdornment:
                nftMode === "bayc" ? (
                  <TextColorPicker
                    inputCustomText={inputBaycCustomText}
                    setInputCustomText={setInputBaycCustomText}
                  />
                ) : (
                  <TextColorPicker
                    inputCustomText={inputMaycCustomText}
                    setInputCustomText={setInputMaycCustomText}
                  />
                ),
            }}
          />
        </CleanTooltip>
      </Box>

      <LoadingButton
        loading={
          (nftMode === "bayc" && isGeneratingBaycImage) ||
          (nftMode === "mayc" && isGeneratingMaycImage)
        }
        variant="contained"
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
