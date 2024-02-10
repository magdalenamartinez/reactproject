const deleteData = async(id, userData, table) => {
    try {
        if (userData.typeUser === 3) {
            const response = await fetch('https://backend-empleoinclusivo.onrender.com/adminRoute/admin-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userData.id, table:table, token: userData.token, idToDelete:id}),
            });
            if (response.ok) {
                const responseData = await response.json();
                if (!responseData.success) {
                    console.log('Se ha producido un error');
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export default deleteData;