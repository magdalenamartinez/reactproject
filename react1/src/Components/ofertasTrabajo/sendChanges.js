
const sendChangesToServer = async (idOfertaOperation, action, idEmpresa) => {
    try {
       await fetch('/ofertaRoute/operation-ofertas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id:  idOfertaOperation, action: action, idEmpresa:idEmpresa}),
            });
    } catch (error) {
        console.error('Error al enviar cambios al server', error);
    }
};

export default sendChangesToServer;