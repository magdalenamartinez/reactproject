const connection = require('./db');


function getHeaderDataIdsApply(table1, ids, read, idaux) {
    const promises = ids.map(id => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT t.id, t.image, t.user, t.name, t.correo, 
                CASE WHEN COUNT(m.${read}) = SUM(m.${read}) THEN 1 ELSE 0 END AS readByAdmin
                FROM ${table1} AS t
                LEFT JOIN chat_messages_solicitantes AS m ON t.id = m.${idaux}
                WHERE t.id = ?
                GROUP BY t.id, t.image, t.user, t.name, t.correo`,
                [id],
                (error, results) => {
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

function changeReadApply(empresaid, senderid, variable)
{
    return connection.promise().query(`UPDATE chat_messages_solicitantes SET ${variable} = 1 WHERE 
    sender_id = ? AND id_empresa = ?`, [senderid, empresaid]);
}

function getMessagesApply(senderid, idempresa) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT sender_id, sender_type, message, timestamp FROM 
        chat_messages_solicitantes WHERE sender_id = ? AND id_empresa=?`, 
        [senderid, idempresa], function(error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function GetSolicitantes(id, table) {
    return new Promise((resolve, reject) => {
      connection.promise().query('SELECT ID_User FROM ?? WHERE ID_Selected=?', [table, id])
        .then(([rows]) => {
          const ids = rows.map(row => row.ID_User);
          resolve(ids);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  function saveMessageSolicitante(senderId, id_empresa, senderType, message, table) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO ?? (sender_id, id_empresa, sender_type, message) VALUES (?, ?, ?, ?)', 
            [table, senderId, id_empresa, senderType, message], 
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
}


module.exports = {
    getHeaderDataIdsApply,
    changeReadApply,
    getMessagesApply,
    GetSolicitantes,
    saveMessageSolicitante

}