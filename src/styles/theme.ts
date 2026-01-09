"use client";
import { createTheme, darken, lighten } from "@mui/material/styles";
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
        text: {
          primary: "#fff",
          secondary: "#121212",
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
          color: "#fff",
          borderColor: "#fff",
          "&:hover": {
            color: "#fff",
            borderColor: darken("#fff", 0.4),
            backgroundColor: "rgba(18, 18, 18, 0.04)",
          },
        },
        outlinedSecondary: {
          color: "#121212",
          backgroundColor: "#fff",
          borderColor: "#121212",
          "&:hover": {
            color: "#121212",
            backgroundColor: darken("#fff", 0.1),
            borderColor: lighten("#121212", 0.4),
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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
            "&:hover fieldset": {
              borderColor: "#fff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#fff",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
            "&.Mui-focused": {
              color: "#fff",
            },
          },
          "& .MuiFormHelperText-root": {
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.5)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.7)",
          "&.Mui-focused": {
            color: "#fff",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          },
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
