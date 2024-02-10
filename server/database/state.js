const connection = require('./db');

function SetState(id) {
    return connection.promise().query('UPDATE clientes SET active = CASE WHEN active = 0 THEN 1 ELSE 0 END WHERE id = ?', [id]);
}

function GetState(id) {
    return connection.promise().query('SELECT active, correo FROM clientes WHERE id = ?', [id])
    .then(([rows]) => {
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    })
    .catch(error => {
        console.error('Error en la consulta SQL:', error);
        throw error;
    });
}

module.exports = {
    SetState,
    GetState
}