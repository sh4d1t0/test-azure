// @flow
export const getTextError = property => {
    const {
        value,
        errorText = "Campo requerido *",
        type = "textfield",
        pattern,
        required = true
    } = property;

    if (required && typeof value === "undefined") {
        return errorText;
    }

    if (
        pattern &&
        type !== "select" &&
        type !== "checkbox" &&
        type !== "date" &&
        !pattern.test(value)
    ) {
        return errorText;
    }

    return null;
};
