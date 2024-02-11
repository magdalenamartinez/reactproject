const deleteConversationApply = async(id, userid, type, setDeleteStates) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/chatRoute/delete-conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, userid:userid, type:type}),
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
                setDeleteStates(prevStates => ({
                    ...prevStates,
                    [id]: !prevStates[id],
                }));
            }
        }
      } catch (error) {
        console.log('Se ha producido un error al intentar añadir la oferta a favoritos', error);
      }
}

export default deleteConversationApply;