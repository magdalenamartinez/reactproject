import React from "react";
import { useState } from "react";
import { useStyle } from "../../styleContext";

function Select({idName, mapName, textLabel, mini, onChange, onInput, value}) {
    const [name, setName] = useState('');

    const {style} = useStyle();

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
        <div className={`form_group ${mini? mini:''}`}>
            <label className="form_label" htmlFor={idName}>{textLabel}</label>
            <div className='input_group'>
                <select className={`elect_form form_input ${st.inputContrast} ${st.inputDark}`} id={idName} name={idName} onChange={handleNameChange} onInput={onInput} value={value? `${value}`:name}>
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