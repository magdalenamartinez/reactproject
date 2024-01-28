import React from "react";
import { provincias } from "../../funcionalidades/load/load.js";
import { useState } from "react";
function Provincia({onChange, onInput, value}) {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        if (onChange) {
            onChange(event);
          }
    };
    return(
        <div className="form_group mini">
            <label className="form_label" htmlFor="provincia">Provincia</label>
            <div className='input_group'>
                <select name="provincia" id="selectProvincias" className="select_form form_input" onChange={handleNameChange} onInput={onInput} value={value? `${value}`:name}>     
                    {provincias.map((provincia, index) => (
                        <option key={index} value={provincia} className='option'>
                        {provincia}
                        </option>
                    ))}                               
                </select>
            </div>
        </div>
    );
}

export default Provincia;