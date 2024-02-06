import { useState, useEffect } from 'react';
import React from "react";
import checkFolder from "../funcionalidades/checkUserName.js";
import { useNavigate } from 'react-router-dom';
import { useStyle } from '../styleContext.js';
const {checkMail, getExistsMail} = checkFolder;

function ForgotPassword () {
    const navigate = useNavigate();

    const [type, setType] = useState("");
    useEffect(() => {
        const type = localStorage.getItem('t');
        setType(type);
      }, []);

    async function input_function() {
        let tableName = "";
        if (type === '1') {
            tableName = 'clientes';
        } else {
            tableName = 'empresas';
        }
        await checkMail('correo', tableName);
        if (getExistsMail() === false) {
            document.getElementById('errorNotExist').classList.add('nothidden');
            document.getElementById(`correo_group`).classList.add('form_group-incorrect');
            document.querySelector(`#correo_group i`).classList.remove('fa-solid');
            document.querySelector(`#correo_group i`).classList.remove('fa-circle-check');
            document.querySelector(`#correo_group i`).classList.add('fas');
            document.querySelector(`#correo_group i`).classList.add('fa-circle-xmark');
        } else {
            document.getElementById('errorNotExist').classList.remove('nothidden');
            document.getElementById(`correo_group`).classList.remove('form_group-incorrect');
            document.getElementById(`correo_group`).classList.add('form_group-correct');
            document.querySelector(`#correo_group i`).classList.remove('fas');
            document.querySelector(`#correo_group i`).classList.remove('fa-circle-xmark');
            document.querySelector(`#correo_group i`).classList.add('fa-solid');
            document.querySelector(`#correo_group i`).classList.add('fa-circle-check');
        }
         
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        let tableName = "";
        if (type === '1') {
            tableName = 'clientes';
        } else {
            tableName = 'empresas';
        }
        const correo = document.getElementById('correo').value;
       if (getExistsMail() === true) {
        try {
            const response = await fetch('/loginUserRoute/send-mail', 
            {method:'POST', headers: {'Content-Type': 'application/json',}, 
            body: JSON.stringify({correo:correo, table: tableName}),});
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.success) {
                    localStorage.setItem('successSendMail', 'true');
                    navigate('/');
                } else {    
                    alert('Se ha producido un error al intertar enviar el correo.');
                }
            }
        } catch (error) {
            console.error("Se ha producido un error: ", error);
        }
       }
    }
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
    return (
        <div className={`contenedor contenedor_password ${st.fondoContrast} ${st.fondoDark}`}>
            <h1 className="title_container">Introduzca su Correo Electrónico</h1>
            <div className='text_container'>
            <p className="form_label">Se le enviará un link a su correo para reestablecer la contraseña</p>
            <form  method="post" action="/loginUserRoute/send-mail" onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="form_group" id="correo_group">
                <label htmlFor="correo" className="form_label">Dirección de Correo Electrónico</label>
                <div className="input_group">
                    <input type="text" className={`form_input ${st.inputContrast} ${st.inputDark}`} name="correo" id="correo"  onInput={() => input_function()}/>
                    <i className="state_validation fas fa-circle-xmark"></i>
                </div>
                <p id="errorNotExist" className={`input_error_form ${st.errorContrast} ${st.darkText}`}>El correo electrónico introducido no está vinculado a ninguna cuenta.</p>
            </div>
            <button className={`form_button ${st.botonContrast}`} type="submit">Enviar Correo</button>
            </form>
            </div>
        </div>
    );
};

export default ForgotPassword;