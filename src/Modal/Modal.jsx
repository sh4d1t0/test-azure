import React from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Spinner from "../Spinner/Spinner";

/**
 * @param {{}} props : dfnodsfnkl
 * @return {XML} : knoofdnkl
 * @constructor
 */
const Modal = props => {
    const {
            title,
            open,
            showSpinner = false,
            disabledOk = false,
            labelOk = "Aceptar",
            labelCancel = "Cancelar",
            onTouchTapOk,
            onTouchTapCancel,
            contentStyle = {
                width: "95%",
                maxWidth: "none"
            }
        } = props,
        actions = [
            <FlatButton
                label={labelCancel}
                primary={true}
                onTouchTap={onTouchTapCancel}
            />,
            <FlatButton
                label={labelOk}
                disabled={disabledOk}
                primary={true}
                onTouchTap={onTouchTapOk}
            />
        ];

    return (
        <Dialog
            title={title}
            actions={actions}
            modal={true}
            autoScrollBodyContent={true}
            contentStyle={contentStyle}
            open={open}
        >
            {props.children}
            {showSpinner && <Spinner visible={showSpinner} />}
        </Dialog>
    );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    labelOk: PropTypes.string,
    labelCancel: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onTouchTapOk: PropTypes.func.isRequired,
    onTouchTapCancel: PropTypes.func.isRequired,
    showSpinner: PropTypes.bool,
    disabledOk: PropTypes.bool,
    contentStyle: PropTypes.object,
    children: PropTypes.node
};

export default Modal;
