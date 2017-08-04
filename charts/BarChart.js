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

var Chart = function Chart(props) {
    var _props$bars = props.bars,
        bars = _props$bars === undefined ? [] : _props$bars,
        _props$data = props.data,
        data = _props$data === undefined ? [] : _props$data,
        _props$title = props.title,
        title = _props$title === undefined ? "" : _props$title;


    var getBars = function getBars() {
        return bars.map(function (bar, i) {
            var dataKey = bar.dataKey,
                fill = bar.fill;


            return _react2.default.createElement(
                _recharts.Bar,
                { key: "mn-bar-chart-" + i, dataKey: dataKey, fill: fill },
                data.map(function (entry, index) {
                    return _react2.default.createElement(_recharts.Cell, { fill: entry.fill, key: "cell-" + index });
                })
            );
        });
    };

    return _react2.default.createElement(
        _materialUi.Card,
        null,
        _react2.default.createElement(_materialUi.CardHeader, { title: title }),
        _react2.default.createElement(
            "div",
            { style: { overflowX: "auto", overflowY: "hidden" } },
            _react2.default.createElement(
                _recharts.BarChart,
                {
                    width: 580,
                    height: 350,
                    data: data,
                    margin: { left: 0 }
                },
                _react2.default.createElement(_recharts.XAxis, { dataKey: "name" }),
                _react2.default.createElement(_recharts.YAxis, null),
                _react2.default.createElement(_recharts.CartesianGrid, { strokeDasharray: "3 3" }),
                _react2.default.createElement(_recharts.Tooltip, null),
                _react2.default.createElement(_recharts.Legend, null),
                getBars()
            )
        )
    );
};

Chart.propTypes = {
    title: _propTypes2.default.string.isRequired,
    bars: _propTypes2.default.array.isRequired,
    data: _propTypes2.default.array.isRequired
};

exports.default = Chart;