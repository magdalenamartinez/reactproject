// submitForm.js
export default function submitForm(formValues, modifiedFields) {
    const newData = {};

    Object.keys(formValues).forEach((field) => {
        if (modifiedFields[field]) {
            newData[field] = formValues[field];
        }
    });
    

    return newData;
}
