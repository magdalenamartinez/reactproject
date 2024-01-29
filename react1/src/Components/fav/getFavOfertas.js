const getFavsOfertas = async (id, tableName, tableToSearch, setHeartState, setOfertas) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/favRoute/get-favs-ofertas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, table:tableName, tableToSearch: tableToSearch}),
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
               console.log(responseData.data);
               if (responseData.data == null) {
                    return;
               }
               const ofertaIds = responseData.data.map(oferta => oferta.id);
               const initialHeartStates = ofertaIds.reduce((acumulador, id) => {
                acumulador[id] = true;
                console.log('acumulador en true',acumulador[id]);
                return acumulador;
              }, {});
              setHeartState(initialHeartStates);
              setOfertas(responseData.data);

              
            }
        }
    } catch (error) {
        // Manejar errores
        console.error('Error:', error);
    }
};

export default getFavsOfertas;