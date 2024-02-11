import React from "react";

const getMessagesApply = async(idCliente, idEmpresa, senderType, setMessages) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/chatRoute/get-messages-apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sender_id: idCliente, type: senderType, id_empresa:idEmpresa}),
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
                setMessages(responseData.data);
                console.log(responseData.data);
          }
        }
      } catch (error) {
        console.log('Se ha producido un error al intentar obtener los mensajes', error);
      }
}

export default getMessagesApply;