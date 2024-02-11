import React from "react";

const getConversacionesApply = async(id, type, setConversaciones, setDeleteStates) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/chatRoute/get-conversaciones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, type: type }),
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success && responseData.data != [undefined]) {
                setConversaciones(responseData.data);
                const initialDeleteStates = responseData.data.reduce((acumulador, oferta) => {
                  acumulador[oferta.id] = false;
                  return acumulador;
                }, {});
                setDeleteStates(initialDeleteStates);
          }
        }
      } catch (error) {
        console.log('Se ha producido un error al intentar añadir la oferta a favoritos', error);
      }
}

export default getConversacionesApply;