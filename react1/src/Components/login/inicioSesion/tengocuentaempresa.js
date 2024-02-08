// tengocuentaempresa.js
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleLogin from './handleLogin';
import { useUser } from '../../funcionalidades/userContext';
import LoginForm from './loginForm';

function InicioSesionEmpresa() {
    const {login} = useUser();
    const navigate = useNavigate();
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [time, setTime] = useState(0);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }, []);

      const handleSubmit = async(event) => {
        let secret_key = null;
        let table = 'empresas';
        if (admin) {
          secret_key = document.getElementById('secret_key').value;
          table = 'admin';
        }
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;
        await handleLogin(event, table, user, password, recaptchaToken, login, navigate, setTime, secret_key);
      }

      function handleForgotPassword() {
        localStorage.removeItem('t');
        localStorage.setItem('t',2);
        navigate('/forgotPassword');
        };
  return (
        <LoginForm text={'Iniciar Sesión Cuenta Empresarial'} textPassword={'¿Olvidó su Contraseña Coorporativa?'}
        handleSubmit={handleSubmit} handleForgotPassword={handleForgotPassword} setRecaptchaToken={setRecaptchaToken}
        textAccount={'Crear Cuenta Empresarial'} time={time} registroLink={'/registroEmpresas'}
        setAdmin={setAdmin} admin={admin}/>
  );
};

export default InicioSesionEmpresa;
