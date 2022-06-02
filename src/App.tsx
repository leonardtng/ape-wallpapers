import React from "react";
import { CssBaseline, responsiveFontSizes, ThemeOptions } from "@mui/material";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import Main from "./pages/Main";
import { useAppSelector } from "./app/hooks";
import { selectUserInput } from "./features/userInputSlice";

const App: React.FC = () => {
  const { nftMode } = useAppSelector(selectUserInput);

  const common: ThemeOptions = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    typography: {
      fontFamily: "'Kanit', sans-serif;",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  };

  const bayc: Theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#7c4dff",
      },
      secondary: {
        main: "#2196f3",
      },
      background: {
        default: "#030614",
        paper: "#0A0F23",
      },
      text: {
        primary: "#E4E8F7",
        secondary: "#D8DDF0",
        disabled: "#D8DDF060",
      },
    },
    ...common,
  });

  const mayc: Theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#72B339",
      },
      secondary: {
        main: "#C77E23",
      },
      background: {
        default: "#01050D",
        paper: "#010F17", //#63939d
      },
      text: {
        primary: "#ffffff",
        secondary: "#8492C4",
      },
    },
    ...common,
  });

  const getTheme = () => {
    switch (nftMode) {
      case "bayc":
        return bayc;
      case "mayc":
        return mayc;
      default:
        return bayc;
    }
  };

  return (
    <ThemeProvider theme={responsiveFontSizes(getTheme())}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
};

export default App;
