const handleActive = async(id, setIsSearching) => {
        
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/clientRoute/change-active', {
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({id: id})
    });
    if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
            setIsSearching(prevState => !prevState);
        } else {
            console.log('error');
        }
      }
    } catch (error) {
      console.log('Se ha producido un error', error);
    }
};

export default handleActive;