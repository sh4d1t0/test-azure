// @flow
import axios from "axios";

export default class Request {
    url: string;
    baseUrl: string;
    method: string;
    params: {};
    headers: {
        "Content-Type": string
    };
    data: {};
    instance: Function;

    constructor() {
        this.url = "";
        this.baseUrl = "http://10.1.44.223:8183/";
        this.method = "post";
        this.params = {};
        this.data = {};
        this.headers = { "Content-Type": "application/json" };
        this.instance = axios.create();
    }

    fetch = async (configFetch: {
        url: string,
        data?: {},
        baseUrl?: string,
        headers?: {},
        showNotification?: boolean
    }) => {
        const that = this,
            { url, data, baseUrl, headers } = configFetch;

        if (typeof url !== "undefined") {
            this.url = url;
        }
        if (typeof data !== "undefined") {
            this.data = data;
        }
        if (typeof baseUrl !== "undefined") {
            this.baseUrl = baseUrl;
        }
        if (typeof headers !== "undefined") {
            this.headers = headers;
        }

        try {
            let response = await that.instance.request({
                url: that.url,
                method: that.method,
                baseURL: that.baseUrl,
                headers: that.headers,
                params: that.params,
                data: that.data,
                timeout: 100000
            });

            if (response === null || response.data.payload === null) {
                throw new Error("Respuesta o payload nulo");
            }

            return response.data.payload;
        } catch (error) {
            throw new Error(error);
        }
    };
}
