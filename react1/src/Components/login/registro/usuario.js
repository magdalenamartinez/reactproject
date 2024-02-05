import React from "react";
import { useState } from "react";
import { useStyle } from "../../styleContext";

function Usuario({readOnly, onInput, value, text}) {
    const [name, setName] = useState('');

    const {style} = useStyle();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const st = {
        inputContrast: style.highContrast ? 'inputContrast' : '',
        inputDark: style.darkMode ? 'inputDark' : '',
        errorContrast: style.highContrast ? 'errorContrast' : '',
      };
    return(
        <div className="form_group" id="user_group">
            <label htmlFor="user" className="form_label">{text? text:'Nombre de Usuario'}</label>
            <div className="input_group">
                <input type="text" className={`form_input big ${st.inputContrast} ${st.inputDark}`} name="user" id="user" onInput={onInput} readOnly={readOnly} value={value? `${value}`:name} onChange={handleNameChange}/>
                <i className="state_validation fas fa-circle-xmark"></i>
            </div>
            <p className={`input_error_form ${st.errorContrast}`}>El nombre de Usuario tiene que tener de 4 a 16 dígitos
                    y contener únicamente letras, números y guión bajo.
            </p>
            <p className={`input_error_form_user ${st.errorContrast}`}>El nombre de usuario ya está en uso.</p>
            {readOnly && <p className="editError">El nombre de usuario no puede ser cambiado</p>}

        </div>
    );
}

export default Usuario;