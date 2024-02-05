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
                } else if (userData.typeUser === 2){
                    navigate('/perfilEmpresa');
                }
                //hacer el navigate
            } else if (!responseData.success && responseData.number === 1) {
                document.getElementById('parr2').classList.remove('hidden');
                document.getElementById('parr').classList.add('hidden');
            } else if (!responseData.success && responseData.number === 2) {
                setTime(responseData.time);
                document.getElementById('parr3').classList.remove('hidden');
                document.getElementById('parr').classList.add('hidden');
                document.getElementById('parr2').classList.add('hidden');
            }else {    
                document.getElementById('parr').classList.remove('hidden');
                document.getElementById('parr2').classList.add('hidden');
            }
        }
        
    } catch (error) {
        console.error("Se ha producido un error: ", error);
    }
  };


  export default handleLogin;