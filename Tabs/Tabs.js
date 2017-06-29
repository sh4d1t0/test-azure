"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tabs = require("material-ui/Tabs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs(props, context) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props, context));

        _this.state = { "indexCurrentTab": 0 };

        _this.handleOnChangeTab = function (e) {

            _this.setState({ "indexCurrentTab": e });
        };

        _this.buildTabs = function () {
            var _this$props$tabs = _this.props.tabs,
                tabs = _this$props$tabs === undefined ? [] : _this$props$tabs;


            return tabs.map(function (tab, i) {

                return _react2.default.createElement(_Tabs.Tab, { key: "tab-tab-" + i,
                    label: tab.label,
                    value: i });
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
                    { onChange: _this.handleOnChangeTab,
                        value: indexCurrentTab,
                        style: {
                            "position": "fixed",
                            "left": "0",
                            "zIndex": "3",
                            "top": "64px",
                            "width": "100%"
                        } },
                    tabs
                ),
                _react2.default.createElement(
                    "div",
                    { style: { "position": "relative", "margin-top": "64px" } },
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
    "tabs": _propTypes2.default.array.isRequired
};