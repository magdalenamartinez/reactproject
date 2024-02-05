import React from "react";

const handleLogin = async (event, table, user, password, recaptchaToken, login, navigate, setTime) => {
    event.preventDefault();
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/loginUserRoute/try-login', {method:'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({user, password, recaptchaToken: recaptchaToken, table:table}),});
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
                }
                // hacer el navigate
            } else if (!responseData.success && responseData.number === 1) {
                return { messageType: 'error', errorType: 'login', time: null };
            } else if (!responseData.success && responseData.number === 2) {
                return { messageType: 'error', errorType: 'recaptcha', time: responseData.time };
            } else {
                return { messageType: 'error', errorType: 'default', time: null };
            }
        } else {
            // Manejar errores de red o de la solicitud
            console.error("Error de red o en la solicitud");
            return { messageType: 'error', errorType: 'network', time: null };
        }
        
        
    } catch (error) {
        console.error("Se ha producido un error: ", error);
    }
  };


  export default handleLogin;