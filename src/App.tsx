import React from "react";
import { responsiveFontSizes } from "@mui/material";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import Main from "./pages/Main";

const App: React.FC = () => {
  const theme: Theme = createTheme({
    palette: {
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
  });

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <Main />
    </ThemeProvider>
  );
};

export default App;
