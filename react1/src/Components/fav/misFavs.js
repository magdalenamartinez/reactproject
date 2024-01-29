const addFav = async (id, select_id, tableName, setHeartState) => {
    try {
      const response = await fetch('https://backend-empleoinclusivo.onrender.com/favRoute/change-fav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, select_id: select_id, table: tableName}),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          if (responseData.num === '1') {
            console.log('Eliminado de favoritos');
          } else if (responseData.num === '2') {
            console.log('Añadido a favoritos');
          }
          setHeartState((prevStates) => ({
            ...prevStates,
            [select_id]: !prevStates[select_id],
          }));
        } else {
          console.log('error');
        }
      }
    } catch (error) {
      console.log('Se ha producido un error al intentar añadir la oferta a favoritos', error);
    }
  };
  
  export default addFav;
  