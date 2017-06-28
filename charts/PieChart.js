"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUi = require("material-ui");

var _recharts = require("recharts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chart = function Chart(_ref) {
    var data = _ref.data,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title;


    var colors = ["#FFBB33", "#F44336", "#99CC00", "#49CEFF", "#AA66CC"];

    return _react2.default.createElement(
        _materialUi.Card,
        null,
        _react2.default.createElement(_materialUi.CardHeader, { title: title }),
        _react2.default.createElement(
            "div",
            { style: { "overflowX": "auto", "overflowY": "hidden" } },
            _react2.default.createElement(
                _recharts.PieChart,
                {
                    width: 580,
                    height: 350 },
                _react2.default.createElement(
                    _recharts.Pie,
                    { dataKey: "solicitudes",
                        data: data,
                        nameKey: "name",
                        cx: 250,
                        cy: 175,
                        outerRadius: 120 },
                    data.map(function (entry, index) {
                        return _react2.default.createElement(_recharts.Cell, {
                            key: "cell-" + index,
                            fill: colors[index % colors.length] });
                    })
                ),
                _react2.default.createElement(_recharts.Tooltip, { label: "name" }),
                _react2.default.createElement(_recharts.Legend, null)
            )
        )
    );
};

Chart.propTypes = {
    "title": _propTypes2.default.string.isRequired,
    "data": _propTypes2.default.array.isRequired
};

exports.default = Chart;