import React from "react";
import {
  Paper,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectUserInput,
  setImageDisplayMode,
} from "../features/userInputSlice";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    color: theme.palette.text.disabled,
    "&.Mui-selected": {
      color: theme.palette.secondary.main,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const ImageDisplayModeToggle: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { imageDisplayMode } = useAppSelector(selectUserInput);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        color="secondary"
        value={imageDisplayMode}
        orientation="vertical"
      >
        <ToggleButton
          value="preview"
          onClick={() => dispatch(setImageDisplayMode("preview"))}
        >
          Preview
        </ToggleButton>
        <ToggleButton
          value="jpg"
          onClick={() => dispatch(setImageDisplayMode("jpg"))}
        >
          JPG
        </ToggleButton>
        ,
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default ImageDisplayModeToggle;
