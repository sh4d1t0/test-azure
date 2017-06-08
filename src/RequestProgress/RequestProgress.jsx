import React from "react";
import PropTypes from "prop-types";
import config from "../config";
import {CircularProgress} from "material-ui";

const ProgressBackground = (props) => {

    const {open = false} = props,
        style = {"display": "none"};

    if (open) {

        style.display = "block";

    }

    return open &&
        <div className="mn-loading-container" style={style}>

            <div className="mn-folding-cube">

                <CircularProgress color={config.palette.accent1Color}/>

            </div>
            <div className="mn-loding-message">

                <h1>Procesando solicitud. Espere un momento</h1>

            </div>
        </div>;

};

ProgressBackground.propTypes = {
    "open": PropTypes.bool
};

export default ProgressBackground;
