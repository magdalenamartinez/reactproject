const getSolicitudesByIdOferta = async (id_oferta, tableName, tableToSearch, setHeartState, setOfertas) => {
    try {
        const response = await fetch('/applyRoute/get-clientes-by-idOferta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_oferta: id_oferta, table:tableName, tableToSearch: tableToSearch}),
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
               if (responseData.data == null) {
                    return;
               }
               const ofertaIds = responseData.data.map(oferta => oferta.id);
               const initialHeartStates = ofertaIds.reduce((acumulador, id) => {
                acumulador[id] = true;
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

export default getSolicitudesByIdOferta;