import React from "react";
import { useState } from "react";

function Select({idName, mapName, textLabel, mini, onChange, onInput, value}) {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        if (onChange) {
            onChange(event);
          }
    };
    return(
        <div className={`form_group ${mini? mini:''}`}>
            <label className="form_label" htmlFor={idName}>{textLabel}</label>
            <div className='input_group'>
                <select className="select_form form_input" id={idName} name={idName} onChange={handleNameChange} onInput={onInput} value={value? `${value}`:name}>
                    {mapName.map((valueName, index) => (
                        <option key={index} value={valueName} className='option'>
                            {valueName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Select;