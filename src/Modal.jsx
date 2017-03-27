import React, {PropTypes} from "react";
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
        labelOk = "Cancelar",
        labelCancel = "Aceptar",
        handleOnTouchTapOk,
        handleOnTouchTapCancel,
        actions = [
            <FlatButton
                label={labelOk}
                primary={true}
                onTouchTap={handleOnTouchTapOk}/>,
            <FlatButton
                label={labelCancel}
                primary={true}
                onTouchTap={handleOnTouchTapCancel}/>
        ]
    } = props;

    return (
        <Dialog
            title={title}
            actions={actions}
            modal={true}
            autoScrollBodyContent={true}
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
    "actions": PropTypes.array,
    "open": PropTypes.bool.isRequired,
    "handleOnTouchTapOk": PropTypes.func.isRequired,
    "handleOnTouchTapCancel": PropTypes.func.isRequired,
    "showSpinner": PropTypes.bool,
    "children": PropTypes.node
};

export default Modal;
