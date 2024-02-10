const connection = require('./db');

async function IncrementAttemps (id, table) {
    await connection.promise().query('UPDATE ?? SET failedPassword  = failedPassword + 1 WHERE id = ?', [table, id]);
    const [rows] = await connection.promise().query('SELECT failedPassword FROM ?? WHERE id = ?', [table, id]);
    const updatedFailedPassword = rows[0].failedPassword;
    return updatedFailedPassword;
}

function RestoreAttemps (id, table) {
    return connection.promise().query('UPDATE ?? SET failedPassword  = 0 WHERE id = ?', [table, id]);

}

const timeouts = {};
async function blockAccount(id, table, time) {
    // Bloquear cuenta en la base de datos
    await connection.promise().query('UPDATE ?? SET block = 1 WHERE id = ?', [table, id]);

    if (timeouts[id]) {
        clearTimeout(timeouts[id]);
    }

    const unlockAfter = time * 60 * 1000;
    timeouts[id] = setTimeout(() => {
        unlockAccount(table, id);
    }, unlockAfter);

}


function unlockAccount(table, id) {
    // Desbloquear cuenta en la base de datos
    connection.promise().query('UPDATE ?? SET block = 0, failedPassword = 0 WHERE id = ?', [table, id])
        .then(() => {
            console.log(`Cuenta desbloqueada automáticamente para el usuario con ID ${id}`);
        })
        .catch(error => {
            console.error('Error al desbloquear la cuenta automáticamente:', error);
        });
}

module.exports = {
    IncrementAttemps,
    RestoreAttemps,
    blockAccount,
    unlockAccount
}