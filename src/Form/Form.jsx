// @flow
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import TextField from "material-ui/TextField";
import FileIcon from "material-ui/svg-icons/file/file-upload";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Checkbox from "material-ui/Checkbox";
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";
import AutoComplete from "material-ui/AutoComplete";
import DatePicker from "material-ui/DatePicker";
import areIntlLocalesSupported from "intl-locales-supported";
import {getDateObject} from "../util/formats";
import {EE} from "../util/emitter";
import event from "../util/events";
import {getTextError} from "./FormUtil";

let DateTimeFormat,
    onChangeValueEvent = (data) => {

        const {value, name, form, epic, module} = data;

        EE.emit(event.FORM_CHANGE_VALUE, {value, name, form, epic, module});

    };

if (areIntlLocalesSupported(["es", "es-MX"])) {

    DateTimeFormat = global.Intl.DateTimeFormat;

}

const Form = (props) => {

    let {
            styleContainer,
            inputs,
            onChangeInputs,
            formName,
            useIndex = false,
            epic,
            module
        } = props,
        handleOnChange = (id, value) => {

            if (typeof onChangeInputs === "undefined") {

                onChangeValueEvent({
                    "value": value,
                    "name": id,
                    "form": formName,
                    epic,
                    module
                });

            } else {

                onChangeInputs(value, id);

            }

        },

        handleFilterSelect = (id, searchText, dataSource, params) => {

            if (searchText.length > 0) {

                return;

            }

            if (typeof onChangeInputs === "undefined") {

                onChangeValueEvent({
                    "value": undefined,
                    "name": id,
                    "form": formName,
                    epic,
                    module
                });

            } else {

                onChangeInputs(undefined, id);

            }

        },

        getForm = () => {

            return inputs &&
                inputs.length &&
                inputs.map((property, i) => {

                    let {
                            value = "",
                            collection = [],
                            options = [],
                            type = "textfield",
                            label,
                            multiLine = false,
                            rows,
                            unix,
                            autoComplete = true,
                            disabled = false,
                            multiple = false,
                            accept = [],
                            min,
                            max,
                            name
                        } = property,
                        errorText = getTextError(property),
                        inputId = i;

                    if (!useIndex) {

                        inputId = name;

                    }

                    switch (type) {

                        case "checkbox":

                            if (typeof value !== "boolean") {

                                value = false;

                            }

                            return <Checkbox
                                key={`form-checkbox-${i}`}
                                label={label}
                                name={name}
                                onCheck={(event, isInputChecked) => {

                                    handleOnChange(inputId, isInputChecked);

                                }}
                                style={{"marginTop": "20px"}}
                                checked={value}
                                labelPosition="left"/>;

                        case "select":

                            if (disabled) {

                                return <TextField
                                    key={`form-textfield-${i}`}
                                    hintText={label}
                                    disabled={disabled}
                                    floatingLabelText={label}
                                    name={name}
                                    fullWidth={true}/>;

                            }
                            if (!autoComplete) {

                                return <SelectField
                                    key={`form-selectfield-${i}`}
                                    floatingLabelText={label}
                                    value={value}
                                    errorText={errorText}
                                    disabled={disabled}
                                    fullWidth={true}
                                    multiple={multiple}
                                    onChange={(event, index, value) => {

                                        if (value === null) {

                                            handleOnChange(inputId, undefined);

                                        } else {

                                            handleOnChange(inputId, value);

                                        }

                                    }}>
                                    <MenuItem value={null} primaryText="Selecciona una opción"/>
                                    {
                                        collection.map((item, indexMenu) => {

                                            return <MenuItem
                                                key={`form-selectfield-item-${name}-${indexMenu}`}
                                                checked={Array.isArray(value) && value.findIndex(a => item.value === a.value) !== -1}
                                                value={item}
                                                primaryText={item.text}/>;

                                        })
                                    }
                                </SelectField>;

                            }

                            return <AutoComplete
                                searchText={value.text}
                                key={`form-select-${i}`}
                                floatingLabelText={label}
                                filter={AutoComplete.fuzzyFilter}
                                dataSource={collection}
                                fullWidth={true}
                                errorText={errorText}
                                openOnFocus={true}
                                popoverProps={{
                                    "style": {
                                        "overflowY": "auto"
                                    }
                                }}
                                onUpdateInput={handleFilterSelect.bind(this, inputId)}
                                onNewRequest={(selected) => {

                                    handleOnChange(inputId, selected);

                                }}/>;

                        case "date":
                            value = getDateObject(value, unix);

                            let maxDate = null, minDate = null;

                            if (min) {

                                minDate = moment(min, "DD/MM/YYYY").toDate();

                            }

                            if (max) {

                                maxDate = moment(max, "DD/MM/YYYY").toDate();

                            }

                            return <DatePicker
                                key={`form-date-picker-${i}`}
                                hintText={label}
                                value={value}
                                minDate={minDate}
                                maxDate={maxDate}
                                floatingLabelText={label}
                                fullWidth={true}
                                disabled={disabled}
                                locale="es-MX"
                                errorText={errorText}
                                DateTimeFormat={DateTimeFormat}
                                onChange={(event, newDate) => {

                                    handleOnChange(inputId, newDate);

                                }}/>;

                        case "file":

                            return <FloatingActionButton
                                key={`form-file-${i}`}
                                containerElement="label"
                                secondary={true}
                                className="mn-float-a-btn"
                                label={label}>

                                <FileIcon/>

                                <input multiple={multiple}
                                       accept={accept.join()}
                                       type="file"
                                       style={{"display": "none"}}
                                       onClick={(e) => {

                                           e.target.value = null;

                                       }}
                                       onChange={(e) => {

                                           const formData = new FormData();
                                           formData.append("upfile", e.target.files[0]);
                                           handleOnChange(inputId, formData);

                                       }}/>

                            </FloatingActionButton>;

                        case "radioButton":

                            return <RadioButtonGroup
                                key={`form-radio-group-${i}`}
                                name="shipSpeed"
                                style={{"display": "flex"}}
                                onChange={(event, selected) => {

                                    handleOnChange(inputId, selected);

                                }}
                                defaultSelected={value}>
                                {
                                    options.map((option, index) => {

                                        return <RadioButton
                                            key={`form-radio-item-${index}`}
                                            value={option.value}
                                            style={{
                                                "display": "inline-block",
                                                "minWidth": "210px"
                                            }}
                                            label={option.label}/>;

                                    })
                                }
                            </RadioButtonGroup>;

                        case "textfield":
                        default:

                            return <TextField
                                key={`form-textfield-${i}`}
                                hintText={label}
                                errorText={errorText}
                                disabled={disabled && disabled}
                                floatingLabelText={label}
                                value={value}
                                rows={rows}
                                multiLine={multiLine}
                                onChange={(event, newValue) => {

                                    handleOnChange(inputId, newValue);

                                }}
                                name={name}
                                fullWidth={true}/>;

                    }

                });

        };

    return <div style={styleContainer}>{getForm()}</div>;

};

Form.propTypes = {
    "onChangeInputs": PropTypes.func,
    "formName": PropTypes.string,
    "epic": PropTypes.string,
    "module": PropTypes.string,
    "useIndex": PropTypes.bool,
    "styleContainer": PropTypes.object,
    "inputs": PropTypes.array.isRequired
};

export default Form;
