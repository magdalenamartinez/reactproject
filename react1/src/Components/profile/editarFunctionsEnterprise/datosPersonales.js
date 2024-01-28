import React from "react";
import password_visibility from "../../funcionalidades/password.js";
import changePostalcod from "../editarFunctions/postalcod.js";
import changeProvincia from "../editarFunctions/provincia.js";
import { provincias } from "../../funcionalidades/load/load.js";
import Correo from "../../login/registro/correo.js";
import InputValidation from "../../login/input/InputValidation.js";
import ErrorMessage from "../../login/registro/errorMessage.js";
import Select from "../../login/input/select.js";
import Input from "../../login/input/input.js";
const DatosPersonales = ({ enterpriseData, formValues, handleC, setFormValues }) => {
    return (
        <div className="bloque_form" id="datos_personales">
            <h1 className="title_container">Datos Privados</h1>
            <Correo onChange={handleC} value={formValues.correo} readOnly={true}/>
            <InputValidation idName={"password"} textLabel={"Contraseña"} typeInput={"password"}
            errorText={"La contraseña tiene que tener de 4 a 12 dígitos."} pas={'pas3'}
            clickPassword={() => password_visibility('password', 'pas3')} password={true}                            
            value={formValues.password} onChange={handleC}/>
            <InputValidation idName={"password2"} textLabel={"Confirmar Contraseña"} typeInput={"password"} pas={'pas4'}
            errorText={"Las contraseñas tienen que ser iguales."}
            clickPassword={() => password_visibility('password2', 'pas4')} password={true}                            
            value={formValues.password2} onChange={handleC}/>
            <InputValidation idName={"tlf"} typeInput={"text"}
            errorText={"Su número de teléfono solo puede estar formado por números y como máximo tener 14 dígitos."}
            textLabel={"Número de Teléfono"}
            value={formValues.tlf} onChange={handleC}/>
            <div className="dir1">
                <Select textLabel={"Provincia"} idName={"provincia"} mapName={provincias} value={formValues.provincia} onInput={handleC} onChange={()=>changePostalcod(setFormValues)}/>
                <Input textLabel={"Código Postal"} idName={"codpostal"} required={true}  onChange={()=>changeProvincia(setFormValues)} onInput={handleC} mini={"mini"} value={formValues.codpostal}/>                       
            </div>
            <ErrorMessage hidden={"hidden"}/>
        </div>
        )
    };
    
    export default DatosPersonales;
