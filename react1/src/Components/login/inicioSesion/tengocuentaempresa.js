// tengocuentaempresa.js
import React from 'react';
import password_visibility from '../../funcionalidades/password';
import { useEffect, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import '../../../css/index.css';
import config from '../../config';
import '../../../css/form_sesion.css';
import { useNavigate } from 'react-router-dom';

function InicioSesionEmpresa() {
    const navigate = useNavigate();
    const [recaptchaToken, setRecaptchaToken] = useState("");

    const recaptchaChange = (token) => {
        setRecaptchaToken(token)
    }
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }, []);

      const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log('recaptcha' + recaptchaToken);
        const user = document.getElementById('user').value;
        console.log(user);
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${config.apiUrl}/loginUserRoute/try-login`, {method:'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({user, password, recaptchaToken: recaptchaToken, table:'empresas'}),});
            if (response.ok) {
                const responseData = await response.json();
            
                if (responseData.success) {
                    console.log("Datos de la Empresa", responseData.data);
                    localStorage.setItem('enterpriseData', JSON.stringify(responseData.data));
                    navigate('/perfilEmpresa');
                } else if (!responseData.success && responseData.number == 1) {
                    document.getElementById('parr2').classList.remove('hidden');
                    document.getElementById('parr').classList.add('hidden');
                } else {    
                    document.getElementById('parr').classList.remove('hidden');
                    document.getElementById('parr2').classList.add('hidden');
                }
            }
            
        } catch (error) {
            console.error("Se ha producido un error: ", error);
        }
      };

      function handleForgotPassword() {
        localStorage.removeItem('t');
        localStorage.setItem('t',2);
        navigate('/forgotPassword');
  };
  return (
                <div className='contenedor'>
                    <div className="formulario form_container">
                        <div className='text_container'>
                        <h1 className='title_container'>Iniciar Sesión Cuenta Empresarial</h1>
                        <form className="form_class" method="post" action="/loginUserRoute/try-login" onSubmit={handleSubmit}>
                             <div className="form_group" id="user_group">
                                <label htmlFor="user" className="form_label">Usuario</label>
                                <div className="input_group">
                                    <input type="text" className="form_input" name="user" id="user"/>
                                </div>
                            </div>
                            <div className="form_group" id="password_group">
                                <label htmlFor="password" className="form_label">Contraseña</label>
                                <div className="input_group">
                                    <input type="password" className="form_input" name="password" id="password"/>
                                    <i className="eye_form pas6 fa-regular fa-eye" onClick={() => password_visibility('password', 'pas6')}></i>
                                </div>
                                <p className="paragraph_error hidden" id="parr">El nombre de usuario o la contraseña introducidos son incorrectos</p>
                                <p className="paragraph_error hidden" id="parr2">Error de Verificación de Recaptcha</p>
                            </div>
                            <div className="forgot">
                                <button className="form_link" onClick={handleForgotPassword}>¿Olvidó su Contraseña Coorporativa?</button>
                            </div>
                            <div className='recaptchaClass'>
                                <ReCAPTCHA  sitekey="6LcbpF8pAAAAACntAJXGCyc1OggIYeI6OqfvVsh_" onChange={recaptchaChange}></ReCAPTCHA>
                            </div>
                            <button className="submit_button" type="submit">Iniciar Sesión</button>
                            <div className="nuevacuenta">
                                <a href="/registroEmpresas" className="sincuenta form_link">Crear Cuenta Empresarial</a>
                            </div>
                        </form>
                        </div> 
                    </div>
                </div>
    
  );
};

export default InicioSesionEmpresa;
