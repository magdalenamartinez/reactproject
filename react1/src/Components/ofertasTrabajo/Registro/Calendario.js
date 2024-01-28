import React from "react";

function Calendario({inputCalendar, handleC}) {
    return(
    <div className="bloque_form" id="empresa">
        <h1 className="title_container" htmlFor="calendarioEventos">Calendario de Eventos</h1>
        <div className='form_group'>
            <div className='input_group'>
                <textarea className="form_textarea form_input" type="text" onChange={handleC} id="calendarioEventos" name="calendarioEventos" defaultValue={inputCalendar} placeholder="  Ejemplo: Fecha límite de aplicaciones, de entrevistas, ..."/>                            
            </div>
        </div>
    </div>
    );
}
export default Calendario;