"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recharts = require("recharts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chart = function Chart(props) {
    var bars = props.bars,
        data = props.data;


    var getBars = function getBars() {

        return bars.map(function (bar, i) {
            var dataKey = bar.dataKey,
                fill = bar.fill;


            return _react2.default.createElement(
                _recharts.Bar,
                { key: "mn-bar-chart-" + i,
                    dataKey: dataKey,
                    fill: fill },
                data.map(function (entry, index) {
                    return _react2.default.createElement(_recharts.Cell, { fill: entry.fill, key: "cell-" + index });
                })
            );
        });
    };

    return _react2.default.createElement(
        "div",
        { style: { "overflowX": "auto", "overflowY": "hidden" } },
        _react2.default.createElement(
            _recharts.BarChart,
            { width: 580, height: 350, data: data,
                margin: { "left": 0 } },
            _react2.default.createElement(_recharts.XAxis, { dataKey: "name" }),
            _react2.default.createElement(_recharts.YAxis, null),
            _react2.default.createElement(_recharts.CartesianGrid, { strokeDasharray: "3 3" }),
            _react2.default.createElement(_recharts.Tooltip, null),
            _react2.default.createElement(_recharts.Legend, null),
            getBars()
        )
    );
};

Chart.propTypes = {
    "bars": _propTypes2.default.array,
    "data": _propTypes2.default.array
};

exports.default = Chart;