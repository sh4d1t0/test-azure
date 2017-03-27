"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Table = require("material-ui/Table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableUI = function TableUI() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        "fixedHeader": false,
        "fixedFooter": false,
        "selectable": false,
        "multiSelectable": false,
        "showCheckboxes": false,
        "enableSelectAll": false,
        "deselectOnClickaway": false,
        "showRowHover": false,
        "stripedRows": false,
        "tableHeaders": []
    };

    var height = props.height,
        fixedHeader = props.fixedHeader,
        fixedFooter = props.fixedFooter,
        selectable = props.selectable,
        multiSelectable = props.multiSelectable,
        showCheckboxes = props.showCheckboxes,
        enableSelectAll = props.enableSelectAll,
        deselectOnClickaway = props.deselectOnClickaway,
        showRowHover = props.showRowHover,
        stripedRows = props.stripedRows,
        tableHeaders = props.tableHeaders,
        buildHeaders = function buildHeaders() {

        return tableHeaders.map(function (th, i) {

            return _react2.default.createElement(
                _Table.TableHeaderColumn,
                {
                    key: "td-th-" + i,
                    tooltip: th.tooltip },
                th.label
            );
        });
    };

    return _react2.default.createElement(
        "div",
        null,
        tableHeaders && tableHeaders.length && _react2.default.createElement(
            _Table.Table,
            {
                height: height,
                fixedHeader: fixedHeader,
                fixedFooter: fixedFooter,
                selectable: selectable,
                multiSelectable: multiSelectable },
            _react2.default.createElement(
                _Table.TableHeader,
                {
                    displaySelectAll: showCheckboxes,
                    adjustForCheckbox: showCheckboxes,
                    enableSelectAll: enableSelectAll },
                _react2.default.createElement(
                    _Table.TableRow,
                    null,
                    buildHeaders()
                )
            ),
            _react2.default.createElement(
                _Table.TableBody,
                {
                    displayRowCheckbox: showCheckboxes,
                    deselectOnClickaway: deselectOnClickaway,
                    showRowHover: showRowHover,
                    stripedRows: stripedRows },
                props.children
            ),
            _react2.default.createElement(_Table.TableFooter, {
                adjustForCheckbox: showCheckboxes })
        )
    );
};

TableUI.propTypes = {
    "height": _react.PropTypes.string,
    "fixedHeader": _react.PropTypes.bool,
    "fixedFooter": _react.PropTypes.bool,
    "selectable": _react.PropTypes.bool,
    "multiSelectable": _react.PropTypes.bool,
    "showCheckboxes": _react.PropTypes.bool,
    "enableSelectAll": _react.PropTypes.bool,
    "deselectOnClickaway": _react.PropTypes.bool,
    "showRowHover": _react.PropTypes.bool,
    "stripedRows": _react.PropTypes.bool,
    "tableHeaders": _react.PropTypes.array.isRequired,
    "children": _react.PropTypes.node
};

exports.default = TableUI;