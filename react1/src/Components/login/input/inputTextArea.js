import React from "react";
import limitartexto from "../../funcionalidades/limitartexto";
import { useState } from "react";
function InputTextArea({idName, textLabel, mini, area, onChange, value}) {
    const handleInput = () => {
        limitartexto(idName);  // Pasar solo el ID, no un objeto
    };
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);

        if (onChange) {
            onChange(event);
          }
    };

    return(
        <div className={`form_group ${mini? mini:''}`} >
            <label className="form_label" htmlFor={idName}>{textLabel}</label> 
            <div className='input_group'>
                <textarea className={`form_textarea ${area} form_input`} id={idName} name={idName} onInput={handleInput} onChange={handleNameChange} value={value? `${value}`:name}></textarea> 
            </div>
        </div>
    );
}

export default InputTextArea;