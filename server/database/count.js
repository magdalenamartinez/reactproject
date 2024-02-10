const connection = require('./db');

async function countOfertas() {
    try {
        const [rows] = await connection.promise().query('SELECT COUNT(*) AS numOfertas FROM oferta_empleo');
        return rows[0].numOfertas;
    } catch (error) {
        console.error('Error al contar ofertas:', error);
        throw error;
    }
}

async function countClientes() {
    try {
        const [rows] = await connection.promise().query('SELECT COUNT(*) AS numClientes FROM clientes');
        return rows[0].numClientes;
    } catch (error) {
        console.error('Error al contar clientes:', error);
        throw error;
    }
}


async function countEmpresas() {
    try {
        const [rows] = await connection.promise().query('SELECT COUNT(*) AS numEmpresas FROM empresas');
        return rows[0].numEmpresas;
    } catch (error) {
        console.error('Error al contar empresas:', error);
        throw error;
    }
}

module.exports = {
    countClientes,
    countEmpresas,
    countOfertas
}