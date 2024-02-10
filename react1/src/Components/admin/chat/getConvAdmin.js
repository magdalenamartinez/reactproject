import React from "react";

const getConversationsAdmin = async(id, token, table, setConversaciones) => {
    try {
        const response = await fetch('/adminRoute/get-messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, token: token, table:table}),
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
                setConversaciones(responseData.data);
                console.log(responseData.data);
          }
        }
      } catch (error) {
        console.log('Se ha producido un error al intentar añadir la oferta a favoritos', error);
      }
}

export default getConversationsAdmin;