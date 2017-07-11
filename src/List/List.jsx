import React, {Component} from "react";
import PropTypes from "prop-types";
import Card from "material-ui/Card";
import Subheader from "material-ui/Subheader";
import {List, ListItem} from "material-ui/List";

class ListCard extends Component {

    constructor(props: {}, context: {}) {

        super(props, context);
        this.handleOnChangeSelected = this.handleOnChangeSelected.bind(this);

        const {defaultSelected} = this.props;
        this.state = {"itemSelected": defaultSelected};

    }

    handleOnChangeSelected = (index) => {

        const {onTouchTap} = this.props;

        this.setState({"itemSelected": index});
        onTouchTap(index);

    };

    render = () => {

        let {collection, title, selectable} = this.props,
            {itemSelected} = this.state;

        if (!(collection instanceof Array)) {

            collection = [];

        }

        const getItems = () => {

            return collection.map((item, index) => {

                let props = {
                    "key": `list-item-${index}`,
                    "primaryText": item
                };

                if (selectable) {

                    props.onTouchTap = () => {

                        this.handleOnChangeSelected(index);

                    };

                    if (itemSelected === index) {

                        props.style = {"textTransform": "capitalize"};
                        props.style.backgroundColor = "rgba(0, 0, 0, 0.2)";

                    }

                }

                return <ListItem {...props} />;

            });

        };

        return <Card style={{"margin": "12px"}}>

            <List>

                <Subheader>{title}</Subheader>

                {getItems()}

            </List>

        </Card>;

    };

}

ListCard.propTypes = {
    "collection": PropTypes.array.isRequired,
    "onTouchTap": PropTypes.func.isRequired,
    "selectable": PropTypes.bool,
    "defaultSelected": PropTypes.number,
    "title": PropTypes.string.isRequired
};

ListCard.defaultProps = {
    "selectable": false,
    "defaultSelected": -1
};

export default ListCard;
