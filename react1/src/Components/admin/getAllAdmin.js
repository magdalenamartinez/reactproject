const getAllAdmin = async(userData, table, setData, setObtainedData, setDeleteStates, empresaId) => {
    try {
        let id_empresa = empresaId? empresaId:0;
        if (userData.typeUser === 3) {
            const response = await fetch('https://backend-empleoinclusivo.onrender.com/adminRoute/get-all', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userData.id, table:table, token: userData.token, id_empresa:id_empresa}),
            });
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.success) {
                   setData(responseData.data);
                   setObtainedData(true);
                   const initialDeleteStates = responseData.data.reduce((acumulador, one) => {
                    acumulador[one.id] = false;
                    return acumulador;
                  }, {});
                  setDeleteStates(initialDeleteStates);
                }
            }
        }
    } catch (error) {
        // Manejar errores
        console.error('Error:', error);
    }
}

export default getAllAdmin;