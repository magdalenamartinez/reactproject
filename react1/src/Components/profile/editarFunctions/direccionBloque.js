import React from "react";
import changePostalcod from "./postalcod";
import changeProvincia from "./provincia";
import {provincias} from "../../funcionalidades/load/load.js";
import Input from "../../login/input/input.js";
import Provincia from "../../login/registro/provincia.js";

const DireccionForm = ({userData, formValues, handleC, setFormValues}) => {
    return (
            <div className="bloque_form" id="direccion">
                <h1 className="title_container">Dirección Actual</h1>
                <Input textLabel={"Dirección"} idName={"calle"} required={true} value={formValues.calle} onChange={handleC}/>
                <br/>
                <div className="dir1">
                    <Input textLabel={"Ciudad"} idName={"ciudad"} mini={"mini"} required={true} value={formValues.ciudad} onChange={handleC}/>
                    <Provincia value={formValues.provincia} onChange={()=>changePostalcod(setFormValues)} onInput={handleC}/>
                    <Input textLabel={"Código Postal"} idName={"codpostal"} required={true}  onChange={()=>changeProvincia(setFormValues)} onInput={handleC} mini={"mini"} value={formValues.codpostal}/>                       
                </div>
            </div>
    )};

    export default DireccionForm;