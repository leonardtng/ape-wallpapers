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

interface Props {
  orientation: "vertical" | "horizontal";
}

const ImageDisplayModeToggle: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { imageDisplayMode } = useAppSelector(selectUserInput);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        border: `2px solid ${theme.palette.secondary.main}`,
        boxShadow: `0 0 5px ${theme.palette.secondary.main}`,
        borderRadius: 2,
        padding: "3px",
        flexWrap: "wrap",
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        color="secondary"
        value={imageDisplayMode}
        orientation={props.orientation}
        sx={{ width: { md: "unset", xs: "100%" } }}
      >
        <ToggleButton
          value="preview"
          onClick={() => dispatch(setImageDisplayMode("preview"))}
          sx={{ width: { md: "unset", xs: "50%" } }}
        >
          Preview
        </ToggleButton>
        <ToggleButton
          value="jpg"
          onClick={() => dispatch(setImageDisplayMode("jpg"))}
          sx={{ width: { md: "unset", xs: "50%" } }}
        >
          JPG
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default ImageDisplayModeToggle;
