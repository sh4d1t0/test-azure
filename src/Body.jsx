import React, {PropTypes} from "react";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import Spinner from "./Spinner";

const Body = (props) => {

    const {title, showSpinner} = props;

    return <Paper className="nm-paper-body mn-pd-30"
                  zDepth={1}>
        {
            title && <div>
                <h1>{title}</h1>
                <Divider />
            </div>
        }

        <div className="mn-pd-30">
            {props.children}
        </div>

        {
            showSpinner && <Spinner visible={showSpinner}/>
        }
    </Paper>;

};

Body.propTypes = {
    "title": PropTypes.string,
    "showSpinner": PropTypes.bool,
    "children": PropTypes.node
};

export default Body;
