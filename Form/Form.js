"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _fileUpload = require("material-ui/svg-icons/file/file-upload");

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _Checkbox = require("material-ui/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _RadioButton = require("material-ui/RadioButton");

var _AutoComplete = require("material-ui/AutoComplete");

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _DatePicker = require("material-ui/DatePicker");

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _intlLocalesSupported = require("intl-locales-supported");

var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);

var _formats = require("../util/formats");

var _emitter = require("../util/emitter");

var _events = require("../util/events");

var _events2 = _interopRequireDefault(_events);

var _FormUtil = require("./FormUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTimeFormat = void 0,
    onChangeValueEvent = function onChangeValueEvent(data) {
    var value = data.value,
        name = data.name,
        form = data.form,
        epic = data.epic,
        module = data.module;


    _emitter.EE.emit(_events2.default.FORM_CHANGE_VALUE, { value: value, name: name, form: form, epic: epic, module: module });
};


if ((0, _intlLocalesSupported2.default)(["es", "es-MX"])) {

    DateTimeFormat = global.Intl.DateTimeFormat;
}

var Form = function Form(props) {
    var styleContainer = props.styleContainer,
        inputs = props.inputs,
        onChangeInputs = props.onChangeInputs,
        formName = props.formName,
        _props$useIndex = props.useIndex,
        useIndex = _props$useIndex === undefined ? false : _props$useIndex,
        epic = props.epic,
        module = props.module,
        handleOnChange = function handleOnChange(id, value) {

        if (typeof onChangeInputs === "undefined") {

            onChangeValueEvent({
                "value": value,
                "name": id,
                "form": formName,
                epic: epic,
                module: module
            });
        } else {

            onChangeInputs(value, id);
        }
    },
        handleFilterSelect = function handleFilterSelect(id, searchText, dataSource, params) {

        if (searchText.length > 0) {

            return;
        }

        if (typeof onChangeInputs === "undefined") {

            onChangeValueEvent({
                "value": undefined,
                "name": id,
                "form": formName,
                epic: epic,
                module: module
            });
        } else {

            onChangeInputs(undefined, id);
        }
    },
        getForm = function getForm() {

        return inputs && inputs.length && inputs.map(function (property, i) {
            var _property$value = property.value,
                value = _property$value === undefined ? "" : _property$value,
                _property$collection = property.collection,
                collection = _property$collection === undefined ? [] : _property$collection,
                _property$options = property.options,
                options = _property$options === undefined ? [] : _property$options,
                _property$type = property.type,
                type = _property$type === undefined ? "textfield" : _property$type,
                label = property.label,
                _property$multiLine = property.multiLine,
                multiLine = _property$multiLine === undefined ? false : _property$multiLine,
                rows = property.rows,
                unix = property.unix,
                _property$autoComplet = property.autoComplete,
                autoComplete = _property$autoComplet === undefined ? true : _property$autoComplet,
                _property$disabled = property.disabled,
                disabled = _property$disabled === undefined ? false : _property$disabled,
                _property$multiple = property.multiple,
                multiple = _property$multiple === undefined ? false : _property$multiple,
                _property$accept = property.accept,
                accept = _property$accept === undefined ? [] : _property$accept,
                min = property.min,
                max = property.max,
                name = property.name,
                errorText = (0, _FormUtil.getTextError)(property),
                inputId = i;


            if (!useIndex) {

                inputId = name;
            }

            switch (type) {

                case "checkbox":

                    if (typeof value !== "boolean") {

                        value = false;
                    }

                    return _react2.default.createElement(_Checkbox2.default, {
                        key: "form-checkbox-" + i,
                        label: label,
                        name: name,
                        onCheck: function onCheck(event, isInputChecked) {

                            handleOnChange(inputId, isInputChecked);
                        },
                        style: { "marginTop": "20px" },
                        checked: value,
                        labelPosition: "left" });

                case "select":

                    if (disabled) {

                        return _react2.default.createElement(_TextField2.default, {
                            key: "form-textfield-" + i,
                            hintText: label,
                            disabled: disabled,
                            floatingLabelText: label,
                            name: name,
                            fullWidth: true });
                    }
                    if (!autoComplete) {

                        return _react2.default.createElement(
                            _SelectField2.default,
                            {
                                key: "form-selectfield-" + i,
                                floatingLabelText: label,
                                value: value,
                                errorText: errorText,
                                disabled: disabled,
                                fullWidth: true,
                                multiple: multiple,
                                onChange: function onChange(event, index, value) {

                                    if (value === null) {

                                        handleOnChange(inputId, undefined);
                                    } else {

                                        handleOnChange(inputId, value);
                                    }
                                } },
                            _react2.default.createElement(_MenuItem2.default, { value: null, primaryText: "Selecciona una opci\xF3n" }),
                            collection.map(function (item, indexMenu) {

                                return _react2.default.createElement(_MenuItem2.default, {
                                    key: "form-selectfield-item-" + name + "-" + indexMenu,
                                    checked: Array.isArray(value) && value.findIndex(function (a) {
                                        return item.value === a.value;
                                    }) !== -1,
                                    value: item,
                                    primaryText: item.text });
                            })
                        );
                    }

                    return _react2.default.createElement(_AutoComplete2.default, {
                        searchText: value.text,
                        key: "form-select-" + i,
                        floatingLabelText: label,
                        filter: _AutoComplete2.default.fuzzyFilter,
                        dataSource: collection,
                        fullWidth: true,
                        errorText: errorText,
                        openOnFocus: true,
                        popoverProps: {
                            "style": {
                                "overflowY": "auto"
                            }
                        },
                        onUpdateInput: handleFilterSelect.bind(undefined, inputId),
                        onNewRequest: function onNewRequest(selected) {

                            handleOnChange(inputId, selected);
                        } });

                case "date":
                    value = (0, _formats.getDateObject)(value, unix);

                    var maxDate = null,
                        minDate = null;

                    if (min) {

                        minDate = (0, _moment2.default)(min, "DD/MM/YYYY").toDate();
                    }

                    if (max) {

                        maxDate = (0, _moment2.default)(max, "DD/MM/YYYY").toDate();
                    }

                    return _react2.default.createElement(_DatePicker2.default, {
                        key: "form-date-picker-" + i,
                        hintText: label,
                        value: value,
                        minDate: minDate,
                        maxDate: maxDate,
                        floatingLabelText: label,
                        fullWidth: true,
                        disabled: disabled,
                        locale: "es-MX",
                        errorText: errorText,
                        DateTimeFormat: DateTimeFormat,
                        onChange: function onChange(event, newDate) {

                            handleOnChange(inputId, newDate);
                        } });

                case "file":

                    return _react2.default.createElement(
                        _FloatingActionButton2.default,
                        {
                            key: "form-file-" + i,
                            containerElement: "label",
                            secondary: true,
                            className: "mn-float-a-btn",
                            label: label },
                        _react2.default.createElement(_fileUpload2.default, null),
                        _react2.default.createElement("input", { multiple: multiple,
                            accept: accept.join(),
                            type: "file",
                            style: { "display": "none" },
                            onClick: function onClick(e) {

                                e.target.value = null;
                            },
                            onChange: function onChange(e) {

                                var formData = new FormData();
                                formData.append("upfile", e.target.files[0]);
                                handleOnChange(inputId, formData);
                            } })
                    );

                case "radioButton":

                    return _react2.default.createElement(
                        _RadioButton.RadioButtonGroup,
                        {
                            key: "form-radio-group-" + i,
                            name: "shipSpeed",
                            style: { "display": "flex" },
                            onChange: function onChange(event, selected) {

                                handleOnChange(inputId, selected);
                            },
                            defaultSelected: value },
                        options.map(function (option, index) {

                            return _react2.default.createElement(_RadioButton.RadioButton, {
                                key: "form-radio-item-" + index,
                                value: option.value,
                                style: {
                                    "display": "inline-block",
                                    "minWidth": "210px"
                                },
                                label: option.label });
                        })
                    );

                case "textfield":
                default:

                    return _react2.default.createElement(_TextField2.default, {
                        key: "form-textfield-" + i,
                        hintText: label,
                        errorText: errorText,
                        disabled: disabled && disabled,
                        floatingLabelText: label,
                        value: value,
                        rows: rows,
                        multiLine: multiLine,
                        onChange: function onChange(event, newValue) {

                            handleOnChange(inputId, newValue);
                        },
                        name: name,
                        fullWidth: true });

            }
        });
    };

    return _react2.default.createElement(
        "div",
        { style: styleContainer },
        getForm()
    );
};

Form.propTypes = {
    "onChangeInputs": _propTypes2.default.func,
    "formName": _propTypes2.default.string,
    "epic": _propTypes2.default.string,
    "module": _propTypes2.default.string,
    "useIndex": _propTypes2.default.bool,
    "styleContainer": _propTypes2.default.object,
    "inputs": _propTypes2.default.array.isRequired
};

exports.default = Form;