import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

export default createMuiTheme({
    palette: {
        primary: {
            main: "#ee0000"
        },
        secondary: {
            main: grey[300]
        }
    },
    typography: {
        fontSize: 20,
        fontFamilty: "Helvetica, Arial, sans-serif"
    }
});
