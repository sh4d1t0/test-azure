import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";

const BreadCrumbs = ({items = [], onTouchTap}) => {

    return <nav>
        {
            items.map((item, index) => {

                const {label, link} = item;
                let styleItem = {"color": "rgba(255,255,255,0.7)"};

                if (index === items.length - 1) {

                    styleItem.color = "#FFFFFF";

                }

                return <FlatButton
                    key={`bread-crumb-${index}`}
                    label={label}
                    onTouchTap={() => {

                        onTouchTap(item);

                    }}
                    style={styleItem}/>;

            })
        }
    </nav>;

};

BreadCrumbs.propTypes = {
    "onTouchTap": PropTypes.func.isRequired,
    "items": PropTypes.array.isRequired
};

export default BreadCrumbs;
