import moment from "moment";
import * as React from "react";
import FlatButton from "material-ui/FlatButton";
import {green500, red500} from "material-ui/styles/colors";
import Checkbox from "material-ui/svg-icons/toggle/check-box";
import Indeterminate from "material-ui/svg-icons/toggle/indeterminate-check-box";

export const getDateFormat = (data) => {

    const {isUnix = true, format = "DD/MM/YYYY"} = data;
    let {value} = data;

    if (!value) {

        return;

    }

    switch (typeof value) {

        case "object":
            value = moment(value).format(format);
            break;

        default:

            if (value.toString().length >= 12) {

                value /= 1000;

            }
            if (isUnix) {

                value = moment.unix(value).format(format);

            }
            break;

    }

    return value;

};

export const getDateDiff = (data) => {

    const {isUnix = true, time} = data;
    let diff, {value} = data, date, now;

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

                value = `${diff.years()} años, ${diff.months()} meses y ${diff.days()} días`;

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

export const getCurrencyFormat = (value) => {

    const formatter = new Intl.NumberFormat("es-MX", {
        "style": "currency",
        "currency": "MXN",
        "minimumFractionDigits": 2
    });

    return formatter.format(value);

};

export const getLinkFormat = (value, labelBtn = "Descargar", target = "_blank") => {

    return <FlatButton label={labelBtn}
                       secondary={true}
                       target={target}
                       href={value}/>;

};

export const getPercentageFormat = (value) => {

    return `${value} %`;

};

export const getRenderBoolean = (flag = false,colorTrue=green500,colorFalse=red500) => {

    if (flag) {

        return <Checkbox color={colorTrue}/>;

    }

    return <Indeterminate color={colorFalse}/>;

};


export const getFormat = (data) => {

    const {type, value, renderFalseAs = "No", renderTrueAs = "Sí"} = data;

    switch (type) {
        case "currency":
            return getCurrencyFormat(value);
        case "date":
            return getDateFormat({value});
        case "dateDiff":
            return getDateDiff({value});
        case "percentage":
            return `${value} %`;
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
