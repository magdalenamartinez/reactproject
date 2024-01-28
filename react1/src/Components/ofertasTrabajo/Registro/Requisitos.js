import React from "react";

function Requisitos({inputRequisitos, handleC}) {
    return(
    <div className='bloque_form'>
        <h1 className='title_container'>Requisitos para el Solicitante</h1>
        <div className='form_group'>
            <div className='input_group'>
                <textarea type="text" onChange={handleC} className="form_textarea form_input big" name="requisitos" id="requisitos" defaultValue={inputRequisitos} required/>
            </div>
        </div>
    </div>
    );
}

export default Requisitos;