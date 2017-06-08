import React from "react";
import PropTypes from "prop-types";
import {List} from "material-ui/List";
import TextField from "material-ui/TextField";
import FileIcon from "material-ui/svg-icons/file/file-upload";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Checkbox from "material-ui/Checkbox";
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";
import AutoComplete from "material-ui/AutoComplete";
import DatePicker from "material-ui/DatePicker";
import areIntlLocalesSupported from "intl-locales-supported";
import {getDateObject} from "../util/formats";
import {EE} from "../util/emitter";
import event from "../util/events";

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
            inputs,
            onChangeInputs,
            formName,
            useIndex = false,
            epic,
            module
        } = props,
        onChange = (id, event, value) => {

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
        onChangeFile = (id, e) => {

            const formData = new FormData();
            formData.append("upfile", e.target.files[0]);

            if (typeof onChangeInputs === "undefined") {

                onChangeValueEvent({
                    "value": formData,
                    "name": id,
                    "form": formName,
                    epic,
                    module
                });

            } else {

                onChangeInputs(e.target.files, id);

            }

        },
        onChangeRadio = (id, event, value) => {

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
        onChangeSelect = (id, value) => {

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
        onUpdateInput = (id, searchText, dataSource, params) => {

            if (searchText.length > 0) {

                return;

            }

            if (typeof onChangeInputs === "undefined") {

                onChangeValueEvent({
                    "value": {},
                    "name": id,
                    "form": formName,
                    epic,
                    module
                });

            } else {

                onChangeInputs({}, id);

            }

        },
        onCheck = (id, event, isInputChecked) => {

            if (typeof onChangeInputs === "undefined") {

                onChangeValueEvent({
                    "value": isInputChecked,
                    "name": id,
                    "form": formName,
                    epic,
                    module
                });

            } else {

                onChangeInputs(isInputChecked, id);

            }

        },
        getTextError = (property) => {

            const {
                value,
                errorText = "Campo requerido *",
                type = "textfield",
                pattern,
                required = true
            } = property;

            if (required && typeof value === "undefined") {

                return errorText;

            }

            if (pattern &&
                type !== "select" &&
                type !== "checkbox" &&
                type !== "date" &&
                !pattern.test(value)) {

                return errorText;

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
                            disabled = false,
                            multiple = false,
                            accept = [],
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
                                onCheck={onCheck.bind(this, inputId)}
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

                            return <AutoComplete
                                searchText={value.text}
                                key={`form-select-${i}`}
                                floatingLabelText={label}
                                filter={AutoComplete.fuzzyFilter}
                                dataSource={collection}
                                fullWidth={true}
                                errorText={errorText}
                                openOnFocus={true}
                                onUpdateInput={onUpdateInput.bind(this, inputId)}
                                onNewRequest={onChangeSelect.bind(this, inputId)}
                                maxSearchResults={5}/>;

                        case "date":
                            value = getDateObject(value, unix);

                            return <DatePicker
                                key={`form-date-picker-${i}`}
                                hintText={label}
                                value={value}
                                floatingLabelText={label}
                                fullWidth={true}
                                locale="es-MX"
                                errorText={errorText}
                                DateTimeFormat={DateTimeFormat}
                                onChange={onChange.bind(this, inputId)}/>;

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
                                       onChange={onChangeFile.bind(this, inputId)}/>

                            </FloatingActionButton>;

                        case "radioButton":

                            return <RadioButtonGroup
                                key={`form-radio-group-${i}`}
                                name="shipSpeed"
                                style={{"display": "flex"}}
                                onChange={onChangeRadio.bind(this, inputId)}
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
                                onChange={onChange.bind(this, inputId)}
                                name={name}
                                fullWidth={true}/>;

                    }

                });

        };

    return <List>{getForm()}</List>;

};

Form.propTypes = {
    "onChangeInputs": PropTypes.func,
    "formName": PropTypes.string,
    "epic": PropTypes.string,
    "module": PropTypes.string,
    "useIndex": PropTypes.bool,
    "inputs": PropTypes.array.isRequired
};

export default Form;
