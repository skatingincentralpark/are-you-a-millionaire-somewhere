import { createTheme } from "@mui/material/styles";
import { orange, green, red } from "@mui/material/colors";

// Create a theme instance
const theme = createTheme({
  typography: {
    h1: {
      "@media (max-width:550px)": {
        fontWeight: "800",
        fontSize: "2.5rem",
      },
    },
    h2: {
      "@media (max-width:550px)": {
        fontSize: "1.5rem",
      },
      fontSize: 36,
      marginBottom: 0,
    },
    fontFamily: ["Roboto", "Helvetica Neue", "sans-serif"].join(","),
  },
  //   palette: {
  //     primary: {
  //       main: orange[500],
  //     },
  //     secondary: {
  //       main: green[500],
  //     },
  //   },
});

export default theme;
