"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tabs = require("material-ui/Tabs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function (_Component) {
    (0, _inherits3.default)(Tabs, _Component);

    function Tabs(props, context) {
        (0, _classCallCheck3.default)(this, Tabs);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props, context));

        _this.state = { indexCurrentTab: 0 };

        _this.handleOnChangeTab = function (e) {
            _this.setState({ indexCurrentTab: e });
        };

        _this.buildTabs = function () {
            var _this$props$tabs = _this.props.tabs,
                tabs = _this$props$tabs === undefined ? [] : _this$props$tabs;


            return tabs.map(function (tab, i) {
                return _react2.default.createElement(_Tabs.Tab, { key: "tab-tab-" + i, label: tab.label, value: i });
            });
        };

        _this.getBodyTab = function () {
            var tabs = _this.props.tabs,
                indexCurrentTab = _this.state.indexCurrentTab;


            if (tabs.length > 0) {
                return tabs[indexCurrentTab].body;
            }

            return "";
        };

        _this.render = function () {
            var indexCurrentTab = _this.state.indexCurrentTab,
                body = _this.getBodyTab(),
                tabs = _this.buildTabs();


            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _Tabs.Tabs,
                    {
                        onChange: _this.handleOnChangeTab,
                        value: indexCurrentTab,
                        style: {
                            position: "fixed",
                            left: "0",
                            zIndex: "1100",
                            top: "64px",
                            width: "100%"
                        }
                    },
                    tabs
                ),
                _react2.default.createElement(
                    "div",
                    { style: { position: "relative", marginTop: "64px" } },
                    body
                )
            );
        };

        _this.handleOnChangeTab = _this.handleOnChangeTab.bind(_this);
        return _this;
    }

    return Tabs;
}(_react.Component);

exports.default = Tabs;


Tabs.propTypes = {
    tabs: _propTypes2.default.array.isRequired
};