"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AppBar = require("material-ui/AppBar");

var _AppBar2 = _interopRequireDefault(_AppBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(props) {
    var title = props.title,
        onLeftIconButtonTouchTap = props.onLeftIconButtonTouchTap,
        iconElementRight = props.iconElementRight,
        zDepth = props.zDepth;


    return _react2.default.createElement(_AppBar2.default, {
        title: title,
        zDepth: zDepth,
        style: { position: "fixed" },
        onLeftIconButtonTouchTap: onLeftIconButtonTouchTap,
        iconElementRight: iconElementRight
    });
};

Header.propTypes = {
    onLeftIconButtonTouchTap: _propTypes2.default.func.isRequired,
    title: _propTypes2.default.node.isRequired,
    iconElementRight: _propTypes2.default.element,
    zDepth: _propTypes2.default.number
};

exports.default = Header;