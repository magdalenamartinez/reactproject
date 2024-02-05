const getInfo = async(id, tableName, setData, token) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/infoRoute/get-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, table:tableName, token: token}),
        });
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
               console.log(responseData.data);
               setData(responseData.data);
            }
        }
    } catch (error) {
        // Manejar errores
        console.error('Error:', error);
    }
}

export default getInfo;