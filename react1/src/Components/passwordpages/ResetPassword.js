// ResetPassword.js
import React, { useEffect, useState } from "react";
import password_visibility from "../funcionalidades/password.js";
import ValidateFormulary from "../funcionalidades/formulario.js";
import { fieldsPass } from "../funcionalidades/load/load.js";

const ResetPassword = () => {
    const [userId, setUserId] = useState(null);
    const [table, setTable] = useState(null);
    const [show, setShow] = useState(false);
    const [token, setToken] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        setUserId(id);
        const tokenValor = searchParams.get('token');
        setToken(tokenValor);
        const t = searchParams.get('t');
        if (t === '1') {
            setTable('clientes');
        } else if (t === '2') {
            setTable('empresas');
        }
        checkToken();
    });

    const checkToken = async() => {

        try {
            if (token) {
                const res = await fetch(`http://localhost:3000/checkUserRoute/check-token?token=${token}&table=${table}&id=${userId}`);
                if (res.ok) {
                    const response = await res.json();
                    if (response.success) {
                        console.log(userId);
                        console.log(parseInt(userId) === -1);
                        if (parseInt(userId) === -1) {
                            localStorage.setItem('TimeExpired', 'true');
                            localStorage.removeItem('SecurityProblem');
                            window.location.href='/';
                        } else {
                            setShow(true);
                        }
                        
                    } else {
                            localStorage.setItem('SecurityProblem', 'true');
                            localStorage.removeItem('TimeExpired');
                            window.location.href='/';
                    }
            }
        }

        } catch (error) {
            console.error('Error al verificar el correo:', error);
        } 
    };
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        const areAllFieldsValid = Object.values(fieldsPass).every((value) => value === true);
        if (areAllFieldsValid) {
            const password = document.getElementById('password').value;
            const data = {
                password: password,
                id: userId,
                table: table
            };
            try {
                const response = await fetch('/changePasswordRoute/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.success) {
                        localStorage.setItem('successPasswordChange', 'true');
                        window.location.href = '/';
                    } else {
                        document.getElementById('servererror').classList.remove('hidden');
                    }
                }
            } catch (error) {
                console.error("Se ha producido un error: ", error);
            }
        } else {
            alert("Compruebe que la contraseña cumple los criterios y coincide con la confirmación.");
        }
    };
   
    if (show === false) {
        return(<div></div>);
    } else {
    return (
        <div>
            {show===true &&(
                <div className="formulario contenedor contenedor_password">
                    <p className="paragraph_error hidden" style={{backgroundColor:'#611668'}} id="servererror">Se ha producido un error al guardar la contraseña, vuelva a intentarlo. </p>
                <form className="" method="post" action="/changePasswordRoute/change-password" onSubmit={handleSubmit} onInput={ValidateFormulary(fieldsPass)} encType='multipart/form-data'>
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
            )}
            
             
        </div>
    );};
};

export default ResetPassword;
