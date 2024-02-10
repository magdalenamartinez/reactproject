const connection = require('./db');

function SetPublish(id) {
    return connection.promise().query('UPDATE oferta_empleo SET publish = CASE WHEN publish = 0 THEN 1 ELSE 0 END WHERE id = ?', [id]);
}

function GetPublishById(id) {
    return connection.promise().query('SELECT publish FROM oferta_empleo WHERE id = ?', [id])
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

function GetPublish() {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT oferta_empleo.*, empresas.name AS nombre_empresa
            FROM oferta_empleo
            JOIN empresas ON oferta_empleo.id_empresa = empresas.id
            WHERE oferta_empleo.publish = 1
        `, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


module.exports = {
    SetPublish,
    GetPublishById,
    GetPublish
}