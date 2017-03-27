"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RowKeyValue = function RowKeyValue(props) {
    var label = props.label,
        value = props.value;


    return _react2.default.createElement(
        "div",
        { className: "row static-info" },
        _react2.default.createElement(
            "div",
            { className: "col-md-5" },
            label,
            ":"
        ),
        _react2.default.createElement(
            "div",
            { className: "col-md-7 value text-uppercase" },
            value
        )
    );
};

RowKeyValue.propTypes = {
    "label": _react.PropTypes.string.isRequired,
    "value": _react.PropTypes.string.isRequired
};

exports.default = RowKeyValue;