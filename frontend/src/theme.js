import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

export default createMuiTheme({
    palette: {
        primary: {
            main: red[900]
        },
        secondary: {
            main: grey[300]
        }
    }
});
