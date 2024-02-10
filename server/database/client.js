const connection = require('./db');

function ReadClientes() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id,name, correo, tlf, image, provincia, codpostal, posanterior, empresa, duracion, educacion, perfil, habilidad, video, curriculum, curriculumName FROM clientes WHERE active = true', function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    ReadClientes
}