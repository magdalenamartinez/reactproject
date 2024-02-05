
const sendMail = async (id, table, message) => {
    try {
       await fetch('/mailRoute/send-mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id:  id, table: table, message: message}),
            });
    } catch (error) {
        console.error('Error al enviar cambios al server', error);
    }
};

export default sendMail;