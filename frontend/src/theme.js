import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const baseSize = 3.5;
const reductionConst = 0.9;

let theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ee0000"
        },
        secondary: {
            main: grey[50],
            light: "white",
            dark: "#272727"
        }
    },
    typography: {
        fontSize: 20,
        fontFamilty: "Helvetica, Arial, sans-serif",
        h1: {
            fontSize: baseSize,
            fontWeight: 400
        },
        h2: {
            fontSize: baseSize * reductionConst,
            fontWeight: 400
        },
        h3: {
            fontSize: baseSize * Math.pow(reductionConst, 2)
        },
        h4: {
            fontSize: baseSize * Math.pow(reductionConst, 3)
        },
        h5: {
            fontSize: baseSize * Math.pow(reductionConst, 4)
        },
        h6: {
            fontSize: baseSize * Math.pow(reductionConst, 5),
            fontWeight: 450
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
