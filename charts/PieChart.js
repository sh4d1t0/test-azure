"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUi = require("material-ui");

var _recharts = require("recharts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chart = function Chart(_ref) {
    var data = _ref.data,
        labels = _ref.labels,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title;

    var colors = ["#FFBB33", "#F44336", "#99CC00", "#49CEFF", "#AA66CC"],
        payload = labels.map(function (l, index) {
        var color = { color: colors[index] };
        return (0, _extends3.default)({}, l, color);
    });

    var RADIAN = Math.PI / 180;

    var renderCustomizedLabel = function renderCustomizedLabel(_ref2) {
        var cx = _ref2.cx,
            cy = _ref2.cy,
            midAngle = _ref2.midAngle,
            innerRadius = _ref2.innerRadius,
            outerRadius = _ref2.outerRadius,
            percent = _ref2.percent;

        var radius = innerRadius + (outerRadius - innerRadius) * 0.5,
            x = cx + radius * Math.cos(-midAngle * RADIAN),
            y = cy + radius * Math.sin(-midAngle * RADIAN);

        return _react2.default.createElement(
            "text",
            {
                x: x,
                y: y,
                fill: "white",
                textAnchor: x > cx ? "start" : "end",
                dominantBaseline: "central"
            },
            (percent * 100).toFixed(0) + "%"
        );
    };

    return _react2.default.createElement(
        _materialUi.Card,
        null,
        _react2.default.createElement(_materialUi.CardHeader, { title: title }),
        _react2.default.createElement(
            "div",
            { style: { overflowX: "auto", overflowY: "hidden" } },
            _react2.default.createElement(
                _recharts.PieChart,
                { width: 580, height: 350 },
                _react2.default.createElement(
                    _recharts.Pie,
                    {
                        dataKey: "solicitudes",
                        data: data,
                        nameKey: "name",
                        cx: 280,
                        cy: 175,
                        label: true,
                        outerRadius: 100
                    },
                    data.map(function (entry, index) {
                        return _react2.default.createElement(_recharts.Cell, { key: "cell-" + index, fill: colors[index] });
                    })
                ),
                _react2.default.createElement(_recharts.Tooltip, null),
                _react2.default.createElement(_recharts.Legend, { payload: payload })
            )
        )
    );
};

Chart.propTypes = {
    title: _propTypes2.default.string.isRequired,
    data: _propTypes2.default.array.isRequired,
    labels: _propTypes2.default.array.isRequired
};
Chart.defaulProps = {
    data: [],
    labels: []
};

exports.default = Chart;