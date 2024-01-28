import React from "react";
import InputTextArea from "../../login/input/inputTextArea";

const Descripcion = ({ enterpriseData, formValues, handleC, setFormValues }) => {
    return (
        <div className="bloque_form" id="descripcion_info">
            <h1 className="title_container">Descripción y Cultura de la Empresa</h1>
            <InputTextArea textLabel={"Descripción de la Empresa"} idName={"description"} area={'area3'} value={formValues.description} onChange={handleC}/>
            <InputTextArea textLabel={"Cultura de Inclusión de la Empresa"} idName={"cultura"} area={'area4'} value={formValues.cultura} onChange={handleC}/>
        </div>
)
};

export default Descripcion;
