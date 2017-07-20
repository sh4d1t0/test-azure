"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getValueFromInput = exports.getUnixDate = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUnixDate = exports.getUnixDate = function getUnixDate(value) {

    if ((typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) === "object") {

        return (0, _moment2.default)(value).unix();
    }

    return value;
},
    getValueFromInput = exports.getValueFromInput = function getValueFromInput(inputs, attr) {

    var input = void 0;

    input = inputs.find(function (item) {
        return item.name === attr;
    });

    if (input) {

        return input.value;
    }

    return "";
};