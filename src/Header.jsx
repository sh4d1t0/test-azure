import React, {PropTypes} from "react";
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
    "title": PropTypes.string.isRequired,
    "iconElementRight": PropTypes.element.isRequired,
    "zDepth": PropTypes.number
};

export default Header;
