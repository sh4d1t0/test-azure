import React, {PropTypes} from "react";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";

const Porlet = (props) => {

    const {
        title, subtitle, actAsExpander,
        showExpandableButton, expandable
    } = props;

    return (
        <Card className="static-info">
            <CardHeader
                className="text-uppercase"
                title={title}
                subtitle={subtitle}
                actAsExpander={actAsExpander}

                showExpandableButton={showExpandableButton}/>
            <CardText expandable={expandable}>
                {props.children}
            </CardText>
            <CardActions style={{"textAlign": "right"}}>
                <IconButton tooltip="SVG Icon">
                    <ModeEdit />
                </IconButton>
            </CardActions>

        </Card>
    );

};

Porlet.propTypes = {
    "title": PropTypes.string.isRequired,
    "subtitle": PropTypes.string,
    "actAsExpander": PropTypes.bool,
    "showExpandableButton": PropTypes.bool,
    "expandable": PropTypes.bool,
    "children": PropTypes.node
};

export default Porlet;
