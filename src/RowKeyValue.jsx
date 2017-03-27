import React, {PropTypes} from "react";

const RowKeyValue = (props) => {

    const {label, value} = props;

    return (
        <div className="row static-info">
            <div className="col-md-5">{label}:</div>
            <div className="col-md-7 value text-uppercase">{value}</div>
        </div>
    );

};

RowKeyValue.propTypes = {
    "label": PropTypes.string.isRequired,
    "value": PropTypes.string.isRequired
};

export default RowKeyValue;
