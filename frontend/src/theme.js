import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

let theme = createMuiTheme({
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
        fontFamilty: "Helvetica, Arial, sans-serif",
        h1: {
            fontSize: 5.75
        },
        h2: {
            fontSize: 4.75
        },
        h3: {
            fontSize: 4
        },
        h4: {
            fontSize: 3.25
        },
        h5: {
            fontSize: 2.3
        },
        h6: {
            fontSize: 1.8,
            fontWeight: 400
        },
        body1: {
            fontSize: 1.57
        },
        body2: {
            fontSize: 1.5
        }
    }
});

export default responsiveFontSizes(theme);
