import React from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Spinner from "./Spinner";

/**
 * @param {{}} props : dfnodsfnkl
 * @return {XML} : knoofdnkl
 * @constructor
 */
const Modal = (props) => {

    const {
            title,
            open,
            showSpinner = false,
            disabledOk = false,
            labelOk = "Aceptar",
            labelCancel = "Cancelar",
            handleOnTouchTapOk,
            handleOnTouchTapCancel,
            contentStyle = {
                "width": "95%",
                "maxWidth": "none",
            }
        } = props,
        actions = [
            <FlatButton
                label={labelCancel}
                primary={true}
                onTouchTap={handleOnTouchTapCancel}/>,
            <FlatButton
                label={labelOk}
                disabled={disabledOk}
                primary={true}
                onTouchTap={handleOnTouchTapOk}/>
        ];

    return (
        <Dialog
            title={title}
            actions={actions}
            modal={true}
            autoScrollBodyContent={true}
            contentStyle={ contentStyle}
            open={open}>
            {props.children}
            {
                showSpinner && <Spinner visible={showSpinner}/>
            }
        </Dialog>
    );

};

Modal.propTypes = {
    "title": PropTypes.string.isRequired,
    "labelOk": PropTypes.string,
    "labelCancel": PropTypes.string,
    "open": PropTypes.bool.isRequired,
    "handleOnTouchTapOk": PropTypes.func.isRequired,
    "handleOnTouchTapCancel": PropTypes.func.isRequired,
    "showSpinner": PropTypes.bool,
    "disabledOk": PropTypes.bool,
    "contentStyle": PropTypes.object,
    "children": PropTypes.node
};

export default Modal;
