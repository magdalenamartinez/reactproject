const connection = require('./db');

async function getSecretKeyAdmin(table, username) {
    try {
        const [rows] = await connection.promise().query(`SELECT secret_key, Validado FROM ?? WHERE user=?`, [table, username]);
        if (rows.length > 0) {
            const info = rows[0];
            const secret_key = info.secret_key;
            const Validado = info.Validado;
            return {secret_key, Validado};
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}


function validateAdmin(key, id) {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE admin SET Validado = 1, secret_key = ? WHERE id = ?', [key, id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log('ok');
                resolve(true);
            }
        });
    });
}

function checkAdmin(id, token) {
    return new Promise((resolve, reject) => {
        connection.promise().query('SELECT user FROM admin WHERE id=? AND token=?', [id, token])
        .then(([rows]) => {
            if(rows.length > 0) {
                resolve(rows[0]);
            } else {
                resolve(null);
            }
        })
        .catch(error => {
            reject(error);
        })
    });
} 


function getInfoAdmin(table) {
    return new Promise((resolve, reject) => {
        const columnsToSelect = (table === 'clientes') 
            ? ('id, user, active, name, correo, tlf, image, calle, ciudad, provincia, codpostal,' +
             'posanterior, empresa, duracion, educacion, titulo, institucion, curriculum, curriculumName, '+
             'curriculumExtension, habilidad, perfil, video, ubi')
            : ('id, user, name, tipo_empresa sector, image, correo, tlf, descripcion,' +
            'cultura, provincia, codpostal, video');
        connection.promise().query(`SELECT ${columnsToSelect} FROM ??`, [table])
        .then(([rows]) => {
            if(rows.length > 0) {
                resolve(rows);
            }
        })
        .catch(error => {
            reject(error);
        })
    });
}




module.exports = {
    getSecretKeyAdmin,
    validateAdmin,
    checkAdmin,
    getInfoAdmin
}