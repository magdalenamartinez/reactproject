const getFavs = async (id, tableName, setHeartState) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/favRoute/get-favs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, table:tableName}),
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
               console.log(responseData.data);
               const initialHeartStates = responseData.data.reduce((acumulador, id) => {
                acumulador[id] = true;
                console.log('acumulador en true',acumulador[id]);
                return acumulador;
              }, {});
              setHeartState(initialHeartStates);
            }
        }
    } catch (error) {
        // Manejar errores
        console.error('Error:', error);
    }
};

export default getFavs;