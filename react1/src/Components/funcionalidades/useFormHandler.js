import { useState } from 'react';
import { provincias} from '../funcionalidades/load.js';

const useFormHandlers = (originalFormValues) => {
    const [modifiedFields, setModifiedFields] = useState({});
    
    const handleChange = (event, setFormValues) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setModifiedFields((prevModifiedFields) => ({
            ...prevModifiedFields,
            [name]: true,
        }));
    };

    const change_provincia = (codpostal, setFormValues) => {
        const valueCod = codpostal.value;
        if (valueCod.length >= 2) {
            let cod = valueCod.slice(0, 2);
            const number = parseInt(cod, 10);
            let selected = provincias[number - 1];
            setFormValues((prevValues) => ({
                ...prevValues,
                provincia: selected,
            }));
        }
    };

    const handleSubmit = (event, formValues, originalFormValues) => {
        event.preventDefault();

        const newData = {};

        Object.keys(originalFormValues).forEach((field) => {
            if (modifiedFields[field]) {
                newData[field] = formValues[field];
            }
        });

        console.log(newData);
    };

    return { handleChange, change_provincia, handleSubmit };
};

export default useFormHandlers;
