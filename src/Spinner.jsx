import React, {PropTypes} from "react";
import CircularProgress from "material-ui/CircularProgress";

const spinner = (props) => {

    const {visible = false} = props,
        style = {"display": "none"};

    if (visible) {

        style.display = "block";

    }

    return <div className="mn-spinner-container" style={style}>
        <div className="mn-folding-cube">
            <CircularProgress />
        </div>
    </div>;

};

spinner.propTypes = {
    "visible": PropTypes.bool
};

export default spinner;
