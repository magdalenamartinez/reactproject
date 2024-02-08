import React from "react";
import password_visibility from '../../funcionalidades/password';
import ReCAPTCHA from "react-google-recaptcha";
import { useStyle } from "../../styleContext";
import {Link} from 'react-router-dom'
function LoginForm({text, handleSubmit, handleForgotPassword, setRecaptchaToken, textPassword, textAccount, time, errorType, registroLink, setAdmin, admin})
{
    const recaptchaChange = (token) => {
        setRecaptchaToken(token)
    }

    
    const {style} = useStyle();
    
    const st = {
        fondoContrast: style.highContrast ? 'formContrast' : '',
        inputContrast: style.highContrast ? 'formInputContrast2' : '',
        botonContrast: style.highContrast ? 'yellow_button' : '',
        fondoDark: style.darkMode ? 'formDark' : '',
        inputDark: style.darkMode ? 'inputDark' : '',
      };

    return(
        <div className='contenedor'>
        <div className={`formulario form_container ${st.fondoContrast} ${st.fondoDark}`}>
            <div className='text_container'>
            <h1 className='title_container'>{text}</h1>
            <form className="form_class" onSubmit={handleSubmit} encType='multipart/form-data'>
                 <div className="form_group" id="user_group">
                    <label htmlFor="user" className="form_label">Usuario</label>
                    <div className="input_group">
                        <input type="text" className={`form_input ${st.inputContrast} ${st.inputDark} `} name="user" id="user"/>
                    </div>
                </div>
                {admin && (
                     <div className="form_group" id="secretKey_group">
                     <label htmlFor="secret_key" className="form_label">Clave Secreta</label>
                     <div className="input_group">
                         <input type="password" className={`form_input ${st.inputContrast} ${st.inputDark} `} name="secret_key" id="secret_key"/>
                         <i className="eye_form pas7 fa-regular fa-eye" onClick={() => password_visibility('secret_key', 'pas7')}></i>
                     </div>
                 </div>
                )}  
                <div className="form_group" id="password_group">
                    <label htmlFor="password" className="form_label">Contraseña</label>
                    <div className="input_group">
                        <input type="password" className={`form_input ${st.inputContrast} ${st.inputDark}`} name="password" id="password"/>
                        <i className="eye_form pas6 fa-regular fa-eye" onClick={() => password_visibility('password', 'pas6')}></i>
                    </div>
                    {errorType === 1 && <p className={`paragraph_error ${st.botonContrast}`} id="parr">El nombre de usuario o la contraseña introducidos son incorrectos</p>}
                    {errorType === 2 && <p className={`paragraph_error ${st.botonContrast}`} id="parr2">Error de Verificación de Recaptcha</p>}
                    {errorType === 3 && <p className={`paragraph_error ${st.botonContrast}`} id="parr3">Su cuenta ha sido bloqueada durante {time} minutos tras superar el número máximo de intentos permitos</p>}
                </div>
                <div className="forgot">
                    <button type="button" className={`${style.highContrast ? st.botonContrast : 'form_link'}`} onClick={handleForgotPassword}>{textPassword}</button>
                </div>
                <div className="forgot">
                    <button type="button" className={`${style.highContrast ? st.botonContrast : 'form_link'}`} onClick={()=>setAdmin(!admin)}>{admin? 'No soy Admin' : 'Admin'}</button>
                </div>
                <div className='recaptchaClass'>
                    <ReCAPTCHA  sitekey="6LcbpF8pAAAAACntAJXGCyc1OggIYeI6OqfvVsh_" onChange={recaptchaChange}></ReCAPTCHA>
                </div>
                <button className={`submit_button ${st.botonContrast}`} type="submit">Iniciar Sesión</button>
                <div className="nuevacuenta">
                    <Link to={admin? '/registerAdmin' : registroLink} className={`${style.highContrast ? st.botonContrast : 'sincuenta form_link'}`}>{admin? 'Crear Cuenta Admin' : textAccount}</Link>
                </div>
            </form>
            </div> 
        </div>
    </div>
    );
}

export default LoginForm;