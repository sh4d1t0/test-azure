// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import AutorizacionApi from "./AutorizacionApi";
import Container from "../Container/Container";
import { saveToken } from "./util/AutorizacionUtil";
import ProgressBackground from "../RequestProgress/RequestProgress";

const GOOGLE_ID =
    "40613802827-p776g33c1hgr7i1i52kd58sn14afqrck.apps.googleusercontent.com";

export default class Authorization extends Component {
    state: {
        loading: boolean
    };

    static propTypes = {
        logo: PropTypes.string,
        isSandbox: PropTypes.bool,
        email: PropTypes.string,
        onSuccess: PropTypes.func.isRequired,
        onFailure: PropTypes.func.isRequired
    };

    static defaultProps = {
        isSandbox: true,
        email: "juan.crisostomo@sngular.team"
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);

        this.state = {
            loading: false
        };
        const { email, isSandbox } = this.props;

        if ((isSandbox && email === null) || typeof email === "undefined") {
            console.error("Email de prueba no válido");
        }
    }

    handleLoginFailure = (response: {}) => {
        const { onFailure } = this.props;
        onFailure(response);
    };

    handleLoginSuccess = async (response: {
        accessToken: string,
        profileObj: { email: string }
    }) => {
        const { accessToken, profileObj } = response,
            { onSuccess, isSandbox, onFailure, email } = this.props;

        try {
            let capabilities,
                correo = profileObj.email;

            if (isSandbox) {
                correo = email;
            }
            this.setState({ loading: true });

            capabilities = await new AutorizacionApi().validar(correo);

            saveToken(accessToken);
            onSuccess(capabilities);
        } catch (err) {
            onFailure(err);
        } finally {
            this.setState({ loading: false });
        }
    };

    render = () => {
        const { logo } = this.props,
            { loading } = this.state;

        return (
            <div className="row">
                <ProgressBackground
                    message={"Validando usuario"}
                    open={loading}
                />

                <div className="col-xs-12 col-md-4 col-md-offset-4">
                    <Container>
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                {logo && <img src={logo} />}
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "50px" }}>
                            <div className="col-xs-12 text-center">
                                <GoogleLogin
                                    clientId={GOOGLE_ID}
                                    buttonText="Entrar con correo interno"
                                    onSuccess={this.handleLoginSuccess}
                                    onFailure={this.handleLoginFailure}
                                />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    };
}
