import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9",
  arcOrange = "#FFBA60";

export default createMuiTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange
    },
    primary: {
      main: arcBlue
    },
    secondary: {
      main: arcOrange
    },
    typography: {
      tab: {
        //fontFamily: "Railway"
        textTransform: "none",
        fontWeight: 700,
        fontSize: "1rem"
      },
      estimate: {
        textTransform: "none",
        height: "45px",
        color: "white"
      }
    }
  }
});
