"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formats = require("../util/formats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LabelValue = function LabelValue(props) {
    var label = props.label,
        type = props.type,
        renderFalseAs = props.renderFalseAs,
        renderTrueAs = props.renderTrueAs,
        defaultValue = props.defaultValue,
        styleContainer = props.styleContainer;
    var value = props.value;


    if (typeof defaultValue !== "undefined" && typeof value !== "undefined") {
        value = defaultValue;
    }

    if (typeof type !== "undefined") {
        value = (0, _formats.getFormat)({ type: type, value: value, renderFalseAs: renderFalseAs, renderTrueAs: renderTrueAs });
    }

    return _react2.default.createElement(
        "div",
        { className: "row static-info", style: styleContainer },
        _react2.default.createElement(
            "div",
            { className: "col-xs-12 col-md-3 mn-clave-valor-l" },
            _react2.default.createElement(
                "span",
                null,
                label
            )
        ),
        _react2.default.createElement(
            "div",
            {
                className: "col-xs-12 col-md text-uppercase mn-clave-valor-v " + type
            },
            _react2.default.createElement(
                "span",
                null,
                value
            )
        )
    );
};

LabelValue.propTypes = {
    type: _propTypes2.default.oneOf(["currency", "date", "dateDiff", "percentage", "boolean", "none"]),
    label: _propTypes2.default.node,
    defaultValue: _propTypes2.default.any,
    styleContainer: _propTypes2.default.object,
    renderFalseAs: _propTypes2.default.string,
    renderTrueAs: _propTypes2.default.string,
    value: _propTypes2.default.any
};

LabelValue.defaultProps = {
    type: "none",
    label: "...",
    value: "..."
};

exports.default = LabelValue;
