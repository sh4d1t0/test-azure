// @flow
import {
    getCurrencyFormat,
    getDateFormat,
    getLinkFormat,
    getPercentageFormat,
    getRenderBoolean
} from "../util/formats";
import _ from "underscore";
import update from "immutability-helper";

export const getLimitPage = (
        lengthNextData: number,
        rowSize: number
    ): number => {
        let limitPage = parseInt(lengthNextData / rowSize, 10);

        if (lengthNextData % 10 !== 0) {
            limitPage += 1;
        }
        return limitPage;
    },
    getRowsWithCurrentPage = (
        rows: [],
        currentPage: number,
        rowSize: number
    ): [] => {
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
    },
    getRowsWithFilterText = (rows: [], headers: [], filterText: string): [] => {
        return rows.filter(row => {
            for (let i = 0; i < headers.length; i += 1) {
                const { key, sortable } = headers[i];

                if (
                    typeof row[key] !== "undefined" &&
                    row[key] !== null &&
                    sortable
                ) {
                    let stringValue = row[key].toString();
                    stringValue = stringValue.toLowerCase();

                    if (stringValue.includes(filterText)) {
                        return true;
                    }
                }
            }

            return false;
        });
    },
    getRowsWithFormat = (rows: [], headers: []): [] => {
        return rows.map(row => {
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
                            $set: getDateFormat({
                                format: format,
                                isUnix: unix,
                                value: row[key]
                            })
                        }
                    });
                }

                if (type === "boolean") {
                    row = update(row, {
                        [key]: {
                            $set: row[key] ? renderTrueAs : renderFalseAs
                        }
                    });
                }

                if (type === "currency") {
                    row = update(row, {
                        [key]: {
                            $set: getCurrencyFormat(row[key])
                        }
                    });
                }

                if (type === "link") {
                    row = update(row, {
                        [key]: {
                            $set: getLinkFormat(row[key], labelBtn)
                        }
                    });
                }

                if (type === "percentage") {
                    row = update(row, {
                        [key]: {
                            $set: getPercentageFormat(row[key])
                        }
                    });
                }
            }

            return row;
        });
    },
    getRowsWithSort = (sortName: string, sortType: string, rows: []): [] => {
        let rowsSorted = _.sortBy(rows, sortName);

        if (sortType === "desc") {
            rowsSorted = rowsSorted.reverse();
        }

        return rowsSorted;
    },
    getSelectedByAttr = (rows: [], attrSelectable: string): [] => {
        let selected = [];

        rows.map((row, index) => {
            if (row[attrSelectable]) {
                selected.push(index);
            }
        });

        return selected;
    },
    getSelectedRowsOnDT = (rows: [], realSelections: []): [] => {
        let selected = [];

        rows.map((row, index) => {
            realSelections.map(rs => {
                if (row.index === rs) {
                    selected.push(index);
                }
            });
        });

        return selected;
    },
    pushElement = (rows: [], data: []): [] => {
        if (
            data.length > 0 &&
            !rows.find(row => row === data[data.length - 1])
        ) {
            rows = [...[data[data.length - 1]], ...rows];
            rows.pop();
        }

        return rows;
    },
    removeNotExist = (
        rows: [],
        realSelections: [],
        selectionOnPage: [],
        rowSize: number
    ): [] => {
        let indexNotExist,
            limit = 0;

        if (realSelections.length > 0) {
            if (rows.length < rowSize) {
                limit = rows.length;
            } else {
                limit = rowSize;
            }

            for (let i = 0; i < limit; i += 1) {
                if (typeof selectionOnPage.find(s => i === s) === "undefined") {
                    indexNotExist = realSelections.indexOf(rows[i].index);

                    if (indexNotExist > -1) {
                        realSelections.splice(indexNotExist, 1);
                    }
                }
            }
        }

        return realSelections;
    };
