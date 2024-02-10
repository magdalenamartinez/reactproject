const connection = require('./db');

function ReadToken(table, token) {
    return connection.promise().query(`SELECT id, resetTokenExpiration FROM ?? WHERE resetToken=?`, [table, token])
        .then(([rows]) => {
            if (rows.length > 0) {
                const expirationDate = new Date(rows[0].resetTokenExpiration);
                const currentDate = new Date();
                //comparamos fechas
                if (expirationDate.getTime() > currentDate.getTime()) {
                    console.log('holaholita');
                    //El token es valido aun
                    return parseInt(rows[0].id);
                } else {
                    return -1;
                }
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error al leer desde la base de datos:', error);
            throw error;
        });
}

function storeToken (id, token, expirationDate, table) {
    return connection.promise().query('UPDATE ?? SET resetToken = ?, resetTokenExpiration = ? WHERE id = ?', [table, token, expirationDate, id]);

}

function storeTokenSesion(data) {
    return connection.promise().query('INSERT INTO session_tokens SET ?', data);
}


async function verifySessionToken(userId, token, tableName) {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM session_tokens WHERE user_id = ? AND token = ? AND tableName = ?', [userId, token, tableName]);
        return rows.length > 0;
    } catch (error) {
        console.error('Error al verificar el token de sesión:', error);
        throw error;
    }
}

module.exports = {
    ReadToken,
    storeToken,
    storeTokenSesion,
    verifySessionToken
}