import React, { useState } from "react";
import { Box, Button, Popover, useTheme } from "@mui/material";
import { SketchPicker } from "react-color";
import { TextObject } from "../../models/common/UserInput";

interface Props {
  inputCustomText: TextObject;
  setInputCustomText: React.Dispatch<React.SetStateAction<TextObject>>;
}

const TextColorPicker: React.FC<Props> = ({
  inputCustomText,
  setInputCustomText,
}: Props) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button onClick={handleClick} sx={{ padding: "6px", minWidth: 0 }}>
        <Box
          padding="3px"
          borderRadius={1}
          sx={{
            backgroundColor: "#666666",
          }}
        >
          <Box
            width={26}
            height={16}
            borderRadius={1}
            sx={{
              backgroundColor: inputCustomText.color,
            }}
          />
        </Box>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .sketch-picker": {
            backgroundColor: `#333333 !important`,
          },
          "& label": {
            color: `${theme.palette.text.primary} !important`,
          },
        }}
      >
        <SketchPicker
          disableAlpha
          color={inputCustomText.color}
          onChange={(color) => {
            setInputCustomText((prev) => ({
              ...prev,
              color: color.hex,
            }));
          }}
          presetColors={[
            "#000000",
            "#4A4A4A",
            "#9B9B9B",
            "#ffffff",
            "#D0DE40",
            "#FBB50F",
          ]}
        />
      </Popover>
    </>
  );
};

export default TextColorPicker;
