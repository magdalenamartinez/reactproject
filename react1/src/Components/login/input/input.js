import React from "react";
import { useState } from "react";
function Input({idName, textLabel, mini, required, onChange, value, onInput}) {
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
                <input className="form_input" type="text" id={idName} name={idName} onInput={onInput} {...(required ? { required: "required" } : {})} onChange={handleNameChange} value={value? `${value}`:name}/>
            </div>
        </div>
    );
}

export default Input;