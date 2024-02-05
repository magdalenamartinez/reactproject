import React from "react";
import { provincias } from "../../funcionalidades/load/load";
import changePostalcod from "../../profile/funciones/postalcod";
import changeProvincia from "../../profile/funciones/provincia";
import { useStyle } from "../../styleContext";
function Ubicacion({inputProvince, inputPostalCode, handleC, setFormValues}) {
        
    const {style} = useStyle();

    const st = {
      inputContrast: style.highContrast ? 'inputContrast' : '',
      inputDark: style.darkMode ? 'inputDark' : '',
    };

    return(
        <div className='bloque_form'>
            <h1 className='title_container'>Ubicación del Puesto</h1>
            <div className='form_group mini'>
                <label className="form_label" htmlFor="provincia">Provincia</label>
                <div className='input_group'>
                    <select name="provincia" id="provincia"className={`select_form form_input ${st.inputContrast} ${st.inputDark}`} defaultValue={inputProvince} onChange={()=>changePostalcod(setFormValues)} onInput={handleC}>     
                        {provincias.map((provincia, index) => (
                            <option key={index} value={provincia} className={`option`}>
                            {provincia}
                            </option>
                        ))}                               
                    </select>
                </div>
            </div>
            <div className='form_group mini'>
                <label className="form_label" htmlFor="codpostalfOR">Código Postal</label>
                <div className='input_group'>
                    <input className={`form_input ${st.inputContrast} ${st.inputDark}`} type="text" onInput={handleC} id="codpostal" name="codpostal" defaultValue={inputPostalCode} onChange={() =>changeProvincia()} required/>
                </div>
            </div>
        </div>
    );
}

export default Ubicacion;