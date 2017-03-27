"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
        _props$labelOk = props.labelOk,
        labelOk = _props$labelOk === undefined ? "Cancelar" : _props$labelOk,
        _props$labelCancel = props.labelCancel,
        labelCancel = _props$labelCancel === undefined ? "Aceptar" : _props$labelCancel,
        handleOnTouchTapOk = props.handleOnTouchTapOk,
        handleOnTouchTapCancel = props.handleOnTouchTapCancel,
        _props$actions = props.actions,
        actions = _props$actions === undefined ? [_react2.default.createElement(_FlatButton2.default, {
        label: labelOk,
        primary: true,
        onTouchTap: handleOnTouchTapOk }), _react2.default.createElement(_FlatButton2.default, {
        label: labelCancel,
        primary: true,
        onTouchTap: handleOnTouchTapCancel })] : _props$actions;


    return _react2.default.createElement(
        _Dialog2.default,
        {
            title: title,
            actions: actions,
            modal: true,
            autoScrollBodyContent: true,
            open: open },
        props.children,
        showSpinner && _react2.default.createElement(_Spinner2.default, { visible: showSpinner })
    );
};

Modal.propTypes = {
    "title": _react.PropTypes.string.isRequired,
    "labelOk": _react.PropTypes.string,
    "labelCancel": _react.PropTypes.string,
    "actions": _react.PropTypes.array,
    "open": _react.PropTypes.bool.isRequired,
    "handleOnTouchTapOk": _react.PropTypes.func.isRequired,
    "handleOnTouchTapCancel": _react.PropTypes.func.isRequired,
    "showSpinner": _react.PropTypes.bool,
    "children": _react.PropTypes.node
};

exports.default = Modal;