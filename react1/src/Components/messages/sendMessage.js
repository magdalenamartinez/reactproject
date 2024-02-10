import React from "react";

const sendMessageDB = async(message, id, senderType, kind) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/chatRoute/save-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sender_id: id, message: message, type: senderType, kind:kind}),
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

export default sendMessageDB;
