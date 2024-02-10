const getProfile = async(id, tableName, setData, token) => {
    try {
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/infoRoute/get-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, table:tableName, token: token}),
        });
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
               setData(responseData.data);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export default getProfile;