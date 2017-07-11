export const selectorFormObject = (inputs: []) => {

        let data = {};

        inputs.map(i => {

            let {value} = i;

            data[i.name] = value;

        });

        return data;

    },
    selectorLabelsForm = (inputs: []) => {

        let data = {};

        inputs.map(i => {

            data[i.name] = i.label;

        });

        return data;

    };
