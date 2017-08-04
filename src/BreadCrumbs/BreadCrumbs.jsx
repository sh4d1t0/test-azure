// @flow
import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";

const BreadCrumbs = ({ items = [], onTouchTap }) => {
    return (
        <div className="row">
            {items.map((item, index) => {
                if (item === null) {
                    return;
                }

                const { label, link } = item;
                let styleItem = { color: "rgba(255,255,255,0.7)" };

                if (index === items.length - 1) {
                    styleItem.color = "#FFFFFF";
                }

                return (
                    <div key={`bread-crumb-${index}`}>
                        {" "}>
                        <FlatButton
                            label={label}
                            onTouchTap={() => {
                                onTouchTap(item);
                            }}
                            disabled={typeof link === "undefined"}
                            style={styleItem}
                        />
                    </div>
                );
            })}
        </div>
    );
};

BreadCrumbs.propTypes = {
    onTouchTap: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
};

export default BreadCrumbs;
