const connection = require('./db');

const getUniqueIdChat = (table) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT DISTINCT sender_id FROM ??', [table], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // Extraer solo los valores de sender_id y devolverlos como un array
                const senderIds = results.map(result => result.sender_id);
                resolve(senderIds);
            }
        });
    });
};

const getUniqueIdEmpresaChatApply = (table,id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT DISTINCT id_empresa FROM ?? where sender_id = ?', [table,id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // Extraer solo los valores de sender_id y devolverlos como un array
                const senderIds = results.map(result => result.id_empresa);
                resolve(senderIds);
            }
        });
    });
};

const getUniqueIdChatApply = (table,id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT DISTINCT sender_id FROM ?? where id_empresa = ?', [table,id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // Extraer solo los valores de sender_id y devolverlos como un array
                const senderIds = results.map(result => result.sender_id);
                resolve(senderIds);
            }
        });
    });
};



function getMessages(id, table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT sender_id, sender_type, message, timestamp FROM 
        ?? WHERE sender_id = ?`, [table, id], function(error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


function saveMessage(senderId, senderType, message, table) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO ?? (sender_id, sender_type, message) VALUES (?, ?, ?)', 
            [table, senderId, senderType, message], 
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

function changeRead(id, table, variable)
{
    return connection.promise().query(`UPDATE ?? SET ${variable} = 1 WHERE id = ?`, [table,id]);
}

function changeReadToFalse(id, table, variable)
{
    return connection.promise().query(`UPDATE ?? SET ${variable} = 0 WHERE id = ?`, [table,id]);
}

function DeleteChat(table, id) {
    return connection.promise().query('DELETE FROM ?? WHERE sender_id = ?', [table, id]);
}


function DeleteChatApply(id, id2) {
    return connection.promise().query('DELETE FROM chat_messages_solicitantes WHERE sender_id = ? AND id_empresa=?', [id, id2]);
}


module.exports = {
    getUniqueIdChat,
    DeleteChatApply,
    getUniqueIdEmpresaChatApply,
    getUniqueIdChatApply,
    getMessages,
    saveMessage,
    changeRead,
    changeReadToFalse,
    DeleteChat,
}