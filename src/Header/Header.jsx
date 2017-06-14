import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";

const Header = (props) => {

    const {title, onLeftIconButtonTouchTap, iconElementRight, zDepth} = props;

    return <AppBar title={title}
                   zDepth={zDepth}
                   style={{"position": "fixed"}}
                   onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
                   iconElementRight={iconElementRight}/>;

};

Header.propTypes = {
    "onLeftIconButtonTouchTap": PropTypes.func.isRequired,
    "title": PropTypes.node.isRequired,
    "iconElementRight": PropTypes.element,
    "zDepth": PropTypes.number
};

export default Header;
