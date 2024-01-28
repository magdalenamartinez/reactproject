const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/delete-data', async(req, res) => {
    try {
        const results = await db.Delete(req.body.table, req.body.id);
        if (results[0].affectedRows > 0) {
            console.log('hola');
            res.json(true);
        } else {
            console.log('adios');
            res.json(false);
        }
    } catch(error) {
        console.log('Error al eliminar la cuenta', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }

});

module.exports = router;