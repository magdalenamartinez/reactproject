const getOfertas = async (idEmpresa, setOfertas, setPublishStates, setDeleteStates) => {
    try {
        const response = await fetch('/ofertaRoute/get-ofertas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id_empresa: idEmpresa }),
        });
        
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
                setOfertas(responseData.data);
                const initialPublishStates = responseData.data.reduce((acumulador, oferta) => {
                  acumulador[oferta.id] = oferta.publish;
                  return acumulador;
                }, {});
                setPublishStates(initialPublishStates);
              
                const initialDeleteStates = responseData.data.reduce((acumulador, oferta) => {
                  acumulador[oferta.id] = false;
                  return acumulador;
                }, {});
                setDeleteStates(initialDeleteStates);
              }
        }
    } catch (error) {
        console.error('Se ha producido un error al recuperar las ofertas', error);
    }
};

export default getOfertas;