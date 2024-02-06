const express = require('express');
const db = require('../db');
const router = express.Router();



router.post('/get-info', async(req, res) => {
    const { id, table, token } = req.body;
    if (id && table && token) {
        try {
            const isValidToken = await db.verifySessionToken(id, token, table);
            if (isValidToken) {
                const results = await db.getInfo(id, table);
                res.json({ success: true, data: results});
            } else {
                res.json({ success: false, number: 0, message: 'Error de recaptcha' });
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
                const results = await db.getProfileInfo(id, table);
                res.json({ success: true, data: results});
            } else {
                res.json({ success: false, number: 0, message: 'Error de recaptcha' });
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


router.post('/get-foto', async(req, res) => {
    const { id, table, token } = req.body;
    if (id && table && token) {
        try {
            const isValidToken = await db.verifySessionToken(id, token, table);
            if (isValidToken) {
                const results = await db.getFotoDB(id, table);
                res.json({ success: true, data: results});
            } else {
                res.json({ success: false, number: 0, message: 'Error de recaptcha' });
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
