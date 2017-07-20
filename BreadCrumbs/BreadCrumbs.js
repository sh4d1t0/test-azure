"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FlatButton = require("material-ui/FlatButton");

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreadCrumbs = function BreadCrumbs(_ref) {
    var _ref$items = _ref.items,
        items = _ref$items === undefined ? [] : _ref$items,
        _onTouchTap = _ref.onTouchTap;


    return _react2.default.createElement(
        "div",
        { className: "row" },
        items.map(function (item, index) {

            if (item === null) {

                return;
            }

            var label = item.label,
                link = item.link;

            var styleItem = { "color": "rgba(255,255,255,0.7)" };

            if (index === items.length - 1) {

                styleItem.color = "#FFFFFF";
            }

            return _react2.default.createElement(
                "div",
                null,
                " >",
                _react2.default.createElement(_FlatButton2.default, {
                    key: "bread-crumb-" + index,
                    label: label,
                    onTouchTap: function onTouchTap() {

                        _onTouchTap(item);
                    },
                    disabled: typeof link === "undefined",
                    style: styleItem })
            );
        })
    );
};


BreadCrumbs.propTypes = {
    "onTouchTap": _propTypes2.default.func.isRequired,
    "items": _propTypes2.default.array.isRequired
};

exports.default = BreadCrumbs;