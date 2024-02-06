import React from "react";
import InputChange3 from "../../funcionalidades/inputChange/inputChange3.js";
import NivelEducacion from "../../login/registro/nivelEducacion.js";
import Input from "../../login/input/input.js";
import Curriculum from "../../login/registro/curriculum.js";

const EducacionForm = ({userData, formValues, handleC, handleDeleteCurriculum, setDeleteCurriculum}) => {
    return (
        <div className="bloque_form" id="clase_educacion">
            <h1 className="title_container">Educación</h1>
            <NivelEducacion value={formValues.nivel_educacion} onChange={handleC}/>
            <div className="titulos comun">
                <div className="titulos_academicos izq" id='titulos_ac'>
                    <Input textLabel={"Título Académico Obtenido"} idName={"titulo"} value={formValues.titulo} onChange={handleC}/>
                    <Input textLabel={"Institución"} idName={"institucion"} value={formValues.institucion} onChange={handleC}/>
                </div>
                <Curriculum handleDeleteCurriculum={handleDeleteCurriculum} onChange={(event) => { handleC(event); InputChange3('curriculumInput', 'linkDownload'); setDeleteCurriculum(false);}}
                href={`${userData.curriculum}?curriculumName=${userData.curriculumName}`}
                style={{ display: userData.curriculum ? 'block' : 'none' }}/>
            </div>
        </div>
    )};

export default EducacionForm;
