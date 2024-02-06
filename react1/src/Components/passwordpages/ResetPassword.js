// ResetPassword.js
import React, { useEffect, useState } from "react";
import password_visibility from "../funcionalidades/password.js";
import ValidateFormulary from "../funcionalidades/formulario.js";
import { fieldsPass } from "../funcionalidades/load/load.js";
import Spinner from "../spinner.js";
import { useStyle } from "../styleContext.js";
import checkTokenValidity from "./checkToken.js";
import submitPassword from "./submitPass.js";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [table, setTable] = useState(null);
    const [token, setToken] = useState(null);
    const [valid, setValid] = useState(false);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const hashParams = window.location.hash.substring(17); 
        const params = new URLSearchParams(hashParams);
        const tokenCopy = params.get('token');
        const t = params.get('t');

        if (tokenCopy) {
            setToken(tokenCopy);
        }
        if (t === 'c') {
            setTable('clientes'); 
        } else if (t === 'e') {
            setTable('empresas');
        } 
        
    }, []);

    useEffect(() => {
        if (!checked && table && token) {
            console.log(token);
            console.log(table);
            const verifyToken = async () => {
                const isValid = await checkTokenValidity(token, table);
                if (isValid) {
                    setValid(true);
                    console.log("El token es válido");
                } else {
                    setValid(false);
                    console.log("El token no es válido");
                }
                setChecked(true);
            };

            verifyToken();
        }
    }, [checked, table, token]);

    
    

    const handleSubmit = async(event) => {
        event.preventDefault();
        const areAllFieldsValid = Object.values(fieldsPass).every((value) => value === true);
        if (areAllFieldsValid) {
            const password = document.getElementById('password').value;
            const answer = await submitPassword(password, token, table, navigate);
            if (answer && answer.messageType === 'error') {
                document.getElementById('servererror').classList.remove('hidden');
            }
        } else {
            alert("Compruebe que la contraseña cumple los criterios y coincide con la confirmación.");
        }
    };
   
    const {style} = useStyle();
    
    const st = {
        fondoContrast: style.highContrast ? 'formContrast' : '',
        inputContrast: style.highContrast ? 'formInputContrast2' : '',
        botonContrast: style.highContrast ? 'yellow_button' : '',
        fondoDark: style.darkMode ? 'formDark' : '',
        inputDark: style.darkMode ? 'inputDark' : '',
        darkText: style.darkMode ? 'darkText' : '',
        errorContrast: style.highContrast ? 'errorContrast' : '',
      };

    if (checked === false || valid === false) {
        return(<Spinner/>);
    } else {
    return (
        <div>
            <div className={` contenedor contenedor_password ${st.fondoContrast} ${st.fondoDark}`}>
                <p className="paragraph_error hidden" style={{backgroundColor:'#611668'}} id="servererror">Se ha producido un error al guardar la contraseña, vuelva a intentarlo. </p>
            <form className="formulario" id="form_id" method="post" action="/changePasswordRoute/change-password" onSubmit={handleSubmit} onInput={ValidateFormulary(fieldsPass)} encType='multipart/form-data'>
                <h1 className="title_container">Reestablecer Contraseña</h1>
                <p className="form_label">Introduzca su nueva contraseña</p>
                <div className="form_group" id="password_group">
                    <label htmlFor="password" className="form_label">Contraseña</label>
                    <div className="input_group">
                        <input type="password" className="form_input" name="password" id="password"/>
                        <i className="state_validation fas fa-circle-xmark"></i>
                        <i className="eye_form pas1 fa-regular fa-eye" onClick={() => password_visibility('password', 'pas1')}></i>
                    </div>
                    <p className="input_error_form">La contraseña tiene que tener de 4 a 12 dígitos.
                    </p>
                    </div>
                        <div className="form_group" id="password2_group">
                        <label htmlFor="password2" className="form_label">Confirmar Contraseña</label>
                            <div className="input_group">
                                <input type="password" className="form_input" name="password2" id="password2"/>
                                <i className="state_validation fas fa-circle-xmark"></i>
                                <i className="eye_form pas2 fa-regular fa-eye" onClick={() => password_visibility('password2', 'pas2')}></i>
                            </div>
                            <p className="input_error_form">Las contraseñas tienen que ser iguales.
                            </p>
                        </div>
                        <div className="message_error_form" id="message_error_form">
                        <p>
                            <i className="fa-solid fa-triangle-exclamation" style={{color: 'deeppink'}}></i>
                            &nbsp;&nbsp;Error: &nbsp;&nbsp;Por favor, rellene los campos anteriores correctamente.
                        </p>
                    </div>
                <button className="form_button" type="submit">Cambiar Contraseña</button>
                </form>
            </div>
        </div>
    );};
};

export default ResetPassword;
