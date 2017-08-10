import React from "react";
import PropTypes from "prop-types";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import { ListItem } from "material-ui/List";

const drawer = ({
    open,
    onRequestChange,
    onTouchTap,
    logoHeader,
    logoFooter,
    showAllItems,
    listItems
}) => {
    let items;

    const buildItems = (list: [] = []) => {
        return list.map((item, i) => {
            let styleListItem = { display: "none" };

            if (showAllItems) {
                styleListItem.display = "block";
            } else {
                styleListItem.display = "none";
            }

            if (item.subheader) {
                if (item.show) {
                    delete styleListItem.display;
                }
                return (
                    <div key={`div-drawer-li-${i}`} style={styleListItem}>
                        <Divider />
                        <Subheader>
                            {item.subheader}
                        </Subheader>
                    </div>
                );
            }

            if (item.show || (item.link && item.link.show)) {
                delete styleListItem.display;
            }
            return (
                <ListItem
                    key={`item-drawer-li-${i}`}
                    primaryText={item.primaryText}
                    style={styleListItem}
                    leftIcon={item.leftIcon}
                    onTouchTap={() => {
                        onTouchTap(item);
                    }}
                    nestedItems={buildItems(item.nestedItems)}
                />
            );
        });
    };

    items = buildItems(listItems);

    return (
        <Drawer
            docked={false}
            open={open}
            width={380}
            onRequestChange={onRequestChange}
        >
            {logoHeader &&
                <div className="mn-img-drawer-header">
                    <img src={logoHeader} alt="más nómina" />
                </div>}

            <div className="mn-img-drawer-items">
                {items}
            </div>

            <Divider />

            {logoFooter &&
                <div className="mn-img-drawer-footer">
                    <img src={logoFooter} alt="sif" />
                </div>}
        </Drawer>
    );
};

drawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestChange: PropTypes.func.isRequired,
    onTouchTap: PropTypes.func.isRequired,
    logoHeader: PropTypes.string.isRequired,
    logoFooter: PropTypes.string.isRequired,
    listItems: PropTypes.array.isRequired,
    showAllItems: PropTypes.bool
};

drawer.defaultProps = {
    showAllItems: false
};

export default drawer;
