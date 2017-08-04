"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IconMenu = require("material-ui/IconMenu");

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _IconButton = require("material-ui/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _moreVert = require("material-ui/svg-icons/navigation/more-vert");

var _moreVert2 = _interopRequireDefault(_moreVert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Pinta un menú deslisable
 * @param {{}} props : opciones para configuración
 * @return {{jsx}} : componente icon menu
 */
var IconMenu = function IconMenu(props) {
    var _props$anchorOrigin = props.anchorOrigin,
        anchorOrigin = _props$anchorOrigin === undefined ? { horizontal: "left", vertical: "top" } : _props$anchorOrigin,
        _props$targetOrigin = props.targetOrigin,
        targetOrigin = _props$targetOrigin === undefined ? { horizontal: "left", vertical: "top" } : _props$targetOrigin,
        listOptions = props.listOptions,
        rowId = props.rowId;


    var items = [];

    var buildItems = function buildItems(list) {
        return list && list.length && list.map(function (item, i) {
            return _react2.default.createElement(_MenuItem2.default, {
                key: "menu-" + rowId + "-" + i,
                primaryText: item.primaryText,
                rightIcon: item.rightIcon && item.rightIcon,
                leftIcon: item.leftIcon && item.leftIcon,
                onTouchTap: function onTouchTap() {
                    item.onTouchTap(rowId);
                },
                menuItems: buildItems(item.menuItems)
            });
        });
    };

    items = buildItems(listOptions);

    return _react2.default.createElement(
        _IconMenu2.default,
        {
            iconButtonElement: _react2.default.createElement(
                _IconButton2.default,
                null,
                _react2.default.createElement(_moreVert2.default, null)
            ),
            anchorOrigin: anchorOrigin,
            targetOrigin: targetOrigin
        },
        items
    );
};

IconMenu.propTypes = {
    listOptions: _propTypes2.default.array.isRequired,
    rowId: _propTypes2.default.any.isRequired,
    anchorOrigin: _propTypes2.default.object,
    targetOrigin: _propTypes2.default.object
};

exports.default = IconMenu;