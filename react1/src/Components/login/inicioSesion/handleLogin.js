import React from "react";

const handleLogin = async (event, table, user, password, recaptchaToken, login, navigate, setTime, secret_key) => {
    event.preventDefault();
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/loginUserRoute/try-login', {method:'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({user, password, recaptchaToken: recaptchaToken, table:table, secret_key:secret_key}),});
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
                const userData = { typeUser: responseData.typeUser, id: responseData.id, user: responseData.user, image: responseData.image, token: responseData.token };
                console.log(userData);
                login(userData);
                if (userData.typeUser === 1) {
                    navigate('/perfilUsuario');
                } else if (userData.typeUser === 2) {
                    navigate('/perfilEmpresa');
                } else if (userData.typeUser === 3) {
                    navigate('/dashboard_admin');
                }
                // hacer el navigate
            } else if (!responseData.success && responseData.number === 0) {
                return { messageType: 'error', errorType: 'login'};
            } else if (!responseData.success && responseData.number === 1) {
                return { messageType: 'error', errorType: 'recaptcha' };
            } else if (!responseData.success && responseData.number === 2){
                setTime(responseData.time);
                return { messageType: 'error', errorType: 'block'};
            } 
        } else {
            // Manejar errores de red o de la solicitud
            console.error("Error de red o en la solicitud");
            return { messageType: 'error', errorType: 'network'};
        }
        
        
    } catch (error) {
        console.error("Se ha producido un error: ", error);
    }
  };


  export default handleLogin;