import React from "react";
import { useState } from "react";

function Correo({onInput, value, readOnly}) {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    return(
        <div className="form_group" id="correo_group">
            <label htmlFor="correo" className="form_label">Dirección de Correo Electrónico</label>
            <div className="input_group">
                <input type="text" className="form_input big" name="correo" id="correo" value={value? `${value}`:name}  onInput={onInput} readOnly={readOnly} onChange={handleNameChange}/>
                <i className="state_validation fas fa-circle-xmark"></i>
            </div>
            <p className="input_error_form">El correo electrónico solo puede contener letras,
                números, puntos y guiones.
            </p>
            <p className="input_error_form_mail">El correo electrónico introducido ya está vinculado con otra cuenta.</p>
            {readOnly && <p className="editError">El correo electrónico no puede ser cambiado</p>}
        </div>
    );
}

export default Correo;