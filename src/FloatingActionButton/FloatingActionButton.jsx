import React from "react";
import PropTypes from "prop-types";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const FloatingButton = props => {
    const { onTouchTap } = props;

    return (
        <FloatingActionButton
            secondary={true}
            className="mn-float-a-btn"
            onTouchTap={onTouchTap}
        >
            <ContentAdd />
        </FloatingActionButton>
    );
};

FloatingButton.propTypes = {
    onTouchTap: PropTypes.func.isRequired
};

export default FloatingButton;
