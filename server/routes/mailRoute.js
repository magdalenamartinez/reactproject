const express = require('express');
const db = require('../db');
const router = express.Router();

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'empleoinclusivo24@gmail.com',
        pass: 'uigs gwvj aezg wuij'
    }
})
router.post('/send-mail', async(req, res) => {
    try {
        const { table, id, message } = req.body;
        const correo = db.GetMail(table, id);
        if (correo) {
            const mailOptions = {
                from: 'empleoinclusivo24@gmail.com',
                to: correo,
                subject: 'Restablecimiento de la Contraseña',
                html: message,
            };
            await transporter.sendMail(mailOptions);
            if (results2[0].affectedRows > 0) {
                res.json({success:true, message: 'todo bien'});
            } else {
                res.json({success:false, message:'error'});
            }
        } else {
            res.json({success:false, message:'error'});
        }
    } catch(error) {
        console.log('Error al verificar el correo', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }

});

module.exports = router;
