const getProfile = async(id, tableName, setFoto, token) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/infoRoute/get-foto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, table:tableName, token: token}),
        });
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
               console.log(responseData.data);
               setFoto(responseData.data);
            }
        }
    } catch (error) {
        // Manejar errores
        console.error('Error:', error);
    }
}

export default getProfile;