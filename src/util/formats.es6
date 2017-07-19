import moment from "moment";
import * as React from "react";
import FlatButton from "material-ui/FlatButton";
import {green500, red500} from "material-ui/styles/colors";
import Checkbox from "material-ui/svg-icons/toggle/check-box";
import Indeterminate from "material-ui/svg-icons/toggle/indeterminate-check-box";
//asdasddsadsa
export const getDateFormat = (data) => {

    const {isUnix = true, format = "DD/MM/YYYY"} = data; /// 15/15/15 //Date()
    let {value} = data;

    if (!value) {

        return;

    }

    switch (typeof value) {

        case "object":
            value = moment(value).format(format);
            break;

        default:

            if (isUnix) {

                if (value.toString().length >= 12) {

                    value /= 1000;

                }

                value = moment.unix(value).format(format);


            } else {

                value = moment("15/15/15").format("DD/MM/YYYY");

            }
            break;

    }

    if (value === "Invalid date") {

        value = "Fecha no válida";

    }

    return value;

};

export const getDateDiff = (data) => {

    const {isUnix = true, time} = data;
    let date, diff, {value} = data, now;

    if (!value) {

        return;

    }

    switch (typeof value) {

        case "object":
            value = moment(value).diff(moment(), time);
            break;

        default:
            if (value.toString().length >= 12) {

                value /= 1000;

            }
            if (isUnix) {

                date = moment.unix(value);
                now = moment();
                diff = moment.duration(now.diff(date));

                if (isNaN(diff.years()) ||
                    isNaN(diff.months()) ||
                    isNaN(diff.days())) {

                    value = "Fecha no válida";

                } else {

                    value = `${diff.years()} años, ${diff.months()} meses y ${diff.days()} días`;

                }

            }
            break;

    }

    return value;

};

export const getDateObject = (value, unix) => {

    let date = {};

    if (typeof value === "undefined" ||
        value === null ||
        value.toString().length === 0) {

        return null;

    } else if ((typeof value === "number" ||
        typeof value === "string") && unix) {

        if (value.toString().length === 13) {

            value /= 1000;

        }

        date = moment.unix(value).toDate();

    } else if (typeof value === "object") {

        date = value;

    }

    return date;

};

export const getCurrencyFormat = (value = 0) => {

    const formatter = new Intl.NumberFormat("es-MX", {
        "style": "currency",
        "currency": "MXN",
        "minimumFractionDigits": 2
    });

    if (isNaN(value)) {

        value = 0;

    }

    return formatter.format(value);

};

export const getLinkFormat = (value, labelBtn = "Descargar", target = "_blank") => {

    return <FlatButton label={labelBtn}
                       secondary={true}
                       target={target}
                       href={value}/>;

};

export const getPercentageFormat = (value) => {

    return `${value.toFixed(2)} %`;

};

export const getRenderBoolean = (flag = false, colorTrue = green500, colorFalse = red500) => {

    if (flag) {

        return <Checkbox color={colorTrue}/>;

    }

    return <Indeterminate color={colorFalse}/>;

};


export const getFormat = (data) => {

    const {type, renderFalseAs = "No", renderTrueAs = "Sí"} = data;
    let {value} = data;

    switch (type) {
        case "currency":
            return getCurrencyFormat(value);
        case "date":
            return getDateFormat({value});
        case "dateDiff":
            return getDateDiff({value});
        case "percentage":

            if (typeof value === "undefined") {

                value = 0;

            }

            return getPercentageFormat(value);
        case "boolean":

            if (value) {

                return renderTrueAs;

            }

            return renderFalseAs;

        case "none":
        default:
            return value;
    }

};
