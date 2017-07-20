"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUiDatatables = require("material-ui-datatables");

var _materialUiDatatables2 = _interopRequireDefault(_materialUiDatatables);

var _Card = require("material-ui/Card");

var _dataTableUtil = require("./dataTableUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = function (_Component) {
    _inherits(DataTable, _Component);

    function DataTable(props, context) {
        _classCallCheck(this, DataTable);

        var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.handleChangeValueFilter = _this.handleChangeValueFilter.bind(_this);
        _this.handlePrevPage = _this.handlePrevPage.bind(_this);
        _this.handleNextPage = _this.handleNextPage.bind(_this);
        _this.handleRowSelect = _this.handleRowSelect.bind(_this);
        _this.handleSortOrderChange = _this.handleSortOrderChange.bind(_this);
        _this.handleChangeRowSize = _this.handleChangeRowSize.bind(_this);
        _this.oneElementAdded = false;
        _this.rows = [];

        var rowSizeList = [5, 10, 15, 20];

        var size = rowSizeList.find(function (i) {
            return i === _this.props.rowSize;
        });

        if (typeof size === "undefined") {

            size = rowSizeList[0];
        }

        _this.state = {
            "currentPage": 1,
            "rowSize": size,
            "rowSizeList": rowSizeList,
            "filterText": "",
            "limitPage": (0, _dataTableUtil.getLimitPage)(_this.props.data.length, size),
            "realSelections": _this.getInitialSelected()
        };

        return _this;
    }

    return DataTable;
}(_react.Component);

DataTable.propTypes = {
    "onRowSelection": _propTypes2.default.func,
    "selectable": _propTypes2.default.bool,
    "selectableManually": _propTypes2.default.bool,
    "resetSelected": _propTypes2.default.bool,
    "attrSelectable": _propTypes2.default.string,
    "card": _propTypes2.default.bool,
    "rowSize": _propTypes2.default.number,
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
    "rowSize": 5,
    "card": true,
    "showCheckboxes": false,
    "resetSelected": false,
    "selectableManually": false,
    "showHeaderToolbar": true,
    "showFooterToolbar": true,
    "enableSelectAll": false,
    "multiSelectable": false
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.componentWillUpdate = function (nextProps) {
        var data = nextProps.data,
            resetSelected = nextProps.resetSelected,
            lengthCurrentData = _this2.props.data.length,
            lengthNextData = data.length,
            rowSize = _this2.state.rowSize;


        if (resetSelected !== _this2.props.resetSelected) {

            _this2.setState({
                "realSelections": []
            });
        }

        if (lengthNextData !== lengthCurrentData) {

            var page = void 0;

            switch (lengthNextData - lengthCurrentData) {

                case 1:
                    page = _this2.state.currentPage;
                    _this2.oneElementAdded = true;
                    break;

                case -1:
                    page = _this2.state.currentPage;
                    _this2.oneElementAdded = true;
                    break;

                default:
                    page = 1;
                    _this2.oneElementAdded = false;
                    break;

            }

            _this2.setState({
                "limitPage": (0, _dataTableUtil.getLimitPage)(data.length, rowSize),
                "currentPage": page,
                "filterText": "",
                "realSelections": _this2.getInitialSelected()
            });
        }
    };

    this.getInitialSelected = function () {
        var _props = _this2.props,
            selectableManually = _props.selectableManually,
            data = _props.data,
            attrSelectable = _props.attrSelectable;


        var selections = [];

        if (selectableManually) {

            selections = (0, _dataTableUtil.getSelectedByAttr)(data, attrSelectable);
        }

        return selections;
    };

    this.handleNextPage = function () {
        var _state = _this2.state,
            currentPage = _state.currentPage,
            limitPage = _state.limitPage;


        if (currentPage + 1 > limitPage) {

            return;
        }
        _this2.oneElementAdded = false;
        _this2.setState({ "currentPage": currentPage + 1 });
    };

    this.handlePrevPage = function () {
        var currentPage = _this2.state.currentPage;


        if (currentPage - 1 <= 0) {

            return;
        }
        _this2.oneElementAdded = false;
        _this2.setState({ "currentPage": currentPage - 1 });
    };

    this.handleChangeValueFilter = function (value) {

        _this2.oneElementAdded = false;
        _this2.setState({
            "currentPage": 1,
            "filterText": value.trim().toLowerCase()
        });
    };

    this.handleChangeRowSize = function (index) {
        var _state2 = _this2.state,
            rowSizeList = _state2.rowSizeList,
            currentPage = _state2.currentPage,
            data = _this2.props.data;


        var limit = (0, _dataTableUtil.getLimitPage)(data.length, rowSizeList[index]),
            obj = {
            "rowSize": rowSizeList[index],
            "limitPage": limit
        };

        if (currentPage > limit) {

            obj.currentPage = limit;
        }

        _this2.setState(obj);
    };

    this.handleSortOrderChange = function () {};

    this.handleRowSelect = function (selection) {
        var _props2 = _this2.props,
            onRowSelection = _props2.onRowSelection,
            data = _props2.data,
            selectableManually = _props2.selectableManually;
        var _state3 = _this2.state,
            realSelections = _state3.realSelections,
            rowSize = _state3.rowSize,
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

                        if (_this2.rows[item].index === index) {

                            realSelections.push(index);
                        }
                    });
                });
                break;

        }

        realSelections = [].concat(_toConsumableArray(new Set(realSelections)));

        if (!responseArray) {

            onRowSelection(selection);
        } else {

            realSelections = (0, _dataTableUtil.removeNotExist)(_this2.rows, realSelections, selection, rowSize);
            onRowSelection(realSelections);
        }

        if (!selectableManually) {

            _this2.setState({ realSelections: realSelections });
        }
    };

    this.getTable = function () {
        var _props3 = _this2.props,
            title = _props3.title,
            selectable = _props3.selectable,
            headers = _props3.headers,
            data = _props3.data,
            attrSelectable = _props3.attrSelectable,
            showCheckboxes = _props3.showCheckboxes,
            selectableManually = _props3.selectableManually,
            enableSelectAll = _props3.enableSelectAll,
            multiSelectable = _props3.multiSelectable,
            showFooterToolbar = _props3.showFooterToolbar,
            showHeaderToolbar = _props3.showHeaderToolbar,
            _state4 = _this2.state,
            currentPage = _state4.currentPage,
            rowSize = _state4.rowSize,
            filterText = _state4.filterText,
            realSelections = _state4.realSelections,
            rowSizeList = _state4.rowSizeList;


        var selectedRows = [];

        if (data instanceof Array) {

            _this2.rows = data.map(function (d, index) {
                return Object.assign({}, d, { index: index });
            });
        } else {

            _this2.rows = [];
        }

        if (filterText.length > 0) {

            _this2.rows = (0, _dataTableUtil.getRowsWithFilterText)(_this2.rows, headers, filterText);
        }

        _this2.rows = (0, _dataTableUtil.getRowsWithCurrentPage)(_this2.rows, currentPage, rowSize);

        if (_this2.oneElementAdded) {

            _this2.rows = (0, _dataTableUtil.pushElement)(_this2.rows, data);
        }

        _this2.rows = (0, _dataTableUtil.getRowsWithFormat)(_this2.rows, headers);

        if (selectable) {

            if (selectableManually) {

                selectedRows = (0, _dataTableUtil.getSelectedByAttr)(_this2.rows, attrSelectable);
            } else {

                selectedRows = (0, _dataTableUtil.getSelectedRowsOnDT)(_this2.rows, realSelections);
            }
        }

        return _react2.default.createElement(_materialUiDatatables2.default, {
            height: "auto",
            selectable: selectable,
            showRowHover: true,
            columns: headers,
            data: _this2.rows,
            tableBodyStyle: { "overflowX": "auto", "maxHeight": "350px", "overflowY": "auto" },
            showCheckboxes: showCheckboxes,
            enableSelectAll: enableSelectAll,
            multiSelectable: multiSelectable,
            showHeaderToolbar: showHeaderToolbar,
            onRowSelection: _this2.handleRowSelect,
            tableStyle: { "tableLayout": "auto" },
            onFilterValueChange: _this2.handleChangeValueFilter,
            page: currentPage,
            filterHintText: "Buscar en la tabla",
            count: data.length,
            selectedRows: selectedRows,
            rowSize: rowSize,
            rowSizeLabel: "Registros por página",
            rowSizeList: rowSizeList,
            showRowSizeControls: true,
            showFooterToolbar: showFooterToolbar,
            onRowSizeChange: _this2.handleChangeRowSize,
            onSortOrderChange: _this2.handleSortOrderChange,
            onNextPageClick: _this2.handleNextPage,
            onPreviousPageClick: _this2.handlePrevPage,
            title: title && title });
    };

    this.render = function () {
        var card = _this2.props.card;


        return _react2.default.createElement(
            "div",
            null,
            card && _react2.default.createElement(_Card.Card, { style: { "margin": 12 },
                children: _this2.getTable() }),
            !card && _this2.getTable()
        );
    };
};

exports.default = DataTable;