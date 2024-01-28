import React from "react";
import password_visibility from "../../funcionalidades/password";
import InputChange2 from "../../funcionalidades/inputChange/inputChange2.js";
import inputFunction from "../../funcionalidades/inputChange/inputFunction.js";
import Usuario from "../../login/registro/usuario.js";
import InputValidation from "../../login/input/InputValidation.js";
import Correo from "../../login/registro/correo.js";
import Foto from "../../login/registro/foto.js";
import ErrorMessage from "../../login/registro/errorMessage.js";

const InfopersonalForm = ({ userData, formValues, handleC, handleDeleteImage, setDeleteImage}) => {
    return (
        <div className="bloque_form" id="infopersonal">
            <h1 className="title_container">Información Personal</h1>
            <div className="infopersonal_bloque comun">
                <div className="izq">
                    <Usuario readOnly={true} value={userData.user}/>
                    <InputValidation idName={"name"} big={"big"} typeInput={"text"}
                    errorText={"El nombre tiene que tener de 4 a 16 dígitos y contener únicamente letras, números y guión bajo."}
                    textLabel={"Nombre y Apellidos"} value={formValues.name} onChange={handleC}/>
                    <Correo onChange={handleC} value={formValues.correo} readOnly={true}/>
                   <InputValidation idName={"password"} textLabel={"Contraseña"} typeInput={"password"}
                    errorText={"La contraseña tiene que tener de 4 a 12 dígitos."} pas={'pas1'}
                    clickPassword={() => password_visibility('password', 'pas1')} password={true}                            
                    value={formValues.password} onChange={handleC}/>
                    <InputValidation idName={"password2"} textLabel={"Confirmar Contraseña"} typeInput={"password"} pas={'pas2'}
                    errorText={"Las contraseñas tienen que ser iguales."}
                    clickPassword={() => password_visibility('password2', 'pas2')} password={true}                            
                    value={formValues.password2} onChange={handleC}
                    />
                    <InputValidation idName={"tlf"} typeInput={"text"}
                    errorText={"Su número de teléfono solo puede estar formado por números y como máximo tener 14 dígitos."}
                    textLabel={"Número de Teléfono"}
                    value={formValues.tlf} onChange={handleC}/>
                </div>
                <Foto onChange={(event) => {handleC(event); InputChange2('imageInput', 'imageShoww'); setDeleteImage(false);}} style={{display: userData.image ? 'initial' : 'none'}} handleDeleteImage={handleDeleteImage} src={formValues.image}/>
              </div>
            <ErrorMessage hidden={"hidden"}/>                    
        </div>
    )};

    export default InfopersonalForm;