import React from "react";
import InputChange2 from "../../funcionalidades/inputChange/inputChange2.js";
import { tiposEmpresa, sectores } from "../../funcionalidades/load/loadempresa.js";
import Usuario from "../../login/registro/usuario.js";
import Select from "../../login/input/select.js";
import InputValidation from "../../login/input/InputValidation.js";
import Foto from "../../login/registro/foto.js";
const DatosGenerales = ({ enterpriseData, formValues, handleC, handleDeleteImage, setDeleteImage }) => {
    return (
        <div className="bloque_form" id="empresa">
            <h1 className="title_container">Datos Generales</h1>
            <div className="comun">
                <div className="izq">
                    <Usuario readOnly={true} value={enterpriseData.user} text={"Usuario de la Cuenta de Empresa"}/>
                    <InputValidation idName={"name"} big={"big"} typeInput={"text"}
                    errorText={"El nombre tiene que tener de 4 a 16 dígitos y contener únicamente letras, números y guión bajo."}
                    textLabel={"Nombre de la Empresa"} value={formValues.name} onChange={handleC}/>
                    <br/><br/><br/>
                    <Select textLabel={"Tipo de Empresa"} idName={"tipo_empresa"} mapName={tiposEmpresa} value={formValues.tipo_empresa} onChange={handleC}/>
                    <Select textLabel={"Sector de la Industria"} idName={"sector"} mapName={sectores} value={formValues.sector} onChange={handleC}/>
                </div>
                <Foto onChange={(event) => {handleC(event); InputChange2('imageInput', 'imageShoww'); setDeleteImage(false);}} style={{display: enterpriseData.image ? 'initial' : 'none'}} handleDeleteImage={handleDeleteImage} src={formValues.image}/>
            </div>
        </div>
    )
};

export default DatosGenerales;


