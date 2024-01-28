import React from "react";
import Input from "../../login/input/input";

const ExperienciaForm = ({userData, formValues, handleC}) => {
    return(
        <div className="bloque_form" id="experiencia_laboral">
            <h1 className="title_container">Experiencia Laboral</h1>
            <div className="experiencia" id ="exp">
                <Input textLabel={"Posición Anterior"} idName={"posanterior"} value={formValues.posanterior} onChange={handleC}/>
                <div className="dir1">
                    <Input textLabel={"Empresa"} idName={"empresa"} mini={"mini"}  value={formValues.empresa} onChange={handleC}/>
                    <Input textLabel={"Duración"} idName={"duracion"} mini={"mini"} value={formValues.duracion} onChange={handleC}/>
                </div>
            </div>
        </div>
    )
};

export default ExperienciaForm;