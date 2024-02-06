const checkTokenValidity = async (token, tableName) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/checkUserRoute/check-token', 
        {method:'POST', headers: {'Content-Type': 'application/json',}, 
        body: JSON.stringify({token:token, table: tableName}),});
        if (response.ok) {
            return true;
        } else {
            return false;
        }
      
    } catch (error) {
        console.error('Error while verifying token:', error);
        return { success: false, error: error.message };
    }
};

export default checkTokenValidity;
