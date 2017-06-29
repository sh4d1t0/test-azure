import React, {Component} from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import DataTables from "material-ui-datatables";
import {Card} from "material-ui/Card";
import {getCurrencyFormat, getDateFormat, getLinkFormat, getRenderBoolean} from "../util/formats";

export default class DataTable extends Component {

    state = {};

    constructor(props, context) {

        super(props, context);
        this.handleChangeValueFilter = this.handleChangeValueFilter.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
        this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
        this.handleChangeRowSize = this.handleChangeRowSize.bind(this);
        this.oneElementAdded = false;
        this.rows = [];

        let rowSizeList = [5, 10, 15, 20];

        this.state = {
            "currentPage": 1,
            "rowSize": rowSizeList[0],
            "rowSizeList": rowSizeList,
            "filterText": "",
            "limitPage": this.getLimitPage(this.props.data.length, rowSizeList[0]),
            "realSelections": this.getInitialSelected()
        };

    }

    componentWillUpdate = (nextProps) => {

        const {data, resetSelected} = nextProps,
            lengthCurrentData = this.props.data.length,
            lengthNextData = data.length,
            {rowSize} = this.state;

        if (resetSelected !== this.props.resetSelected) {

            this.setState({
                "realSelections": []
            });

        }

        if (lengthNextData !== lengthCurrentData) {

            let page;

            switch (lengthNextData - lengthCurrentData) {

                case 1:
                    page = this.state.currentPage;
                    this.oneElementAdded = true;
                    break;

                case -1:
                    page = this.state.currentPage;
                    this.oneElementAdded = true;
                    break;

                default:
                    page = 1;
                    this.oneElementAdded = false;
                    break;

            }

            this.setState({
                "limitPage": this.getLimitPage(data.length, rowSize),
                "currentPage": page,
                "filterText": "",
                "realSelections": this.getInitialSelected()
            });

        }

    };

    getLimitPage = (lengthNextData, rowSize) => {

        let limitPage = parseInt(lengthNextData / rowSize, 10);

        if (lengthNextData % 10 !== 0) {

            limitPage += 1;

        }
        return limitPage;

    };

    getInitialSelected = () => {

        const {selectableManually, data} = this.props;

        let selections = [];

        if (selectableManually) {

            selections = this.getSelectedByAttr(data);

        }

        return selections;

    };

    handleNextPage = () => {

        const {currentPage, limitPage} = this.state;

        if (currentPage + 1 > limitPage) {

            return;

        }
        this.oneElementAdded = false;
        this.setState({"currentPage": currentPage + 1});

    };

    handlePrevPage = () => {

        const {currentPage} = this.state;

        if (currentPage - 1 <= 0) {

            return;

        }
        this.oneElementAdded = false;
        this.setState({"currentPage": currentPage - 1});

    };

    handleChangeValueFilter = (value) => {

        this.oneElementAdded = false;
        this.setState({
            "currentPage": 1,
            "filterText": value.trim().toLowerCase()
        });

    };

    handleChangeRowSize = (index) => {

        const {rowSizeList, currentPage} = this.state,
            {data} = this.props;

        let limit = this.getLimitPage(data.length, rowSizeList[index]),
            obj = {
                "rowSize": rowSizeList[index],
                "limitPage": limit
            };

        if (currentPage > limit) {

            obj.currentPage = limit;

        }

        this.setState(obj);

    };

    handleSortOrderChange = (column, order) => {


    };

    handleRowSelect = (selection) => {

        const {onRowSelection, data, selectableManually} = this.props;

        let {realSelections} = this.state,
            responseArray = false;

        switch (selection) {

            case "all":
                data.map((d, index) => {

                    realSelections.push(index);

                });
                break;

            case "none":
                realSelections = [];
                break;

            default:
                responseArray = true;
                selection.map(item => {

                    data.map((d, index) => {

                        if (this.rows[item].index === index) {

                            realSelections.push(index);

                        }

                    });

                });
                break;

        }

        realSelections = [...new Set(realSelections)];

        if (!responseArray) {

            onRowSelection(selection);

        } else {

            realSelections = this.removeNotExist(realSelections, selection);
            onRowSelection(realSelections);

        }

        if (!selectableManually) {

            this.setState({realSelections});

        }

    };

    removeNotExist = (realSelections, selectionOnPage) => {

        const {rowSize} = this.state;

        let indexNotExist, limit = 0;

        if (realSelections.length > 0) {

            if (this.rows.length < rowSize) {

                limit = this.rows.length;

            } else {

                limit = rowSize;

            }

            for (let i = 0; i < limit; i += 1) {

                if (typeof selectionOnPage.find(s => i === s) === "undefined") {

                    indexNotExist = realSelections.indexOf(this.rows[i].index);

                    if (indexNotExist > -1) {

                        realSelections.splice(indexNotExist, 1);

                    }

                }

            }

        }

        return realSelections;

    };

    getRowsWithFormat = (rows) => {

        const {headers} = this.props;

        return rows.map((row) => {

            for (let i = 0; i < headers.length; i += 1) {

                const {
                    key,
                    type,
                    labelBtn,
                    format,
                    unix,
                    renderFalseAs = getRenderBoolean(),
                    renderTrueAs = getRenderBoolean(true)
                } = headers[i];

                if (type === "date" && row[key]) {

                    row = update(row, {
                        [key]: {
                            "$set": getDateFormat({
                                "format": format,
                                "isUnix": unix,
                                "value": row[key]
                            })
                        }
                    });

                }

                if (type === "boolean") {

                    row = update(row, {
                        [key]: {
                            "$set": row[key] ? renderTrueAs : renderFalseAs
                        }
                    });

                }

                if (type === "currency") {

                    row = update(row, {
                        [key]: {
                            "$set": getCurrencyFormat(row[key])
                        }
                    });

                }

                if (type === "link") {

                    row = update(row, {
                        [key]: {
                            "$set": getLinkFormat(row[key], labelBtn)
                        }
                    });

                }

            }

            return row;

        });

    };

    getRowsWithCurrentPage = (rows) => {

        const {currentPage, rowSize} = this.state;

        let indexFinal = rowSize,
            indexInitial = 0;

        if (currentPage === 1) {

            indexInitial = 0;

        } else {

            indexInitial = (currentPage - 1) * rowSize;
            indexFinal = currentPage * rowSize;

        }

        return rows.filter((row, index) => {

            return index >= indexInitial && index < indexFinal;

        });

    };

    getRowsWithFilterText = (rows) => {

        const {headers} = this.props,
            {filterText} = this.state;

        return rows.filter((row) => {

            for (let i = 0; i < headers.length; i += 1) {

                const {key, sortable} = headers[i];

                if (typeof row[key] !== "undefined" &&
                    sortable) {

                    let stringValue = row[key].toString();
                    stringValue = stringValue.toLowerCase();

                    if (stringValue.includes(filterText)) {

                        return true;

                    }

                }

            }

            return false;

        });

    };

    getSelectedRowsOnDT = (rows) => {

        const {realSelections} = this.state;

        let selected = [];

        rows.map((row, index) => {

            realSelections.map(rs => {

                if (row.index === rs) {

                    selected.push(index);

                }

            });

        });

        return selected;

    };

    getSelectedByAttr = (rows) => {

        const {attrSelectable} = this.props;

        let selected = [];

        rows.map((row, index) => {

            if (row[attrSelectable]) {

                selected.push(index);

            }

        });

        return selected;

    };

    pushElement = (rows) => {

        const {data} = this.props;

        if (data.length > 0 &&
            !rows.find(row => row === data[data.length - 1])) {

            rows = [...[data[data.length - 1]], ...rows];
            rows.pop();

        }

        return rows;

    };

    getTable = () => {

        const {
                title,
                selectable,
                headers,
                data,
                showCheckboxes,
                selectableManually,
                enableSelectAll,
                multiSelectable,
                showFooterToolbar,
                showHeaderToolbar
            } = this.props,
            {currentPage, rowSize, filterText, rowSizeList} = this.state;

        let selectedRows = [];

        if (data instanceof Array) {

            this.rows = data.map((d, index) => Object.assign({}, d, {index}));

        } else {

            this.rows = [];

        }

        if (filterText.length > 0) {

            this.rows = this.getRowsWithFilterText(this.rows);

        }

        this.rows = this.getRowsWithCurrentPage(this.rows);

        if (this.oneElementAdded) {

            this.rows = this.pushElement(this.rows);

        }

        this.rows = this.getRowsWithFormat(this.rows);

        if (selectable) {

            if (selectableManually) {

                selectedRows = this.getSelectedByAttr(this.rows);

            } else {

                selectedRows = this.getSelectedRowsOnDT(this.rows);

            }

        }

        return <DataTables
            height={"auto"}
            selectable={selectable}
            showRowHover={true}
            columns={headers}
            data={this.rows}
            tableBodyStyle={{"overflowX": "auto"}}
            showCheckboxes={showCheckboxes}
            enableSelectAll={enableSelectAll}
            multiSelectable={multiSelectable}
            showHeaderToolbar={showHeaderToolbar}
            onRowSelection={this.handleRowSelect}
            tableStyle={{"tableLayout": "auto"}}
            onFilterValueChange={this.handleChangeValueFilter}
            page={currentPage}
            filterHintText={"Buscar en la tabla"}
            count={data.length}
            selectedRows={selectedRows}
            rowSize={rowSize}
            rowSizeLabel={"Registros por página"}
            rowSizeList={rowSizeList}
            showRowSizeControls={true}
            showFooterToolbar={showFooterToolbar}
            onRowSizeChange={this.handleChangeRowSize}
            onSortOrderChange={this.handleSortOrderChange}
            onNextPageClick={this.handleNextPage}
            onPreviousPageClick={this.handlePrevPage}
            title={title && title}/>;

    };

    render = () => {

        const {card} = this.props;

        return <div>
            {
                card && <Card style={{"margin": 12}}
                              children={this.getTable()}/>
            }

            {
                !card && this.getTable()
            }

        </div>;

    };

}

DataTable.propTypes = {
    "onRowSelection": PropTypes.func,
    "selectable": PropTypes.bool,
    "selectableManually": PropTypes.bool,
    "resetSelected": PropTypes.bool,
    "attrSelectable": PropTypes.string,
    "card": PropTypes.bool,
    "showHeaderToolbar": PropTypes.bool,
    "enableSelectAll": PropTypes.bool,
    "showCheckboxes": PropTypes.bool,
    "showFooterToolbar": PropTypes.bool,
    "multiSelectable": PropTypes.bool,
    "title": PropTypes.string,
    "data": PropTypes.array.isRequired,
    "headers": PropTypes.array.isRequired
};

DataTable.defaultProps = {
    "data": [],
    "selectable": false,
    "card": true,
    "showCheckboxes": false,
    "resetSelected": false,
    "selectableManually": false,
    "showHeaderToolbar": true,
    "showFooterToolbar": true,
    "enableSelectAll": false,
    "multiSelectable": false
};
