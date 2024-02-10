const connection = require('./db');

function getInfo(id, table) {
    return new Promise((resolve, reject) => {
        const columnsToSelect = (table === 'clientes') 
            ? ('id, user, active, name, correo, tlf, image, calle, ciudad, provincia, codpostal,' +
             'posanterior, empresa, duracion, educacion, titulo, institucion, curriculum, curriculumName, '+
             'curriculumExtension, habilidad, perfil, video, ubi')
            : ('id, user, name, tipo_empresa sector, image, correo, tlf, descripcion,' +
            'cultura, provincia, codpostal, video');
        connection.promise().query(`SELECT ${columnsToSelect} FROM ?? WHERE id=?`, [table, id])
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



function getProfileInfo(id, table) {
    return new Promise((resolve, reject) => {
        const columnsToSelect = (table === 'clientes') 
            ? 'user, image, name, correo, tlf, ciudad, curriculumName, curriculum, video, active'
            : 'user, image, name, tipo_empresa, sector, provincia, codpostal, video';

        connection.promise().query(`SELECT ${columnsToSelect} FROM ?? WHERE id=?`, [table, id])
        .then(([rows]) => {
            if(rows.length > 0) {
                resolve(rows[0]);
            } else {
                resolve(null);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

module.exports = {
    getInfo,
    getProfileInfo
}