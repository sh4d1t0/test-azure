"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Drawer = require("material-ui/Drawer");

var _Drawer2 = _interopRequireDefault(_Drawer);

var _Divider = require("material-ui/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require("material-ui/List");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Componente que nos ayudará a pintar el menú, vertical-izquierdo
 * @param {boolean} open : Bandera útil para mostrar u ocultar el Drawer
 * @param {func} onRequestChange : Función que se
 * ejecuta cuando hay click en la parte oscura
 * @param {func} onTouchTap: Función que se ejecuta
 * cuando hay click en cada elemento del menú
 * @param {string} logoHeader : ruta de la imagen que
 * se pintará en el header del drawer
 * @param {string} logoFooter : ruta de la imagen que
 * se pintará en el footer del drawer
 * @param {[]} listItems : Array de opciones a pintar
 * en el menú/drawer
 * @return {XML} : Componente Drawer sin estado
 */
var drawer = function drawer(_ref) {
    var open = _ref.open,
        onRequestChange = _ref.onRequestChange,
        _onTouchTap = _ref.onTouchTap,
        logoHeader = _ref.logoHeader,
        logoFooter = _ref.logoFooter,
        listItems = _ref.listItems;


    var items = [];

    var buildItems = function buildItems(list) {

        return list && list.length && list.map(function (item, i) {

            return _react2.default.createElement(_List.ListItem, { key: "drawer-li-" + i,
                primaryText: item.primaryText,
                leftIcon: item.leftIcon,
                onTouchTap: function onTouchTap() {

                    _onTouchTap(item.link);
                },
                nestedItems: buildItems(item.nestedItems) });
        });
    };

    items = buildItems(listItems);

    return _react2.default.createElement(
        _Drawer2.default,
        {
            docked: false,
            open: open,
            onRequestChange: onRequestChange },
        logoHeader && _react2.default.createElement(
            "div",
            { className: "mn-img-drawer-header" },
            _react2.default.createElement("img", { src: logoHeader, alt: "m\xE1s n\xF3mina" })
        ),
        items,
        _react2.default.createElement(_Divider2.default, null),
        logoFooter && _react2.default.createElement(
            "div",
            { className: "mn-img-drawer-footer" },
            _react2.default.createElement("img", { src: logoFooter, alt: "sif" })
        )
    );
};

drawer.propTypes = {
    "open": _react.PropTypes.bool.isRequired,
    "onRequestChange": _react.PropTypes.func.isRequired,
    "onTouchTap": _react.PropTypes.func.isRequired,
    "logoHeader": _react.PropTypes.string.isRequired,
    "logoFooter": _react.PropTypes.string.isRequired,
    "listItems": _react.PropTypes.array.isRequired
};

exports.default = drawer;