import React from "react";
import PropTypes from "prop-types";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import {ListItem} from "material-ui/List";

const drawer = ({
                    open,
                    onRequestChange,
                    onTouchTap,
                    logoHeader,
                    logoFooter,
                    listItems
                }) => {

    let items;

    const buildItems = (list) => {

        return list && list.length && list.map((item, i) => {

                if (item.subheader) {

                    return <div key={`div-drawer-li-${i}`}>
                        <Divider />
                        <Subheader>
                            {item.subheader}
                        </Subheader>
                    </div>;

                }

                return <ListItem key={`item-drawer-li-${i}`}
                                 primaryText={item.primaryText}
                                 leftIcon={item.leftIcon}
                                 onTouchTap={() => {

                                     onTouchTap(item);

                                 }}
                                 nestedItems={buildItems(item.nestedItems)}/>;

            });

    };

    items = buildItems(listItems);

    return (
        <Drawer
            docked={false}
            open={open}
            width={380}
            onRequestChange={onRequestChange}>

            {
                logoHeader && <div className="mn-img-drawer-header">
                    <img src={logoHeader} alt="más nómina"/>
                </div>
            }

            <div className="mn-img-drawer-items">
                {items}
            </div>

            <Divider />

            {
                logoFooter && <div className="mn-img-drawer-footer">
                    <img src={logoFooter} alt="sif"/>
                </div>
            }

        </Drawer>
    );

};

drawer.propTypes = {
    "open": PropTypes.bool.isRequired,
    "onRequestChange": PropTypes.func.isRequired,
    "onTouchTap": PropTypes.func.isRequired,
    "logoHeader": PropTypes.string.isRequired,
    "logoFooter": PropTypes.string.isRequired,
    "listItems": PropTypes.array.isRequired
};

export default drawer;
