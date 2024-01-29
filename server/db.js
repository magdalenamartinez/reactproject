const mysql = require('mysql2');
const config = require('./config');
const { resolve } = require('path-browserify');
require('dotenv').config();
/*
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.connect(function(error) {
    if (error)
    throw error;
  
    console.log('CONEXION EXITOSA');  
});
*/
const connection = mysql.createConnection(process.env.DATABASE_URL);
connection.connect(function(error) {
    if (error)
    throw error;
  
    console.log('CONEXION EXITOSA');  
});
//CRUD

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




function ReadPublished() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM oferta_empleo WHERE publish=1`, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
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
function Read_Ofertas_id(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ?? WHERE id_empresa=?`,[table, id], function(error, results) {
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

function ReadMail(table, correo) {
    return connection.promise().query(`SELECT correo FROM ${table} WHERE correo=?`, [correo]);
}

function ReadFromMail(table, correo) {
    return connection.promise().query(`SELECT id FROM ${table} WHERE correo=?`, [correo])
        .then(([rows]) => {
            if (rows.length > 0 && rows[0].id) {
                return parseInt(rows[0].id, 10);
            } else {
                return null; // O algún valor por defecto si es apropiado
            }
        })
        .catch(error => {
            console.error('Error al leer desde la base de datos:', error);
            throw error;
        });
}

function ReadToken(table, token) {
    return connection.promise().query(`SELECT id, resetTokenExpiration FROM ?? WHERE resetToken=?`, [table, token])
        .then(([rows]) => {
            if (rows.length > 0) {
                const expirationDate = new Date(rows[0].resetTokenExpiration);
                const currentDate = new Date();
                //comparamos fechas
                if (expirationDate.getTime() > currentDate.getTime()) {
                    console.log('holaholita');
                    //El token es valido aun
                    return parseInt(rows[0].id);
                } else {
                    return -1;
                }
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error al leer desde la base de datos:', error);
            throw error;
        });
}

function getLogin(table, username, password) {
    return connection.promise().query(`SELECT * FROM ?? WHERE user=? AND password=?`,[table, username, password]);
}

function Update(table, data, userid) {
    return new Promise((resolve, reject) => {
        const updatedQueries = [];

        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                // Check if the value is a string and enclose it in single quotes
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

function UpdatePassword(table, id, password) {
    return connection.promise().query('UPDATE ?? SET password = ?  WHERE id = ?', [table, password, id]);
}

function PublishOferta(id) {
    return connection.promise().query('UPDATE oferta_empleo SET publish = CASE WHEN publish = 0 THEN 1 ELSE 0 END WHERE id = ?', [id]);
  }

  function ClientState(id) {
    return connection.promise().query('UPDATE clientes SET active = CASE WHEN active = 0 THEN 1 ELSE 0 END WHERE id = ?', [id]);
  }
  

function storeToken (id, token, expirationDate, table) {
    return connection.promise().query('UPDATE ?? SET resetToken = ?, resetTokenExpiration = ? WHERE id = ?', [table, token, expirationDate, id]);

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


function getInfo(id, table) {
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


module.exports = {
    ReadAll,
    ReadOne,
    Update,
    Create,
    Delete,
    ReadUsername,
    Read_Ofertas_id,
    getLogin,
    getUserData,
    ReadMail,
    ReadFromMail,
    storeToken,
    ReadToken,
    UpdatePassword,
    PublishOferta,
    ReadPublished,
    UpdateOferta,
    getOfertaData,
    existFav,
    AddToFav,
    RemoveFromFav,
    GetFavs,
    ReadClientes,
    ClientState,
    getOfertasFavs,
    getInfo
    
}