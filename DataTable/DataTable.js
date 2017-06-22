"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutabilityHelper = require("immutability-helper");

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _materialUiDatatables = require("material-ui-datatables");

var _materialUiDatatables2 = _interopRequireDefault(_materialUiDatatables);

var _Card = require("material-ui/Card");

var _formats = require("../util/formats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = function (_Component) {
    _inherits(DataTable, _Component);

    function DataTable(props, context) {
        _classCallCheck(this, DataTable);

        var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props, context));

        _this.state = {};

        _this.componentDidMount = function () {

            _this.setState({ "limitPage": _this.getInitialPage() });
        };

        _this.componentWillUpdate = function (nextProps) {
            var data = nextProps.data,
                lengthCurrentData = _this.props.data.length,
                lengthNextData = data.length;


            if (lengthNextData !== lengthCurrentData) {

                var page = void 0;

                switch (lengthNextData - lengthCurrentData) {

                    case 1:
                        page = _this.state.currentPage;
                        _this.oneElementAdded = true;
                        break;

                    case -1:
                        page = _this.state.currentPage;
                        _this.oneElementAdded = true;
                        break;

                    default:
                        page = 1;
                        _this.oneElementAdded = false;
                        break;

                }

                _this.setState({
                    "limitPage": _this.getInitialPage(),
                    "currentPage": page,
                    "filterText": "",
                    "realSelections": _this.getInitialSelected()
                });
            }
        };

        _this.getInitialPage = function () {
            var data = _this.props.data,
                rowSize = _this.state.rowSize,
                lengthNextData = data.length;


            var limitPage = parseInt(lengthNextData / rowSize, 10);

            if (lengthNextData % 10 !== 0) {

                limitPage += 1;
            }

            return limitPage;
        };

        _this.getInitialSelected = function () {
            var _this$props = _this.props,
                selectableManually = _this$props.selectableManually,
                data = _this$props.data;


            var selections = [];

            if (selectableManually) {

                selections = _this.getSelectedByAttr(data);
            }

            return selections;
        };

        _this.handleNextPage = function () {
            var _this$state = _this.state,
                currentPage = _this$state.currentPage,
                limitPage = _this$state.limitPage;


            if (currentPage + 1 > limitPage) {

                return;
            }
            _this.oneElementAdded = false;
            _this.setState({ "currentPage": currentPage + 1 });
        };

        _this.handlePrevPage = function () {
            var currentPage = _this.state.currentPage;


            if (currentPage - 1 <= 0) {

                return;
            }
            _this.oneElementAdded = false;
            _this.setState({ "currentPage": currentPage - 1 });
        };

        _this.handleChangeValueFilter = function (value) {

            _this.oneElementAdded = false;
            _this.setState({
                "currentPage": 1,
                "filterText": value.trim().toLowerCase()
            });
        };

        _this.handleChangeRowSize = function (index) {
            var rowSizeList = _this.state.rowSizeList;


            _this.setState({
                "rowSize": rowSizeList[index]
            });
        };

        _this.handleSortOrderChange = function (column, order) {};

        _this.handleRowSelect = function (selection) {
            var _this$props2 = _this.props,
                handleRowSelection = _this$props2.handleRowSelection,
                data = _this$props2.data,
                selectableManually = _this$props2.selectableManually;
            var realSelections = _this.state.realSelections,
                responseArray = false;


            switch (selection) {

                case "all":
                    data.map(function (d, index) {

                        realSelections.push(index);
                    });
                    break;

                case "none":
                    realSelections = [];
                    break;

                default:
                    responseArray = true;
                    selection.map(function (item) {

                        data.map(function (d, index) {

                            if (_this.rows[item].index === index) {

                                realSelections.push(index);
                            }
                        });
                    });
                    break;

            }

            realSelections = [].concat(_toConsumableArray(new Set(realSelections)));

            if (!responseArray) {

                handleRowSelection(selection);
            } else {

                realSelections = _this.removeNotExist(realSelections, selection);
                handleRowSelection(realSelections);
            }

            if (!selectableManually) {

                _this.setState({ realSelections: realSelections });
            }
        };

        _this.removeNotExist = function (realSelections, selectionOnPage) {
            var rowSize = _this.state.rowSize;


            var indexNotExist = void 0,
                limit = 0;

            if (realSelections.length > 0) {

                if (_this.rows.length < rowSize) {

                    limit = _this.rows.length;
                } else {

                    limit = rowSize;
                }

                var _loop = function _loop(i) {

                    if (typeof selectionOnPage.find(function (s) {
                        return i === s;
                    }) === "undefined") {

                        indexNotExist = realSelections.indexOf(_this.rows[i].index);

                        if (indexNotExist > -1) {

                            realSelections.splice(indexNotExist, 1);
                        }
                    }
                };

                for (var i = 0; i < limit; i += 1) {
                    _loop(i);
                }
            }

            return realSelections;
        };

        _this.getRowsWithFormat = function (rows) {
            var headers = _this.props.headers;


            return rows.map(function (row) {

                for (var i = 0; i < headers.length; i += 1) {
                    var _headers$i = headers[i],
                        key = _headers$i.key,
                        type = _headers$i.type,
                        labelBtn = _headers$i.labelBtn,
                        format = _headers$i.format,
                        unix = _headers$i.unix,
                        _headers$i$renderFals = _headers$i.renderFalseAs,
                        renderFalseAs = _headers$i$renderFals === undefined ? (0, _formats.getRenderBoolean)() : _headers$i$renderFals,
                        _headers$i$renderTrue = _headers$i.renderTrueAs,
                        renderTrueAs = _headers$i$renderTrue === undefined ? (0, _formats.getRenderBoolean)(true) : _headers$i$renderTrue;


                    if (type === "date" && row[key]) {

                        row = (0, _immutabilityHelper2.default)(row, _defineProperty({}, key, {
                            "$set": (0, _formats.getDateFormat)({
                                "format": format,
                                "isUnix": unix,
                                "value": row[key]
                            })
                        }));
                    }

                    if (type === "boolean") {

                        row = (0, _immutabilityHelper2.default)(row, _defineProperty({}, key, {
                            "$set": row[key] ? renderTrueAs : renderFalseAs
                        }));
                    }

                    if (type === "currency") {

                        row = (0, _immutabilityHelper2.default)(row, _defineProperty({}, key, {
                            "$set": (0, _formats.getCurrencyFormat)(row[key])
                        }));
                    }

                    if (type === "link") {

                        row = (0, _immutabilityHelper2.default)(row, _defineProperty({}, key, {
                            "$set": (0, _formats.getLinkFormat)(row[key], labelBtn)
                        }));
                    }
                }

                return row;
            });
        };

        _this.getRowsWithCurrentPage = function (rows) {
            var _this$state2 = _this.state,
                currentPage = _this$state2.currentPage,
                rowSize = _this$state2.rowSize;


            var indexFinal = rowSize,
                indexInitial = 0;

            if (currentPage === 1) {

                indexInitial = 0;
            } else {

                indexInitial = (currentPage - 1) * rowSize;
                indexFinal = currentPage * rowSize;
            }

            return rows.filter(function (row, index) {

                return index >= indexInitial && index < indexFinal;
            });
        };

        _this.getRowsWithFilterText = function (rows) {
            var headers = _this.props.headers,
                filterText = _this.state.filterText;


            return rows.filter(function (row) {

                for (var i = 0; i < headers.length; i += 1) {
                    var _headers$i2 = headers[i],
                        key = _headers$i2.key,
                        sortable = _headers$i2.sortable;


                    if (typeof row[key] !== "undefined" && sortable) {

                        var stringValue = row[key].toString();
                        stringValue = stringValue.toLowerCase();

                        if (stringValue.includes(filterText)) {

                            return true;
                        }
                    }
                }

                return false;
            });
        };

        _this.getSelectedRowsOnDT = function (rows) {
            var realSelections = _this.state.realSelections;


            var selected = [];

            rows.map(function (row, index) {

                realSelections.map(function (rs) {

                    if (row.index === rs) {

                        selected.push(index);
                    }
                });
            });

            return selected;
        };

        _this.getSelectedByAttr = function (rows) {
            var attrSelectable = _this.props.attrSelectable;


            var selected = [];

            rows.map(function (row, index) {

                if (row[attrSelectable]) {

                    selected.push(index);
                }
            });

            return selected;
        };

        _this.pushElement = function (rows) {
            var data = _this.props.data;


            if (data.length > 0 && !rows.find(function (row) {
                return row === data[data.length - 1];
            })) {

                rows = [data[data.length - 1]].concat(_toConsumableArray(rows));
                rows.pop();
            }

            return rows;
        };

        _this.getTable = function () {
            var _this$props3 = _this.props,
                title = _this$props3.title,
                selectable = _this$props3.selectable,
                headers = _this$props3.headers,
                data = _this$props3.data,
                showCheckboxes = _this$props3.showCheckboxes,
                selectableManually = _this$props3.selectableManually,
                enableSelectAll = _this$props3.enableSelectAll,
                multiSelectable = _this$props3.multiSelectable,
                showFooterToolbar = _this$props3.showFooterToolbar,
                showHeaderToolbar = _this$props3.showHeaderToolbar,
                _this$state3 = _this.state,
                currentPage = _this$state3.currentPage,
                rowSize = _this$state3.rowSize,
                filterText = _this$state3.filterText,
                rowSizeList = _this$state3.rowSizeList;


            var selectedRows = [];

            if (data instanceof Array) {

                _this.rows = data.map(function (d, index) {
                    return Object.assign({}, d, { index: index });
                });
            } else {

                _this.rows = [];
            }

            if (filterText.length > 0) {

                _this.rows = _this.getRowsWithFilterText(_this.rows);
            }

            _this.rows = _this.getRowsWithCurrentPage(_this.rows);

            if (_this.oneElementAdded) {

                _this.rows = _this.pushElement(_this.rows);
            }

            _this.rows = _this.getRowsWithFormat(_this.rows);

            if (selectable) {

                if (selectableManually) {

                    selectedRows = _this.getSelectedByAttr(_this.rows);
                } else {

                    selectedRows = _this.getSelectedRowsOnDT(_this.rows);
                }
            }

            return _react2.default.createElement(_materialUiDatatables2.default, {
                height: "auto",
                selectable: selectable,
                showRowHover: true,
                columns: headers,
                data: _this.rows,
                tableBodyStyle: { "overflowX": "auto" },
                showCheckboxes: showCheckboxes,
                enableSelectAll: enableSelectAll,
                multiSelectable: multiSelectable,
                showHeaderToolbar: showHeaderToolbar,
                onRowSelection: _this.handleRowSelect,
                tableStyle: { "tableLayout": "auto" },
                onFilterValueChange: _this.handleChangeValueFilter,
                page: currentPage,
                filterHintText: "Buscar en la tabla",
                count: data.length,
                selectedRows: selectedRows,
                rowSize: rowSize,
                rowSizeLabel: "Registros por página",
                rowSizeList: rowSizeList,
                showRowSizeControls: true,
                showFooterToolbar: showFooterToolbar,
                onRowSizeChange: _this.handleChangeRowSize,
                onSortOrderChange: _this.handleSortOrderChange,
                onNextPageClick: _this.handleNextPage,
                onPreviousPageClick: _this.handlePrevPage,
                title: title && title });
        };

        _this.render = function () {
            var card = _this.props.card;


            return _react2.default.createElement(
                "div",
                null,
                card && _react2.default.createElement(_Card.Card, { style: { "margin": 12 },
                    children: _this.getTable() }),
                !card && _this.getTable()
            );
        };

        _this.handleChangeValueFilter = _this.handleChangeValueFilter.bind(_this);
        _this.handlePrevPage = _this.handlePrevPage.bind(_this);
        _this.handleNextPage = _this.handleNextPage.bind(_this);
        _this.handleRowSelect = _this.handleRowSelect.bind(_this);
        _this.handleSortOrderChange = _this.handleSortOrderChange.bind(_this);
        _this.handleChangeRowSize = _this.handleChangeRowSize.bind(_this);
        _this.oneElementAdded = false;
        _this.rows = [];

        _this.state = {
            "currentPage": 1,
            "rowSize": 5,
            "rowSizeList": [5, 10, 15, 20],
            "filterText": "",
            "limitPage": 0,
            "realSelections": _this.getInitialSelected()
        };

        return _this;
    }

    return DataTable;
}(_react.Component);

exports.default = DataTable;


DataTable.propTypes = {
    "handleRowSelection": _propTypes2.default.func,
    "selectable": _propTypes2.default.bool,
    "selectableManually": _propTypes2.default.bool,
    "attrSelectable": _propTypes2.default.string,
    "card": _propTypes2.default.bool,
    "showHeaderToolbar": _propTypes2.default.bool,
    "enableSelectAll": _propTypes2.default.bool,
    "showCheckboxes": _propTypes2.default.bool,
    "showFooterToolbar": _propTypes2.default.bool,
    "multiSelectable": _propTypes2.default.bool,
    "title": _propTypes2.default.string,
    "data": _propTypes2.default.array.isRequired,
    "headers": _propTypes2.default.array.isRequired
};

DataTable.defaultProps = {
    "data": [],
    "selectable": false,
    "card": true,
    "showCheckboxes": false,
    "selectableManually": false,
    "showHeaderToolbar": true,
    "showFooterToolbar": true,
    "enableSelectAll": false,
    "multiSelectable": false
};