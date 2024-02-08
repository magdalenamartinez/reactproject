
const getByFecha = async (setNumOfertasPorFecha, setFechas) => {
    try {
      const response = await fetch('https://backend-empleoinclusivo.onrender.com/adminRoute/get-by-fecha', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
            console.log(responseData);
            console.log(responseData.numofertasporfecha);
            console.log(responseData.fechas);
          setNumOfertasPorFecha(responseData.numofertasporfecha);
          setFechas(responseData.fechas);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export default getByFecha;