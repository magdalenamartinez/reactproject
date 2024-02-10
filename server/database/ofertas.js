const connection = require('./db');

function ReadAllNombre(table) {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT oferta_empleo.*, empresas.name AS nombre_empresa
            FROM ${table}
            JOIN empresas ON oferta_empleo.id_empresa = empresas.id
        `, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getOfertasFavs(table, ids) {
    const idsStr = ids.join(',');
    return new Promise((resolve, reject) => {
        connection.promise().query(`SELECT * FROM ?? WHERE id IN (${idsStr})`, [table])
        .then(([rows]) => {
            resolve(rows);
        })
        .catch(error => {
            reject(error);
        });
    })
}

  
  

function getOfertaData(table, id) {
    return new Promise((resolve, reject) => {
        connection.promise().query('SELECT * FROM ?? WHERE id=?', [table, id])
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

function UpdateOferta(table, data, id) {
    return new Promise((resolve, reject) => {
        const updatedQueries = [];

        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                const formattedValue = typeof value === 'string' ? `'${value}'` : value;
                updatedQueries.push(`${key} = ${formattedValue}`);
            }
        }
        if (updatedQueries && updatedQueries.length > 0) {
            const updateQuery = `UPDATE ${table} SET ${updatedQueries.join(', ')} WHERE id = '${id}'`;
        
        connection.query(updateQuery, function (error, results) {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });}

    });
}

function Read_Ofertas_id(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT oferta_empleo.*, empresas.name AS
        nombre_empresa FROM ?? JOIN empresas ON oferta_empleo.id_empresa
        = empresas.id WHERE oferta_empleo.id_empresa=?`,
        [table, id], function(error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}



async function getNumberOfertsByDay() {
    try {
        const query = `SELECT DATE(created_at) AS fecha, COUNT(*) AS num_ofertas
        FROM oferta_empleo GROUP BY DATE(created_at) ORDER BY fecha`;
        const [rows] = await connection.promise().query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener el nº ofertas por fecha', error);
        throw error;
    }
}

function DeleteByIdEmpresa(id) {
    return connection.promise().query('DELETE FROM oferta_empleo WHERE id_empresa = ?', [id]);
}

module.exports = {
    ReadAllNombre,
    getOfertaData,
    getOfertasFavs,
    UpdateOferta,
    Read_Ofertas_id,
    getNumberOfertsByDay,
    DeleteByIdEmpresa
}