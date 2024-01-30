    const checkToken = async(token, id, tableName) => {

        try {
            if (token) {
                const res = await fetch(`https://backend-empleoinclusivo.onrender.com/checkUserRoute/check-token?token=${token}&table=${tableName}&id=${id}`);
                if (res.ok) {
                    const response = await res.json();
                    if (response === true) {
                        return true;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            }

        } catch (error) {
            console.error('Error al verificar el correo:', error);
        }
    };

    export default checkToken;