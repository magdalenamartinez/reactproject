// handleChange.js
export default function handleChange(event, setFormValues, setModifiedFields) {
    const { name, value } = event.target;

    if (name === 'codpostal' || name === 'provincia') {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setModifiedFields((prevModifiedFields) => ({
            ...prevModifiedFields,
            codpostal: true,
            provincia: true,
        }));
    }
    else if (name === 'politicasInclusivas' || name === 'instalacionesAccesibles' || name === 'formacionInclusividad'
    || name === 'mentoresApoyo' || name === 'ambienteAdaptado') {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: !prevValues[name],
        }));
        setModifiedFields((prevModifiedFields) => ({
            ...prevModifiedFields,
            [name]: true,
        }));
    }  
    else {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setModifiedFields((prevModifiedFields) => ({
            ...prevModifiedFields,
            [name]: true,
        }));
    }
}
