import React from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import Spinner from "../Spinner/Spinner";

const Body = props => {
    const { title, showSpinner } = props;

    return (
        <Paper zDepth={1} style={{ margin: 12 }}>
            {title &&
                <div>
                    <h1>
                        {title}
                    </h1>
                    <Divider />
                </div>}

            <div className="mn-pd-30" style={{overflowX: "auto"}}>
                {props.children}
            </div>

            {showSpinner && <Spinner visible={showSpinner} />}
        </Paper>
    );
};

Body.propTypes = {
    title: PropTypes.string,
    showSpinner: PropTypes.bool,
    children: PropTypes.node
};

export default Body;
