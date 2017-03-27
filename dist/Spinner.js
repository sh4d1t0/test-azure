"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _CircularProgress = require("material-ui/CircularProgress");

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spinner = function spinner(props) {
    var _props$visible = props.visible,
        visible = _props$visible === undefined ? false : _props$visible,
        style = { "display": "none" };


    if (visible) {

        style.display = "block";
    }

    return _react2.default.createElement(
        "div",
        { className: "mn-spinner-container", style: style },
        _react2.default.createElement(
            "div",
            { className: "mn-folding-cube" },
            _react2.default.createElement(_CircularProgress2.default, null)
        )
    );
};

spinner.propTypes = {
    "visible": _react.PropTypes.bool
};

exports.default = spinner;