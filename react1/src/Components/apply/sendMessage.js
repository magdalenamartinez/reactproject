

import React from "react";

const sendMessageDBApply = async(message, idEmpresa, idCliente, senderType) => {
    try {
        const response = await fetch('/chatRoute/save-message-apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sender_id: idCliente, id_empresa: idEmpresa, message: message, type: senderType}),
        });
        if (response.ok) {
          const responseData = await response.json();
          if (!responseData.success) {
                console.log('error');
          }
        }
      } catch (error) {
        console.log('Se ha producido un error al intentar añadir la oferta a favoritos', error);
      }
}

export default sendMessageDBApply;
