import React from "react";

const getMessages = async(id, senderType, setMessages, admin) => {
    try {
        const isAdmin = admin? true:false;
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/chatRoute/get-messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sender_id: id, type: senderType, admin:isAdmin}),
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
                setMessages(responseData.data);
                console.log(responseData.data);
          }
        }
      } catch (error) {
        console.log('Se ha producido un error al intentar añadir la oferta a favoritos', error);
      }
}

export default getMessages;