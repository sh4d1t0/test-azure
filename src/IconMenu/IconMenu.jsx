import React from "react";
import PropTypes from "prop-types";
import ContainerIcons from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

/**
 * @description Pinta un menú deslisable
 * @param {{}} props : opciones para configuración
 * @return {{jsx}} : componente icon menu
 */
const IconMenu = (props) => {

    const {
        anchorOrigin = {"horizontal": "left", "vertical": "top"},
        targetOrigin = {"horizontal": "left", "vertical": "top"},
        listOptions, rowId
    } = props;

    let items = [];

    const buildItems = (list) => {

        return list && list.length && list.map((item, i) => {

                return (
                    <MenuItem
                        key={`menu-${rowId}-${i}`}
                        primaryText={item.primaryText}
                        rightIcon={item.rightIcon && item.rightIcon}
                        leftIcon={item.leftIcon && item.leftIcon}
                        onTouchTap={() => {

                            item.onTouchTap(rowId);

                        }}
                        menuItems={buildItems(item.menuItems)}
                    />);

            });

    };

    items = buildItems(listOptions);


    return (
        <ContainerIcons
            iconButtonElement={<IconButton>
                <MoreVertIcon />
            </IconButton>}
            anchorOrigin={anchorOrigin}
            targetOrigin={targetOrigin}>

            {items}

        </ContainerIcons>
    );

};


IconMenu.propTypes = {
    "listOptions": PropTypes.array.isRequired,
    "rowId": PropTypes.any.isRequired,
    "anchorOrigin": PropTypes.object,
    "targetOrigin": PropTypes.object
};


export default IconMenu;
