const connection = require('./db');

function GetMail(table, id) {
    return connection.promise().query(`SELECT correo FROM ?? WHERE id=?`, [table, id])
    .then(([rows]) => {
        if (rows.length > 0 && rows[0].correo) {
            return rows[0].correo;
        } else {
            return null;
        }
    })
    .catch(error => {
        console.error('Error al leer desde la base de datos:', error);
        throw error;
    });
}

function GetIdByMail(table, correo) {
    return connection.promise().query(`SELECT id FROM ${table} WHERE correo=?`, [correo])
        .then(([rows]) => {
            if (rows.length > 0 && rows[0].id) {
                return parseInt(rows[0].id, 10);
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error al leer desde la base de datos:', error);
            throw error;
        });
}

function ReadMail(table, correo) {
    return connection.promise().query(`SELECT correo FROM ${table} WHERE correo=?`, [correo]);
}

module.exports = {
    GetMail,
    GetIdByMail,
    ReadMail
}