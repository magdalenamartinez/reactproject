// tengocuenta.js
import React, { useState } from 'react';
import password_visibility from '../../funcionalidades/password';
import { useEffect} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import '../../../css/index.css';
import '../../../css/form_sesion.css';

function TengoCuenta() {
    const [seconddone, set2done] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState("");

    const recaptchaChange = (token) => {
        setRecaptchaToken(token)
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true; //para q se cargue de forma asincrona y no ralentice la renderizacion de la web
        script.defer = true; //para q el script solo se ejecute cuando este completamente cargado
        document.head.appendChild(script);
      }, []); //[] -> para q se ejecute 1 sola vez

      useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (!seconddone && params.has('user') && params.get('user') === 'false') {
            set2done(true);
            document.getElementById('parr').classList.remove('hidden');
        }
      }, [seconddone]);

      const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log('recaptcha' + recaptchaToken);
        const user = document.getElementById('user').value;
        console.log(user);
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://backend-empleoinclusivo.onrender.com/loginUserRoute/try-login', {method:'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({user, password, recaptchaToken: recaptchaToken, table:'clientes'}),});
            if (response.ok) {
                const responseData = await response.json();
            
                if (responseData.success) {
                    console.log("Datos del usuario", responseData.data);
                    localStorage.setItem('userData', JSON.stringify(responseData.data));
                    window.location.href = '/perfilUsuario';
                } else if (!responseData.success && responseData.number === 1) {
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
            localStorage.setItem('t',1);
            window.location.href = '/forgotPassword';
      };
        
      return (
                <div className='contenedor'>
                    <div className="formulario form_container">
                        <div className='text_container'>
                        <h1 className='title_container2'>Iniciar Sesión</h1>
                        <form className="form_class" method="post" action="/loginUserRoute/try-login" onSubmit={handleSubmit}>
                             <div className="form_group" id="user_group">
                                <label htmlFor="user" className="form_label">Usuario</label>
                                <div className="input_group margin_input_group">
                                    <input type="text" className="form_input margin_input" name="user" id="user"/>
                                </div>
                            </div>
                            <div className="form_group" id="password_group">
                                <label htmlFor="password" className="form_label">Contraseña</label>
                                <div className="input_group margin_input_group">
                                    <input type="password" className="form_input margin_input" name="password" id="password"/>
                                    <i className="eye_form pas5 fa-regular fa-eye" onClick={() => password_visibility('password', 'pas5')}></i>
                                </div>
                            <p className="paragraph_error hidden" id="parr">El nombre de usuario o la contraseña introducidos son incorrectos</p>
                            <p className="paragraph_error hidden" id="parr2">Error de Verificación de Recaptcha</p>
                            </div>
                            <div className="forgot">
                                <button className="form_link" onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</button>
                            </div>
                            <div className='recaptchaClass'>
                                <ReCAPTCHA  sitekey="6LcbpF8pAAAAACntAJXGCyc1OggIYeI6OqfvVsh_" onChange={recaptchaChange}></ReCAPTCHA>
                            </div>
                            <button className="submit_button" type="submit">Iniciar Sesión</button>
                            <div className="nuevacuenta">
                                <a href="/registroUsuario" className='sincuenta form_link'>No tengo una Cuenta</a>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
    
  );
};

export default TengoCuenta;
