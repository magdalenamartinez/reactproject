import React from "react";
import changePostalcod from "../funciones/postalcod";
import changeProvincia from "../funciones/provincia";
import Input from "../../login/input/input.js";
import Select from "../../login/input/select.js";
import { provincias } from "../../funcionalidades/load/load.js";

const DireccionForm = ({userData, formValues, handleC, setFormValues}) => {
    return (
            <div className="bloque_form" id="direccion">
                <h1 className="title_container">Dirección Actual</h1>
                <Input textLabel={"Dirección"} idName={"calle"} required={true} value={formValues.calle} onChange={handleC}/>
                <br/>
                <div className="dir1">
                    <Input textLabel={"Ciudad"} idName={"ciudad"} mini={"mini"} required={true} value={formValues.ciudad} onChange={handleC}/>
                    <Select textLabel={"Provincia"} idName={"provincia"} mapName={provincias} value={formValues.provincia} onInput={handleC} onChange={()=>changePostalcod(setFormValues)}/>
                    <Input textLabel={"Código Postal"} idName={"codpostal"} required={true}  onChange={()=>changeProvincia(setFormValues)} onInput={handleC} mini={"mini"} value={formValues.codpostal}/>                       
                </div>
            </div>
    )};

    export default DireccionForm;