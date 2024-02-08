

const getNum = async (setNumOfertas, setNumClientes, setNumEmpresas) => {
    try {
      const response = await fetch('https://backend-empleoinclusivo.onrender.com/adminRoute/get-num', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          setNumOfertas(responseData.numOfertas);
          setNumClientes(responseData.numClientes);
          setNumEmpresas(responseData.numEmpresas);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export default getNum;