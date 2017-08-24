"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Drawer = require("material-ui/Drawer");

var _Drawer2 = _interopRequireDefault(_Drawer);

var _Divider = require("material-ui/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _Subheader = require("material-ui/Subheader");

var _Subheader2 = _interopRequireDefault(_Subheader);

var _List = require("material-ui/List");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawer = function drawer(_ref) {
    var open = _ref.open,
        onRequestChange = _ref.onRequestChange,
        _onTouchTap = _ref.onTouchTap,
        logoHeader = _ref.logoHeader,
        logoFooter = _ref.logoFooter,
        showAllItems = _ref.showAllItems,
        listItems = _ref.listItems;

    var items = void 0;

    var buildItems = function buildItems() {
        var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        return list.map(function (item, i) {
            var styleListItem = { display: "none" };

            if (item.subheader) {
                if (!showAllItems && item.show) {
                    styleListItem.display = "block";
                }
                if (showAllItems) {
                    styleListItem.display = "block";
                }
                return _react2.default.createElement(
                    "div",
                    { key: "div-drawer-li-" + i, style: styleListItem },
                    _react2.default.createElement(_Divider2.default, null),
                    _react2.default.createElement(
                        _Subheader2.default,
                        null,
                        item.subheader
                    )
                );
            }

            if (!showAllItems && item.show) {
                styleListItem.display = "block";
            }
            if (showAllItems) {
                styleListItem.display = "block";
            }
            if (item.type === "button") {
                styleListItem.display = "none";
            }

            return _react2.default.createElement(_List.ListItem, {
                key: "item-drawer-li-" + i,
                primaryText: item.primaryText,
                style: styleListItem,
                leftIcon: item.leftIcon,
                onTouchTap: function onTouchTap() {
                    _onTouchTap(item);
                },
                nestedItems: buildItems(item.nestedItems)
            });
        });
    };

    items = buildItems(listItems);

    return _react2.default.createElement(
        _Drawer2.default,
        {
            docked: false,
            open: open,
            width: 380,
            onRequestChange: onRequestChange
        },
        logoHeader && _react2.default.createElement(
            "div",
            { className: "mn-img-drawer-header" },
            _react2.default.createElement("img", { src: logoHeader, alt: "m\xE1s n\xF3mina" })
        ),
        _react2.default.createElement(
            "div",
            { className: "mn-img-drawer-items" },
            items
        ),
        _react2.default.createElement(_Divider2.default, null),
        logoFooter && _react2.default.createElement(
            "div",
            { className: "mn-img-drawer-footer" },
            _react2.default.createElement("img", { src: logoFooter, alt: "sif" })
        )
    );
};

drawer.propTypes = {
    open: _propTypes2.default.bool.isRequired,
    onRequestChange: _propTypes2.default.func.isRequired,
    onTouchTap: _propTypes2.default.func.isRequired,
    logoHeader: _propTypes2.default.string.isRequired,
    logoFooter: _propTypes2.default.string.isRequired,
    listItems: _propTypes2.default.array.isRequired,
    showAllItems: _propTypes2.default.bool
};

drawer.defaultProps = {
    showAllItems: false
};

exports.default = drawer;