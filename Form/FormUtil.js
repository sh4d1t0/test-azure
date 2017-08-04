"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getTextError = exports.getTextError = function getTextError(property) {
    var value = property.value,
        _property$errorText = property.errorText,
        errorText = _property$errorText === undefined ? "Campo requerido *" : _property$errorText,
        _property$type = property.type,
        type = _property$type === undefined ? "textfield" : _property$type,
        pattern = property.pattern,
        _property$required = property.required,
        required = _property$required === undefined ? true : _property$required;


    if (required && typeof value === "undefined") {
        return errorText;
    }

    if (pattern && type !== "select" && type !== "checkbox" && type !== "date" && !pattern.test(value)) {
        return errorText;
    }

    return null;
};