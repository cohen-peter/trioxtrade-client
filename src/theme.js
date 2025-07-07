import { createTheme } from "@mui/material";

// theme settings for trioxTrade using Material UI

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#3CE8F2",
    },
    text: {
      primary: "#ffffff",
      secondary: "#000000"
    },
    background: {
      default: "#000000",
      alt: "#095CE0"
    }
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#D0D5DD"
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
        color: "secondary"
      },
      styleOverrides: {
        root: {
          borderRadius: "100px",
          textTransform: "none"
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: 'translate(14px, 10px) scale(1)',
          color: "white",
          fontSize: ".75rem",
          "&.Mui-focused": {
            color: "white",
          },
        },
        shrink: {
          transform: 'translate(14px, -9px) scale(0.75)',
        }
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover .Mui-OutlinedInput-notchedOutline": {
            borderColor: "white"
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #000 inset",
            WebkitTextFillColor: "#fff",
            transition: "background-color 5000s ease-in-out 0s",
          }
        },
        notchedOutline: {
          borderColor:  "grey"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 40,
          fontSize: ".75rem"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: ".5rem"
        }
      }
    }
  }
});

export default theme;