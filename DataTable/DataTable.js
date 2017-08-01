"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _initialiseProps;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUiDatatables = require("material-ui-datatables");

var _materialUiDatatables2 = _interopRequireDefault(_materialUiDatatables);

var _Card = require("material-ui/Card");

var _IconButton = require("material-ui/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _fileDownload = require("material-ui/svg-icons/file/file-download");

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _dataTableUtil = require("./dataTableUtil");

var _files = require("../util/files");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataTable = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(DataTable, _Component);

    function DataTable(props, context) {
        (0, _classCallCheck3.default)(this, DataTable);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.handleChangeValueFilter = _this.handleChangeValueFilter.bind(_this);
        _this.handlePrevPage = _this.handlePrevPage.bind(_this);
        _this.handleNextPage = _this.handleNextPage.bind(_this);
        _this.handleRowSelect = _this.handleRowSelect.bind(_this);
        _this.handleSortOrderChange = _this.handleSortOrderChange.bind(_this);
        _this.handleChangeRowSize = _this.handleChangeRowSize.bind(_this);
        _this.oneElementAdded = false;
        _this.rows = [];

        var rowSizeList = _this.props.rowSizeList;


        var size = rowSizeList.find(function (i) {
            return i === _this.props.rowSize;
        });

        if (typeof size === "undefined") {

            size = rowSizeList[0];
        }

        _this.state = {
            "currentPage": 1,
            "rowSize": size,
            "filterText": "",
            "sortName": "",
            "sortType": "",
            "limitPage": (0, _dataTableUtil.getLimitPage)(_this.props.data.length, size),
            "realSelections": _this.getInitialSelected()
        };

        return _this;
    }

    return DataTable;
}(_react.Component), _class.propTypes = {
    "onRowSelection": _propTypes2.default.func,
    "selectable": _propTypes2.default.bool,
    "selectableManually": _propTypes2.default.bool,
    "resetSelected": _propTypes2.default.bool,
    "attrSelectable": _propTypes2.default.string,
    "card": _propTypes2.default.bool,
    "scrollbar": _propTypes2.default.bool,
    "exportCSV": _propTypes2.default.bool,
    "rowSize": _propTypes2.default.number,
    "showHeaderToolbar": _propTypes2.default.bool,
    "enableSelectAll": _propTypes2.default.bool,
    "pagination": _propTypes2.default.bool,
    "showCheckboxes": _propTypes2.default.bool,
    "showFooterToolbar": _propTypes2.default.bool,
    "multiSelectable": _propTypes2.default.bool,
    "title": _propTypes2.default.string,
    "titleFileCSV": _propTypes2.default.string,
    "data": _propTypes2.default.array.isRequired,
    "rowSizeList": _propTypes2.default.arrayOf(_propTypes2.default.number),
    "headers": _propTypes2.default.array.isRequired
}, _class.defaultProps = {
    "data": [],
    "selectable": false,
    "scrollbar": true,
    "pagination": true,
    "exportCSV": true,
    "titleFileCSV": "reporte",
    "rowSize": 5,
    "rowSizeList": [5, 10, 15, 20],
    "card": true,
    "showCheckboxes": false,
    "resetSelected": false,
    "selectableManually": false,
    "showHeaderToolbar": true,
    "showFooterToolbar": true,
    "enableSelectAll": false,
    "multiSelectable": false
}, _initialiseProps = function _initialiseProps() {
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
        var currentPage = _this2.state.currentPage,
            _props2 = _this2.props,
            data = _props2.data,
            rowSizeList = _props2.rowSizeList;


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

    this.handleSortOrderChange = function (a, b) {
        return _this2.setState({ "sortName": a, "sortType": b });
    };

    this.handleRowSelect = function (selection) {
        var _props3 = _this2.props,
            onRowSelection = _props3.onRowSelection,
            data = _props3.data,
            selectableManually = _props3.selectableManually;
        var _state2 = _this2.state,
            realSelections = _state2.realSelections,
            rowSize = _state2.rowSize,
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

        realSelections = [].concat((0, _toConsumableArray3.default)(new Set(realSelections)));

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
        var _props4 = _this2.props,
            title = _props4.title,
            selectable = _props4.selectable,
            headers = _props4.headers,
            data = _props4.data,
            attrSelectable = _props4.attrSelectable,
            showCheckboxes = _props4.showCheckboxes,
            selectableManually = _props4.selectableManually,
            pagination = _props4.pagination,
            enableSelectAll = _props4.enableSelectAll,
            titleFileCSV = _props4.titleFileCSV,
            multiSelectable = _props4.multiSelectable,
            rowSizeList = _props4.rowSizeList,
            exportCSV = _props4.exportCSV,
            scrollbar = _props4.scrollbar,
            showFooterToolbar = _props4.showFooterToolbar,
            showHeaderToolbar = _props4.showHeaderToolbar,
            _state3 = _this2.state,
            currentPage = _state3.currentPage,
            rowSize = _state3.rowSize,
            filterText = _state3.filterText,
            sortName = _state3.sortName,
            sortType = _state3.sortType,
            realSelections = _state3.realSelections;


        var scrollbarCSS = { "overflowX": "auto" },
            selectedRows = [];

        if (data instanceof Array) {

            _this2.rows = data.map(function (d, index) {
                return Object.assign({}, d, { index: index });
            });
        } else {

            _this2.rows = [];
        }

        if (sortName.length !== 0) {

            _this2.rows = (0, _dataTableUtil.getRowsWithSort)(sortName, sortType, data);
        }

        if (filterText.length > 0) {

            _this2.rows = (0, _dataTableUtil.getRowsWithFilterText)(_this2.rows, headers, filterText);
        }

        if (pagination) {

            _this2.rows = (0, _dataTableUtil.getRowsWithCurrentPage)(_this2.rows, currentPage, rowSize);
        }

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

        if (scrollbar) {

            scrollbarCSS.maxHeight = "350px";
            scrollbarCSS.overflowY = "auto";
        }

        return _react2.default.createElement(_materialUiDatatables2.default, {
            height: "auto",
            selectable: selectable,
            showRowHover: true,
            columns: headers.map(function (h) {

                var w = { "width": 250 };
                return (0, _extends3.default)({}, h, w);
            }),
            data: _this2.rows,
            tableBodyStyle: scrollbarCSS,
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
            showFooterToolbar: pagination && showFooterToolbar,
            onRowSizeChange: _this2.handleChangeRowSize,
            onSortOrderChange: _this2.handleSortOrderChange,
            onNextPageClick: _this2.handleNextPage,
            onPreviousPageClick: _this2.handlePrevPage,
            toolbarIconRight: exportCSV && _react2.default.createElement(
                _IconButton2.default,
                {
                    tooltip: "Descargar excel",
                    onTouchTap: function onTouchTap() {

                        (0, _files.getCSV)(data, headers, titleFileCSV);
                    } },
                _react2.default.createElement(_fileDownload2.default, null)
            ),
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
}, _temp);
exports.default = DataTable;