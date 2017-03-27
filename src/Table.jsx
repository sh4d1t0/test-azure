import React, {PropTypes} from "react";
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow} from "material-ui/Table";

const TableUI = (props = {
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
}) => {

    const {
            height,
            fixedHeader,
            fixedFooter,
            selectable,
            multiSelectable,
            showCheckboxes,
            enableSelectAll,
            deselectOnClickaway,
            showRowHover,
            stripedRows,
            tableHeaders
        } = props,
        buildHeaders = () => {

            return tableHeaders.map((th, i) => {

                return <TableHeaderColumn
                    key={`td-th-${i}`}
                    tooltip={th.tooltip}>{th.label}</TableHeaderColumn>;

            });

        };


    return (
        <div>
            {
                tableHeaders && tableHeaders.length &&
                <Table
                    height={height}
                    fixedHeader={fixedHeader}
                    fixedFooter={fixedFooter}
                    selectable={selectable}
                    multiSelectable={multiSelectable}>

                    <TableHeader
                        displaySelectAll={showCheckboxes}
                        adjustForCheckbox={showCheckboxes}
                        enableSelectAll={enableSelectAll}>

                        <TableRow>
                            {buildHeaders()}
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        displayRowCheckbox={showCheckboxes}
                        deselectOnClickaway={deselectOnClickaway}
                        showRowHover={showRowHover}
                        stripedRows={stripedRows}>
                        {props.children}
                    </TableBody>

                    <TableFooter
                        adjustForCheckbox={showCheckboxes}>

                    </TableFooter>

                </Table>
            }
        </div>
    );

};

TableUI.propTypes = {
    "height": PropTypes.string,
    "fixedHeader": PropTypes.bool,
    "fixedFooter": PropTypes.bool,
    "selectable": PropTypes.bool,
    "multiSelectable": PropTypes.bool,
    "showCheckboxes": PropTypes.bool,
    "enableSelectAll": PropTypes.bool,
    "deselectOnClickaway": PropTypes.bool,
    "showRowHover": PropTypes.bool,
    "stripedRows": PropTypes.bool,
    "tableHeaders": PropTypes.array.isRequired,
    "children": PropTypes.node
};

export default TableUI;
