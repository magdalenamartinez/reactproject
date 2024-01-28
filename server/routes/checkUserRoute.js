const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/check-username', async(req, res) => {
    try {
        const results = await db.ReadUsername(req.query.table, req.query.username);
        if (results[0].length > 0) {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch(error) {
        console.log('Error al verificar el nombre de usuario', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }

});

router.get('/check-mail', async(req, res) => {
    try {
        const results = await db.ReadMail(req.query.table, req.query.correo);
        console.log(req.query.correo);
        if (results[0].length > 0) {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch(error) {
        console.log('Error al verificar el correo', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }

});

router.get('/check-token', async(req, res) => {
    try {
        const id = await db.ReadToken(req.query.table, req.query.token);
        console.log(id);
        console.log(req.query.id);
        console.log(id === parseInt(req.query.id));
        if (id && (id === parseInt(req.query.id))) {
            res.json({success: true});
        } else {
            res.json({success : false});
        }
    } catch(error) {
        console.log('Error al verificar el token', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }

});

module.exports = router;