import React from "react";
import InputChange3 from "../../funcionalidades/inputChange/inputChange3";
import inputFunction from "../../funcionalidades/inputChange/inputFunction";

function Curriculum({handleDeleteCurriculum, onChange, href, style}) {
    return(
        <div className="dch form_group">
            <label className="form_label" htmlFor="curriculum">Subir Currículum Vitae</label>
            <input  name="curriculumInput" className="form_input " type="file" id="curriculumInput" style={{display: 'none'}} onChange={onChange}/>
            <a href={href? href:"#"} className="form_button " style={style} target="_blank" id="linkDownload">Descargar Archivo</a>
            <div className="leftright">
                <div className="left">
                    <button type="button" onClick={() => inputFunction('curriculumInput')} className="form_button " id="boton_curriculum">Cargar Archivo</button>
                </div>
                <div className="right">
                    <button id="borrarCurriculum" type="button" style={style} onClick={()=>handleDeleteCurriculum()} className="form_button " >Eliminar Curriculum</button>
                </div>
            </div>
        </div>
    );
}
export default Curriculum;