"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Paper = require("material-ui/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Divider = require("material-ui/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _Spinner = require("./Spinner");

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Body = function Body(props) {
    var title = props.title,
        showSpinner = props.showSpinner;


    return _react2.default.createElement(
        _Paper2.default,
        { className: "nm-paper-body mn-pd-30",
            zDepth: 1 },
        title && _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "h1",
                null,
                title
            ),
            _react2.default.createElement(_Divider2.default, null)
        ),
        _react2.default.createElement(
            "div",
            { className: "mn-pd-30" },
            props.children
        ),
        showSpinner && _react2.default.createElement(_Spinner2.default, { visible: showSpinner })
    );
};

Body.propTypes = {
    "title": _react.PropTypes.string,
    "showSpinner": _react.PropTypes.bool,
    "children": _react.PropTypes.node
};

exports.default = Body;