// tengocuenta.js
import React, { useState } from 'react';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../funcionalidades/userContext';
import handleLogin from './handleLogin';
import LoginForm from './loginForm';
import Spinner from '../../spinner';
function TengoCuenta() {
    const {login} = useUser();
    const navigate = useNavigate();
    const [seconddone, set2done] = useState(false);
    const [time, setTime] = useState(0);
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [loading, setLoading] = useState(false);


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

      const handleSubmit = async(event) => {
        setLoading(true);
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;
        const result = await handleLogin(event, 'clientes', user, password, recaptchaToken, login, navigate, setTime);
        setLoading(false);
        if (result.messageType === 'error') {
          if (result.errorType === 'login') {
              document.getElementById('parr2').classList.remove('hidden');
              document.getElementById('parr').classList.add('hidden');
          } else if (result.errorType === 'recaptcha') {
              setTime(result.time);
              document.getElementById('parr3').classList.remove('hidden');
              document.getElementById('parr').classList.add('hidden');
              document.getElementById('parr2').classList.add('hidden');
          } else {
              document.getElementById('parr').classList.remove('hidden');
              document.getElementById('parr2').classList.add('hidden');
          }
      }
      }


      function handleForgotPassword() {
            localStorage.removeItem('t');
            localStorage.setItem('t',1);
            navigate('/forgotPassword');
      };
        
      if (loading) {
        return(
          <Spinner/>
        )
      }
      return (
        <LoginForm text={'Iniciar Sesión'} textPassword={'¿Olvidaste tu Contraseña?'}
        handleSubmit={handleSubmit} handleForgotPassword={handleForgotPassword} setRecaptchaToken={setRecaptchaToken}
        textAccount={'Crear Cuenta'} time={time}/>
  );
};

export default TengoCuenta;
