// @flow

import axios from "axios";
import AutorizacionApi from "../AutorizacionApi";

export const isThereATokenValid = async (email: string) => {
        try {
            let response,
                token: string = sessionStorage.getItem("token"),
                userValid;

            if (token === null) {
                return false;
            }
            const instance = axios.create();
            response = await instance.request({
                url: "/oauth2/v3/tokeninfo",
                method: "get",
                baseURL: "https://www.googleapis.com/",
                params: {
                    access_token: token
                },
                timeout: 100000
            });
            userValid = response.data["email_verified"] === "true";
            response = await new AutorizacionApi().validar(
                email ? email : response.data.email
            );
            return {
                userValid,
                ...response
            };
        } catch (err) {
            return {
                userValid: false,
                perfiles: []
            };
        }
    },
    saveToken = (token: string) => {
        sessionStorage.setItem("token", token);
    };
