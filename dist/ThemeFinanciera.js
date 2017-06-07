"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MuiThemeProvider = require("material-ui/styles/MuiThemeProvider");

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = require("material-ui/styles/getMuiTheme");

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemeFinanciera = function ThemeFinanciera(props) {
    var _props$primary1Color = props.primary1Color,
        primary1Color = _props$primary1Color === undefined ? _config2.default.palette.primary1Color : _props$primary1Color,
        _props$accent1Color = props.accent1Color,
        accent1Color = _props$accent1Color === undefined ? _config2.default.palette.accent1Color : _props$accent1Color,
        muiTheme = (0, _getMuiTheme2.default)({

        "palette": {
            "primary1Color": primary1Color,
            "accent1Color": accent1Color
        }

    });


    return _react2.default.createElement(
        _MuiThemeProvider2.default,
        { muiTheme: muiTheme },
        props.children
    );
};

ThemeFinanciera.propTypes = {
    "children": _propTypes2.default.node,
    "primary1Color": _propTypes2.default.string,
    "accent1Color": _propTypes2.default.string
};

exports.default = ThemeFinanciera;