const express = require('express');
const db = require('../db');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');


router.post('/change-password', async(req, res) => {
    try {
        console.log(req.body.password);
        console.log(req.body.token);
        console.log('tabla',req.body.table);
        const password = req.body.password;
        const hashPassword = await bcrypt.hash(password, 10);
        const id = await db.ReadToken(req.body.table, req.body.token);
        console.log('id',id);
        console.log(hashPassword);
        if (hashPassword && id) {
            await db.updatePassword(req.body.table, id, hashPassword);
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