import React from "react";
import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import config from "./config";

const ThemeFinanciera = (props) => {

    const {
            primary1Color = config.palette.primary1Color,
            accent1Color = config.palette.accent1Color
        } = props,
        muiTheme = getMuiTheme({

            "palette": {
                "primary1Color": primary1Color,
                "accent1Color": accent1Color
            }

        });


    return <MuiThemeProvider muiTheme={muiTheme}>
        {props.children}
    </MuiThemeProvider>;

};

ThemeFinanciera.propTypes = {
    "children": PropTypes.node,
    "primary1Color": PropTypes.string,
    "accent1Color": PropTypes.string
};

export default ThemeFinanciera;
