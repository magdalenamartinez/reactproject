const submitPassword = async (password, token, table, navigate) => {
    try {
        console.log(token);
        console.log(password);
        console.log(table);
        const response = await fetch('https://backend-empleoinclusivo.onrender.com/changePasswordRoute/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password:password, token:token, table:table}),});
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
                localStorage.setItem('successPasswordChange', 'true');
                navigate("/");
            } else {
                return { messageType: 'error', errorType: 'login'};
            }
        }
    } catch (error) {
        console.error("Se ha producido un error: ", error);
    }
}

export default submitPassword;