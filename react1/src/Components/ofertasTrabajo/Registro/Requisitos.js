import React from "react";
import { useStyle } from "../../styleContext";
function Requisitos({inputRequisitos, handleC}) {
            
    const {style} = useStyle();

    const st = {
        inputContrast: style.highContrast ? 'inputContrast' : '',
        inputDark: style.darkMode ? 'inputDark' : '',
    };
    return(
    <div className='bloque_form'>
        <h1 className='title_container'>Requisitos para el Solicitante</h1>
        <div className='form_group'>
            <div className='input_group'>
                <textarea type="text" onChange={handleC} className={`form_textarea form_input big ${st.inputContrast} ${st.inputDark}`} name="requisitos" id="requisitos" defaultValue={inputRequisitos} required/>
            </div>
        </div>
    </div>
    );
}

export default Requisitos;