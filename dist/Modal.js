"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require("material-ui/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require("material-ui/FlatButton");

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Spinner = require("./Spinner");

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {{}} props : dfnodsfnkl
 * @return {XML} : knoofdnkl
 * @constructor
 */
var Modal = function Modal(props) {
    var title = props.title,
        open = props.open,
        _props$showSpinner = props.showSpinner,
        showSpinner = _props$showSpinner === undefined ? false : _props$showSpinner,
        _props$disabledOk = props.disabledOk,
        disabledOk = _props$disabledOk === undefined ? false : _props$disabledOk,
        _props$labelOk = props.labelOk,
        labelOk = _props$labelOk === undefined ? "Aceptar" : _props$labelOk,
        _props$labelCancel = props.labelCancel,
        labelCancel = _props$labelCancel === undefined ? "Cancelar" : _props$labelCancel,
        handleOnTouchTapOk = props.handleOnTouchTapOk,
        handleOnTouchTapCancel = props.handleOnTouchTapCancel,
        _props$contentStyle = props.contentStyle,
        contentStyle = _props$contentStyle === undefined ? {
        "width": "95%",
        "maxWidth": "none"
    } : _props$contentStyle,
        actions = [_react2.default.createElement(_FlatButton2.default, {
        label: labelCancel,
        primary: true,
        onTouchTap: handleOnTouchTapCancel }), _react2.default.createElement(_FlatButton2.default, {
        label: labelOk,
        disabled: disabledOk,
        primary: true,
        onTouchTap: handleOnTouchTapOk })];


    return _react2.default.createElement(
        _Dialog2.default,
        {
            title: title,
            actions: actions,
            modal: true,
            autoScrollBodyContent: true,
            contentStyle: contentStyle,
            open: open },
        props.children,
        showSpinner && _react2.default.createElement(_Spinner2.default, { visible: showSpinner })
    );
};

Modal.propTypes = {
    "title": _propTypes2.default.string.isRequired,
    "labelOk": _propTypes2.default.string,
    "labelCancel": _propTypes2.default.string,
    "open": _propTypes2.default.bool.isRequired,
    "handleOnTouchTapOk": _propTypes2.default.func.isRequired,
    "handleOnTouchTapCancel": _propTypes2.default.func.isRequired,
    "showSpinner": _propTypes2.default.bool,
    "disabledOk": _propTypes2.default.bool,
    "contentStyle": _propTypes2.default.object,
    "children": _propTypes2.default.node
};

exports.default = Modal;