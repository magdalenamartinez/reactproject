const connection = require('./db');

function ReadAll(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function Update(table, data, userid) {
    return new Promise((resolve, reject) => {
        const updatedQueries = [];

        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                const formattedValue = typeof value === 'string' ? `'${value}'` : value;
                updatedQueries.push(`${key} = ${formattedValue}`);
            }
        }

        const updateQuery = `UPDATE ${table} SET ${updatedQueries.join(', ')} WHERE user = '${userid}'`;

        connection.query(updateQuery, function (error, results) {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

function Create(table, data) {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, data, function (error, result) {
        if (error) {
          reject(error);
        } else {
          console.log('DATOS GUARDADOS EN LA BASE');
          resolve(result);
        }
      });
    });
}


function Delete(table, id) {
    return connection.promise().query('DELETE FROM ?? WHERE id = ?', [table, id]);
}


function ReadOne(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ?? WHERE id=?`,[table, id], function(error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function ReadUsername(table, username) {
    return connection.promise().query(`SELECT user FROM ${table} WHERE user=?`, [username]);
}

module.exports = {
    ReadAll,
    ReadOne,
    ReadUsername,
    Update,
    Create,
    Delete
}