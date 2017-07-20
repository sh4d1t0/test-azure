"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeNotExist = exports.pushElement = exports.getSelectedRowsOnDT = exports.getSelectedByAttr = exports.getRowsWithFormat = exports.getRowsWithFilterText = exports.getRowsWithCurrentPage = exports.getLimitPage = undefined;

var _formats = require("../util/formats");

var _immutabilityHelper = require("immutability-helper");

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getLimitPage = exports.getLimitPage = function getLimitPage(lengthNextData, rowSize) {

    var limitPage = parseInt(lengthNextData / rowSize, 10);

    if (lengthNextData % 10 !== 0) {

        limitPage += 1;
    }
    return limitPage;
},
    getRowsWithCurrentPage = exports.getRowsWithCurrentPage = function getRowsWithCurrentPage(rows, currentPage, rowSize) {

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
},
    getRowsWithFilterText = exports.getRowsWithFilterText = function getRowsWithFilterText(rows, headers, filterText) {

    return rows.filter(function (row) {

        for (var i = 0; i < headers.length; i += 1) {
            var _headers$i = headers[i],
                key = _headers$i.key,
                sortable = _headers$i.sortable;


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
},
    getRowsWithFormat = exports.getRowsWithFormat = function getRowsWithFormat(rows, headers) {

    return rows.map(function (row) {

        for (var i = 0; i < headers.length; i += 1) {
            var _headers$i2 = headers[i],
                key = _headers$i2.key,
                type = _headers$i2.type,
                labelBtn = _headers$i2.labelBtn,
                format = _headers$i2.format,
                unix = _headers$i2.unix,
                _headers$i2$renderFal = _headers$i2.renderFalseAs,
                renderFalseAs = _headers$i2$renderFal === undefined ? (0, _formats.getRenderBoolean)() : _headers$i2$renderFal,
                _headers$i2$renderTru = _headers$i2.renderTrueAs,
                renderTrueAs = _headers$i2$renderTru === undefined ? (0, _formats.getRenderBoolean)(true) : _headers$i2$renderTru;


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
},
    getSelectedByAttr = exports.getSelectedByAttr = function getSelectedByAttr(rows, attrSelectable) {

    var selected = [];

    rows.map(function (row, index) {

        if (row[attrSelectable]) {

            selected.push(index);
        }
    });

    return selected;
},
    getSelectedRowsOnDT = exports.getSelectedRowsOnDT = function getSelectedRowsOnDT(rows, realSelections) {

    var selected = [];

    rows.map(function (row, index) {

        realSelections.map(function (rs) {

            if (row.index === rs) {

                selected.push(index);
            }
        });
    });

    return selected;
},
    pushElement = exports.pushElement = function pushElement(rows, data) {

    if (data.length > 0 && !rows.find(function (row) {
        return row === data[data.length - 1];
    })) {

        rows = [data[data.length - 1]].concat(_toConsumableArray(rows));
        rows.pop();
    }

    return rows;
},
    removeNotExist = exports.removeNotExist = function removeNotExist(rows, realSelections, selectionOnPage, rowSize) {

    var indexNotExist = void 0,
        limit = 0;

    if (realSelections.length > 0) {

        if (rows.length < rowSize) {

            limit = rows.length;
        } else {

            limit = rowSize;
        }

        var _loop = function _loop(i) {

            if (typeof selectionOnPage.find(function (s) {
                return i === s;
            }) === "undefined") {

                indexNotExist = realSelections.indexOf(rows[i].index);

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