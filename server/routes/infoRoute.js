const express = require('express');
const db = require('../db');
const router = express.Router();



router.post('/get-info', async(req, res) => {
    id = req.body.id;
    table = req.body.table;
    if (id) {
        try {
            const results = await db.getInfo(id, table);
                res.json({ success: true, data: results});

        } catch (error) {
            console.log('Error al verificar los datos', error);
            res.status(500).json({error: 'Error Interno Del Servidor'});
        }
    } else {
        console.error('recaptcha no valido');
        res.json({ success: false, number: 1, message: 'Error de recaptcha' });
    }
   

});

module.exports = router;
