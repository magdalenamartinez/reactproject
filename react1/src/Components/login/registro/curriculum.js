import React from "react";
import inputFunction from "../../funcionalidades/inputChange/inputFunction";
import { useStyle } from "../../styleContext";

function Curriculum({handleDeleteCurriculum, onChange, href, stylec}) {
        
    const {style} = useStyle();
    
    const st = {
        botonContrast: style.highContrast ? 'yellow_button' : '',
      };
    return(
        <div className="dch form_group">
            <label className="form_label" htmlFor="curriculum">Subir Currículum Vitae</label>
            <input  name="curriculumInput" className="form_input " type="file" id="curriculumInput" style={{display: 'none'}} onChange={onChange}/>
            <a href={href? href:"#"} className={`form_button ${st.botonContrast}`} style={stylec} target="_blank" id="linkDownload">Descargar Archivo</a>
            <div className="leftright">
                <div className="left">
                    <button type="button" onClick={() => inputFunction('curriculumInput')} className={`form_button ${st.botonContrast}`} id="boton_curriculum">Cargar Archivo</button>
                </div>
                <div className="right">
                    <button id="borrarCurriculum" type="button" style={stylec} onClick={()=>handleDeleteCurriculum()} className={`form_button ${st.botonContrast}`} >Eliminar Curriculum</button>
                </div>
            </div>
        </div>
    );
}
export default Curriculum;