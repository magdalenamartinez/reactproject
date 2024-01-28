import React from "react";
import { useState } from "react";
function InputValidation({idName, pas, textLabel, typeInput, big, user, mail, handleInput, errorText, password, clickPassword, value, onChange}) {
    const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

    return(
    <div className="form_group" id={`${idName}_group`}>
        <label htmlFor={idName} className="form_label">{textLabel}</label>
        <div className="input_group">
            <input type={typeInput} className={`form_input ${big}`} name={idName} id={idName} onInput={handleInput} onChange={onChange? onChange:handleNameChange} value={value? `${value}`:name}/>
            <i className="state_validation fas fa-circle-xmark"></i>
            {password && <i className={`eye_form ${pas} fa-regular fa-eye`} onClick={clickPassword}></i>}
        </div>
        <p className="input_error_form">{errorText}</p>
        {user && <p className="input_error_form_user">El nombre de usuario ya está en uso.</p>}
        {mail && <p className="input_error_form_mail">El correo electrónico introducido ya está vinculado con otra cuenta.</p>}
    </div>
);
}

export default InputValidation;

