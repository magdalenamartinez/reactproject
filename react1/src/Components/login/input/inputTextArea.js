import React from "react";
import limitartexto from "../../funcionalidades/limitartexto";
import { useState } from "react";
import { useStyle } from "../../styleContext";

function InputTextArea({idName, textLabel, mini, area, onChange, value}) {
    const {style} = useStyle();
    
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

    const st = {
        inputContrast: style.highContrast ? 'inputContrast' : '',
        inputDark: style.darkMode ? 'inputDark' : '',
      };

    return(
        <div className={`form_group ${mini? mini:''}`} >
            <label className="form_label" htmlFor={idName}>{textLabel}</label> 
            <div className='input_group'>
                <textarea className={`form_textarea ${area} form_input ${st.inputContrast} ${st.inputDark}`} id={idName} name={idName} onInput={handleInput} onChange={handleNameChange} value={value? `${value}`:name}></textarea> 
            </div>
        </div>
    );
}

export default InputTextArea;