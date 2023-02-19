import { Roboto } from "@next/font/google";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#00c460",
      },
      secondary: {
        main: "#556cd6",
      },
      error: {
        main: "#E04B51",
      },
      success: {
        main: "#079453",
      },
      warning: {
        main: "#F09A1A",
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    components: {
      MuiTextField: {
        defaultProps: { size: "small" },
      },
      MuiAutocomplete: {
        defaultProps: {
          fullWidth: true,
          size: "small",
          autoHighlight: true,
          selectOnFocus: true,
        },
      },
    },
  }),
);

export default theme;
