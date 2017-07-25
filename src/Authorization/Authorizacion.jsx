// @flow
import React, {Component} from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import AutorizacionApi from "./AutorizacionApi";
import Container from "../Container/Container";
import {saveToken} from "./util/AutorizacionUtil";
import ProgressBackground from "../RequestProgress/RequestProgress";

const GOOGLE_ID = "40613802827-p776g33c1hgr7i1i52kd58sn14afqrck.apps.googleusercontent.com";

export default class Authorization extends Component {

    static propTypes = {
        "logo": PropTypes.string,
        "isDevelopment": PropTypes.bool,
        "onSuccess": PropTypes.func.isRequired,
        "onFailure": PropTypes.func.isRequired
    };

    static defaultProps = {
        "isDevelopment": true
    };

    constructor(props: {}, context: {}) {

        super(props, context);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);

        this.state = {
            "loading": false
        };

    }

    handleLoginFailure = (response) => {

        const {onFailure} = this.props;
        onFailure(response);

    };

    handleLoginSuccess = async (response) => {

        const {accessToken, profileObj} = response,
            {onSuccess, isDevelopment, onFailure} = this.props;

        try {

            let capabilities, email = profileObj.email;

            if (isDevelopment) {

                email = "alopezavil@independencia.com.mx";

            }
            this.setState({"loading": true});

            capabilities = await new AutorizacionApi()
                .validar(email);

            saveToken(accessToken);
            onSuccess(capabilities);

        } catch (err) {

            onFailure(err);

        } finally {

            this.setState({"loading": false});

        }

    };

    render = () => {

        const {logo} = this.props,
            {loading} = this.state;

        return <div className="row">

            <ProgressBackground
                message={"Validando usuario"}
                open={loading}/>

            <div className="col-xs-12 col-md-4 col-md-offset-4">

                <Container>

                    <div className="row">

                        <div className="col-xs-12 text-center">
                            {
                                logo && <img src={logo}/>
                            }
                        </div>

                    </div>

                    <div className="row" style={{"marginTop": "50px"}}>

                        <div className="col-xs-12 text-center">

                            <GoogleLogin
                                clientId={GOOGLE_ID}
                                buttonText="Entrar con correo interno"
                                onSuccess={this.handleLoginSuccess}
                                onFailure={this.handleLoginFailure}/>

                        </div>

                    </div>

                </Container>

            </div>

        </div>;
    }

};
