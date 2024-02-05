const completeDelete = async(id, table, handleLogout) => {
    const response = await fetch('https://backend-empleoinclusivo.onrender.com/deleteRoute/delete-data', {method:'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({id: id, table: table}),});
        if (response.ok) {
            handleLogout();
        } else {
            alert('Se ha producido un error al intentar eliminar la Cuenta. Vuelva a Intentarlo.');
        }
}

export default completeDelete;