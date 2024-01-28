import React from "react";
import { levels } from "../../funcionalidades/load/load.js";
import { useState } from "react";
function NivelEducacion({value, onChange}) {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        if (onChange) {
            onChange(event);
          }
    };
    return(
        <div className='form_group'>
            <label className="form_label" htmlFor="nivel">Nivel de Educación Alcanzado</label>
            <div className='input_group'>
                <select name="nivel_educacion" className="select_form form_input" id="nivel_educacion" value={value? `${value}`:name} onChange={handleNameChange}>
                    {levels.map((nivel, index) => (
                        <option key={index} value={nivel} className="option">
                            {nivel}
                        </option>
                    ))}      
                </select>
            </div>
        </div>

    );
}

export default NivelEducacion;