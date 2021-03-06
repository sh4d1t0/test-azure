"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgressBackground = function ProgressBackground(props) {
    var open = props.open,
        message = props.message,
        style = { display: "none" };


    if (open) {
        style.display = "block";
    } else {
        return _react2.default.createElement("div", null);
    }

    return _react2.default.createElement(
        "div",
        { className: "mn-loading-container", style: style },
        _react2.default.createElement(
            "div",
            { className: "mn-folding-cube" },
            _react2.default.createElement(_materialUi.CircularProgress, { color: _config2.default.palette.accent1Color })
        ),
        _react2.default.createElement(
            "div",
            { className: "mn-loding-message" },
            _react2.default.createElement(
                "h1",
                null,
                message
            )
        )
    );
};

ProgressBackground.propTypes = {
    open: _propTypes2.default.bool,
    message: _propTypes2.default.string
};

ProgressBackground.defaultProps = {
    message: "Procesando solicitud. Espere un momento",
    open: false
};

exports.default = ProgressBackground;