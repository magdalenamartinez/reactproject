const connection = require('./db');

function AddToFav(id, select_id, table) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO ?? SET ?', [table, { ID_User: id, ID_Selected: select_id }], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function RemoveFromFav(id, select_id, table) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM ?? WHERE ID_User=? AND ID_Selected=?', [table, id, select_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function existFav(id, select_id, table)
{
    return new Promise((resolve, reject) => {
        connection.promise().query('SELECT * FROM ?? WHERE ID_User=? AND ID_Selected=?', [table, id, select_id])
        .then(([rows]) => {
            if(rows.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
        .catch(error => {
            reject(error);
        })
    });
}

function RemoveFavById(table, select_id) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM ?? WHERE ID_Selected=?', [table, select_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


function GetFavs(id, table) {
    return new Promise((resolve, reject) => {
      connection.promise().query('SELECT ID_Selected FROM ?? WHERE ID_User=?', [table, id])
        .then(([rows]) => {
          const ids = rows.map(row => row.ID_Selected);
          resolve(ids);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

module.exports = {
    AddToFav,
    RemoveFromFav,
    existFav,
    RemoveFavById,
    GetFavs 
}