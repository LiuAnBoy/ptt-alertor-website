"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#f5f5f5",
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#121212",
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
        outlinedPrimary: {
          color: "#121212",
          borderColor: "#121212",
          "&:hover": {
            borderColor: "#333333",
            backgroundColor: "rgba(18, 18, 18, 0.04)",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          underline: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #121212",
        },
        indicator: {
          display: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#121212",
          transition: "all 0.2s ease-in-out",
          borderTop: "1px solid transparent",
          borderLeft: "1px solid transparent",
          borderRight: "1px solid transparent",
          borderBottom: "1px solid transparent",
          "&.Mui-selected": {
            color: "#121212",
            borderTop: "1px solid #121212",
            borderLeft: "1px solid #121212",
            borderRight: "1px solid #121212",
            borderBottom: "1px solid transparent",
            marginBottom: "-1px",
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
  },
});

export default theme;
