// @flow

import axios from "axios";

export const isThereATokenValid = async () => {

        try {

            let emailVerified = false,
                token: string = sessionStorage.getItem("token");

            if (token === null) {

                return false;

            }

            await axios.get("https://www.googleapis.com/oauth2/v3/tokeninfo", {
                "params": {
                    "access_token": token
                }
            }).then(response => {

                emailVerified = response.data["email_verified"] === "true";

            });

            return emailVerified;

        } catch (err) {

            return false;

        }

    },
    saveToken = (token: string) => {

        sessionStorage.setItem("token", token);

    };
