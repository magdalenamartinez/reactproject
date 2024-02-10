const express = require('express');
const db = require('../database/db');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const dbToken = require('../database/token');
const dbLogin = require('../database/login');

router.post('/change-password', async(req, res) => {
    try {
        const password = req.body.password;
        const hashPassword = await bcrypt.hash(password, 10);
        const id = await dbToken.ReadToken(req.body.table, req.body.token);
        if (hashPassword && id) {
            await dbLogin.updatePassword(req.body.table, id, hashPassword);
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