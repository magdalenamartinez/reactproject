const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/change-password', async(req, res) => {
    try {
        console.log(req.body);
        const results = await db.UpdatePassword(req.body.table, req.body.id, req.body.password)
        console.log(results);
        if (results[0].affectedRows > 0) {
            res.json({success: true});
        } else {
            res.json({success: false});
        }
    } catch(error) {
        console.log('Error al verificar el nombre de usuario', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }

});

module.exports = router;