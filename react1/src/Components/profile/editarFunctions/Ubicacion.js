import React from "react";
import RangoKm from "../../funcionalidades/rangokm";
import { useStyle } from "../../styleContext";
function Ubicacion({onChange, value, span}) {

    const {style} = useStyle();
    
    const st = {
        formrangeContrast: style.highContrast ? 'formrangeContrast' : '',
      };

    return(
        <div className="bloque_form" id="ubicacion">
            <h1 className="title_container">Preferencias de Ubicación</h1>
            <div className='input_group'>
                <input className={`form_range form_input ${st.formrangeContrast}`} type="range" name="distancia" min="0" max="700" step="1" id="barra_km" value={value} onChange={onChange}  onInput={() => RangoKm()}/>
                &nbsp;<span id="distanciaValor">  {span} km</span>
            </div>
        </div>
    );
}

export default Ubicacion;