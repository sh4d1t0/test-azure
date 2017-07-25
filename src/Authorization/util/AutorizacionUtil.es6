// @flow

import axios from "axios";

export const isThereATokenValid = async () => {

        try {

            let emailVerified,
                response,
                token: string = sessionStorage.getItem("token");

            if (token === null) {

                return false;

            }
            const instance = axios.create();

            response = await instance.request({
                "url": "/oauth2/v3/tokeninfo",
                "method": "get",
                "baseURL": "https://www.googleapis.com/",
                "params": {
                    "access_token": token
                },
                "timeout": 100000
            });

            emailVerified = response.data["email_verified"] === "true";

            return emailVerified;

        } catch (err) {

            return false;

        }

    },
    saveToken = (token: string) => {

        sessionStorage.setItem("token", token);

    };
