import React from "react";
import { useState } from "react";
import { useStyle } from "../../styleContext";
function Correo({onInput, value, readOnly}) {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const {style} = useStyle();
    
    const st = {
        inputContrast: style.highContrast ? 'inputContrast' : '',
        inputDark: style.darkMode ? 'inputDark' : '',
        cont3: style.highContrast ? 'yellow_button' : '',
      };

    return(
        <div className={`form_group`} id="correo_group">
            <label htmlFor="correo" className={`form_label`}>Dirección de Correo Electrónico</label>
            <div className="input_group">
                <input type="text" className={`form_input big ${st.inputContrast} ${st.inputDark}`} name="correo" id="correo" value={value? `${value}`:name}  onInput={onInput} readOnly={readOnly} onChange={handleNameChange}/>
                <i className={`state_validation fas fa-circle-xmark`}></i>
            </div>
            <p className={`input_error_form ${st.cont3}`}>El correo electrónico solo puede contener letras,
                números, puntos y guiones.
            </p>
            <p className={`input_error_form_mail ${st.cont3}`}>El correo electrónico introducido ya está vinculado con otra cuenta.</p>
            {readOnly && <p className="editError">El correo electrónico no puede ser cambiado</p>}
        </div>
    );
}

export default Correo;