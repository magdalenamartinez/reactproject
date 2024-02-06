const express = require('express');
const db = require('../db');
const router = express.Router();



router.post('/get-info', async(req, res) => {
    const { id, table, token } = req.body;
    if (id && table && token) {
        try {
            const isValidToken = await db.verifySessionToken(id, token, table);
            if (isValidToken) {
                const results = await db.getInfo(id, table, token);
                res.json({ success: true, data: results});
            } else {
                res.status(401).json({ error: 'Token de sesión inválido' });
            }
        } catch (error) {
            console.log('Error al verificar los datos', error);
            res.status(500).json({error: 'Error Interno Del Servidor'});
        }
    } else {
        console.error('recaptcha no valido');
        res.json({ success: false, number: 1, message: 'Error de recaptcha' });
    }
   

});


router.post('/get-profile', async(req, res) => {
    const { id, table, token } = req.body;
    if (id && table && token) {
        try {
            const isValidToken = await db.verifySessionToken(id, token, table);
            if (isValidToken) {
                const results = await db.getProfileInfo(id, table, token);
                res.json({ success: true, data: results});
            } else {
                res.status(401).json({ error: 'Token de sesión inválido' });
            }
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
