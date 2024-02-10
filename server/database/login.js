const connection = require('./db');

function getUserData(username, table) {
    return new Promise((resolve, reject) => {
        connection.promise().query('SELECT * FROM ?? WHERE user=?', [table, username])
        .then(([rows]) => {
            if(rows.length > 0) {
                resolve(rows[0]);
            }
        })
        .catch(error => {
            reject(error);
        })
    });
}

function getHeaderData(table, id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT image, user FROM ?? WHERE id=?', [table, id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function getHeaderDataIds(table1, ids) {
    const promises = ids.map(id => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT id, image, user, name, correo, readByAdmin
             FROM \`${table1}\` WHERE id = ?`, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    });

    return Promise.all(promises);
}

function updatePassword(table, id, password) {
    return connection.promise().query('UPDATE ?? SET password = ? WHERE id = ?', [table, password, id])
    .then(result => {
        return result.changedRows;
    })
    .catch(error => {
        console.error('Error en la consulta SQL:', error);
        throw error;
    });
}

async function getLogin(table, username) {
    try {
        const [rows] = await connection.promise().query(`SELECT id, password, block FROM ?? WHERE user=?`, [table, username]);
        if (rows.length > 0) {
            const info = rows[0];
            const id = info.id;
            const block = info.block;
            const hashPassword = info.password;
            return {id, hashPassword, block};
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

module.exports = {
    getUserData,
    getHeaderData,
    getHeaderDataIds,
    updatePassword,
    getLogin
}