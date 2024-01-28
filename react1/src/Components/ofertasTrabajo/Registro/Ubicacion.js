import React from "react";
import { provincias } from "../../funcionalidades/load/load";
import changePostalcod from "../../profile/editarFunctions/postalcod";
import changeProvincia from "../../profile/editarFunctions/provincia";

function Ubicacion({inputProvince, inputPostalCode, handleC, setFormValues}) {

    return(
        <div className='bloque_form'>
            <h1 className='title_container'>Ubicación del Puesto</h1>
            <div className='form_group mini'>
                <label className="form_label" htmlFor="provincia">Provincia</label>
                <div className='input_group'>
                    <select name="provincia" id="provincia"className="select_form form_input" defaultValue={inputProvince} onChange={()=>changePostalcod(setFormValues)} onInput={handleC}>     
                        {provincias.map((provincia, index) => (
                            <option key={index} value={provincia} className="option">
                            {provincia}
                            </option>
                        ))}                               
                    </select>
                </div>
            </div>
            <div className='form_group mini'>
                <label className="form_label" htmlFor="codpostalfOR">Código Postal</label>
                <div className='input_group'>
                    <input className="form_input" type="text" onInput={handleC} id="codpostal" name="codpostal" defaultValue={inputPostalCode} onChange={() =>changeProvincia()} required/>
                </div>
            </div>
        </div>
    );
}

export default Ubicacion;