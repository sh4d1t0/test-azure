// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import DataTables from "material-ui-datatables";
import { Card } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import DownloadIcon from "material-ui/svg-icons/file/file-download";
import {
    getLimitPage,
    getRowsWithCurrentPage,
    getRowsWithFilterText,
    getRowsWithFormat,
    getRowsWithSort,
    getSelectedByAttr,
    getSelectedRowsOnDT,
    pushElement,
    removeNotExist
} from "./dataTableUtil";
import { getCSV } from "../util/files";

export default class DataTable extends Component {
    rows: [];
    oneElementAdded: boolean;
    state: {
        realSelections: [],
        rowSize: number,
        currentPage: number,
        sortName: string,
        sortType: string,
        currentPage: number,
        limitPage: number,
        filterText: string
    };

    static propTypes = {
        onRowSelection: PropTypes.func,
        selectable: PropTypes.bool,
        selectableManually: PropTypes.bool,
        resetSelected: PropTypes.bool,
        attrSelectable: PropTypes.string,
        card: PropTypes.bool,
        scrollbar: PropTypes.bool,
        exportCSV: PropTypes.bool,
        rowSize: PropTypes.number,
        showHeaderToolbar: PropTypes.bool,
        enableSelectAll: PropTypes.bool,
        pagination: PropTypes.bool,
        showCheckboxes: PropTypes.bool,
        showFooterToolbar: PropTypes.bool,
        multiSelectable: PropTypes.bool,
        title: PropTypes.string,
        titleFileCSV: PropTypes.string,
        data: PropTypes.array.isRequired,
        rowSizeList: PropTypes.arrayOf(PropTypes.number),
        headers: PropTypes.array.isRequired
    };
    static defaultProps = {
        data: [],
        selectable: false,
        scrollbar: true,
        pagination: true,
        exportCSV: true,
        titleFileCSV: "reporte",
        rowSize: 5,
        rowSizeList: [5, 10, 15, 20],
        card: true,
        showCheckboxes: false,
        resetSelected: false,
        selectableManually: false,
        showHeaderToolbar: true,
        showFooterToolbar: true,
        enableSelectAll: false,
        multiSelectable: false
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.handleChangeValueFilter = this.handleChangeValueFilter.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
        this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
        this.handleChangeRowSize = this.handleChangeRowSize.bind(this);
        this.oneElementAdded = false;
        this.rows = [];

        let { rowSizeList } = this.props;

        let size = rowSizeList.find(i => i === this.props.rowSize);

        if (typeof size === "undefined") {
            size = rowSizeList[0];
        }

        this.state = {
            currentPage: 1,
            rowSize: size,
            filterText: "",
            sortName: "",
            sortType: "",
            limitPage: getLimitPage(this.props.data.length, size),
            realSelections: this.getInitialSelected()
        };
    }

    componentWillUpdate = (nextProps: { data: [] }) => {
        const { data, resetSelected } = nextProps,
            lengthCurrentData = this.props.data.length,
            lengthNextData = data.length,
            { rowSize } = this.state;

        if (resetSelected !== this.props.resetSelected) {
            this.setState({
                realSelections: []
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
                limitPage: getLimitPage(data.length, rowSize),
                currentPage: page,
                filterText: "",
                realSelections: this.getInitialSelected()
            });
        }
    };

    getInitialSelected = () => {
        const { selectableManually, data, attrSelectable } = this.props;

        let selections = [];

        if (selectableManually) {
            selections = getSelectedByAttr(data, attrSelectable);
        }

        return selections;
    };

    handleNextPage = () => {
        const { currentPage, limitPage } = this.state;

        if (currentPage + 1 > limitPage) {
            return;
        }
        this.oneElementAdded = false;
        this.setState({ currentPage: currentPage + 1 });
    };

    handlePrevPage = () => {
        const { currentPage } = this.state;

        if (currentPage - 1 <= 0) {
            return;
        }
        this.oneElementAdded = false;
        this.setState({ currentPage: currentPage - 1 });
    };

    handleChangeValueFilter = (value: string) => {
        this.oneElementAdded = false;
        this.setState({
            currentPage: 1,
            filterText: value.trim().toLowerCase()
        });
    };

    handleChangeRowSize = (index: number) => {
        const { currentPage } = this.state,
            { data, rowSizeList } = this.props;

        let limit = getLimitPage(data.length, rowSizeList[index]),
            obj = {
                rowSize: rowSizeList[index],
                limitPage: limit
            };

        if (currentPage > limit) {
            obj.currentPage = limit;
        }

        this.setState(obj);
    };

    handleSortOrderChange = (a: string, b: string) =>
        this.setState({ sortName: a, sortType: b });

    handleRowSelect = selection => {
        const { onRowSelection, data, selectableManually } = this.props;

        let { realSelections, rowSize } = this.state,
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
            realSelections = removeNotExist(
                this.rows,
                realSelections,
                selection,
                rowSize
            );
            onRowSelection(realSelections);
        }

        if (!selectableManually) {
            this.setState({ realSelections });
        }
    };

    getTable = () => {
        const {
                title,
                selectable,
                headers,
                data,
                attrSelectable,
                showCheckboxes,
                selectableManually,
                pagination,
                enableSelectAll,
                titleFileCSV,
                multiSelectable,
                rowSizeList,
                exportCSV,
                scrollbar,
                showFooterToolbar,
                showHeaderToolbar
            } = this.props,
            {
                currentPage,
                rowSize,
                filterText,
                sortName,
                sortType,
                realSelections
            } = this.state;

        let scrollbarCSS: {
                overflowX: string,
                maxHeight: string,
                overflowY: string
            } = { overflowX: "auto" },
            selectedRows = [];

        if (data instanceof Array) {
            this.rows = data.map((d, index) => Object.assign({}, d, { index }));
        } else {
            this.rows = [];
        }

        if (sortName.length !== 0) {
            this.rows = getRowsWithSort(sortName, sortType, data);
        }

        if (filterText.length > 0) {
            this.rows = getRowsWithFilterText(this.rows, headers, filterText);
        }

        if (pagination) {
            this.rows = getRowsWithCurrentPage(this.rows, currentPage, rowSize);
        }

        if (this.oneElementAdded) {
            this.rows = pushElement(this.rows, data);
        }

        this.rows = getRowsWithFormat(this.rows, headers);

        if (selectable) {
            if (selectableManually) {
                selectedRows = getSelectedByAttr(this.rows, attrSelectable);
            } else {
                selectedRows = getSelectedRowsOnDT(this.rows, realSelections);
            }
        }

        if (scrollbar) {
            scrollbarCSS.maxHeight = "350px";
            scrollbarCSS.overflowY = "auto";
        }

        return (
            <DataTables
                height={"auto"}
                selectable={selectable}
                showRowHover={true}
                columns={headers.map(h => {
                    let w = { width: 250 };
                    return { ...h, ...w };
                })}
                data={this.rows}
                tableBodyStyle={scrollbarCSS}
                showCheckboxes={showCheckboxes}
                enableSelectAll={enableSelectAll}
                multiSelectable={multiSelectable}
                showHeaderToolbar={showHeaderToolbar}
                onRowSelection={this.handleRowSelect}
                tableStyle={{ tableLayout: "auto" }}
                onFilterValueChange={this.handleChangeValueFilter}
                page={currentPage}
                filterHintText={"Buscar en la tabla"}
                count={data.length}
                selectedRows={selectedRows}
                rowSize={rowSize}
                rowSizeLabel={"Registros por página"}
                rowSizeList={rowSizeList}
                showRowSizeControls={true}
                showFooterToolbar={pagination && showFooterToolbar}
                onRowSizeChange={this.handleChangeRowSize}
                onSortOrderChange={this.handleSortOrderChange}
                onNextPageClick={this.handleNextPage}
                onPreviousPageClick={this.handlePrevPage}
                toolbarIconRight={
                    exportCSV &&
                    <IconButton
                        tooltip="Descargar excel"
                        onTouchTap={() => {
                            getCSV(data, headers, titleFileCSV);
                        }}
                    >
                        <DownloadIcon />
                    </IconButton>
                }
                title={title && title}
            />
        );
    };

    render = () => {
        const { card } = this.props;

        return (
            <div>
                {card &&
                    <Card style={{ margin: 12 }} children={this.getTable()} />}

                {!card && this.getTable()}
            </div>
        );
    };
}
