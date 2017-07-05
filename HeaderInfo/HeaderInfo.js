"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _financieraUi = require("financiera-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderInfo = function HeaderInfo(props) {
    var _props$data = props.data,
        data = _props$data === undefined ? [] : _props$data;


    return _react2.default.createElement(
        _financieraUi.Container,
        null,
        data.map(function (item) {

            return _react2.default.createElement(
                "div",
                { className: "mn-header-info-column" },
                _react2.default.createElement(
                    "div",
                    { className: "label" },
                    item.label
                ),
                _react2.default.createElement(
                    "div",
                    { className: "value" },
                    item.value
                )
            );
        })
    );
};

HeaderInfo.propTypes = {
    "data": _propTypes2.default.array.isRequired
};

exports.default = HeaderInfo;