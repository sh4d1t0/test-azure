import React from "react";
import PropTypes from "prop-types";
import { getFormat } from "../util/formats";

const LabelValue = props => {
    const {
        label,
        type,
        renderFalseAs,
        renderTrueAs,
        defaultValue,
        styleContainer
    } = props;

    let { value } = props;

    if (typeof defaultValue !== "undefined" && typeof value !== "undefined") {
        value = defaultValue;
    }

    if (typeof type !== "undefined") {
        value = getFormat({ type, value, renderFalseAs, renderTrueAs });
    }

    return (
        <div className="row static-info" style={styleContainer}>
            <div className="col-xs-12 col-md-5 mn-clave-valor-l">
                <span>
                    {label}
                </span>
            </div>

            <div
                className={`col-xs-12 col-md-7  text-uppercase mn-clave-valor-v ${type}`}
            >
                <span>
                    {value}
                </span>
            </div>
        </div>
    );
};

LabelValue.propTypes = {
    type: PropTypes.oneOf([
        "currency",
        "date",
        "dateDiff",
        "percentage",
        "boolean",
        "none"
    ]),
    label: PropTypes.node,
    defaultValue: PropTypes.any,
    styleContainer: PropTypes.object,
    renderFalseAs: PropTypes.string,
    renderTrueAs: PropTypes.string,
    value: PropTypes.any
};

LabelValue.defaultProps = {
    type: "none",
    label: "...",
    value: "..."
};

export default LabelValue;
