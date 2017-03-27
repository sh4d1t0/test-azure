"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _add = require("material-ui/svg-icons/content/add");

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FloatingButton = function FloatingButton(props) {
    var onTouchTap = props.onTouchTap;


    return _react2.default.createElement(
        _FloatingActionButton2.default,
        {
            secondary: true,
            className: "mn-float-a-btn",
            onTouchTap: onTouchTap },
        _react2.default.createElement(_add2.default, null)
    );
};

FloatingButton.propTypes = {
    "onTouchTap": _react.PropTypes.func.isRequired
};

exports.default = FloatingButton;