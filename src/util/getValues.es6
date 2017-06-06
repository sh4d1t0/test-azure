import moment from "moment";

export let getUnixDate = (value) => {

        if (typeof value === "object") {

            return moment(value).unix();

        }

        return value;

    },
    getValueFromInput = (inputs, attr) => {

        let input;

        input = inputs.find((item) => item.name === attr);

        if (input) {

            return input.value;

        }

        return "";

    };
