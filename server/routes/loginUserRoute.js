const express = require('express');
const db = require('../db');
const Recaptcha = require('express-recaptcha');
const router = express.Router();


const site_key ='6Lf8u9woAAAAAPj0gngg3O447Fc3aFSbS0Hs3X6h';
const secret_key ='6Lf8u9woAAAAAEKZy3yCIrEU8wLUcA3adNTGi7DA';

const recaptcha = new Recaptcha.RecaptchaV2(site_key, secret_key);

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/try-login', async(req, res) => {
    recaptchaToken = req.body.recaptchaToken;
    console.log(recaptchaToken);

    if (recaptchaToken != "") {
        try {
            console.log('RECAPTCHA VALIDO');
            console.log('SERVIDOR');
            console.log(req.body.user);

            const results = await db.getLogin(req.body.table, req.body.user, req.body.password);
            
            if (results[0].length > 0) {
                const data = await db.getUserData(req.body.user, req.body.table);
                res.json({ success: true, number: 0, data});
            } else {
                res.json({ success: false, number: 0, message: 'Error de la base de datos' });
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

//Tengo que generar token y guardarlo en la DB para el usuario en cuestion
const jwt = require('jsonwebtoken');

//Genero una clave secreta de forma aleatoria
const crypto = require('crypto');
// Genera una clave secreta aleatoria con 64 bytes de longitud
const secretKey = crypto.randomBytes(32).toString('hex');
// Almacenar token y tiempo de expiración en la base de datos
//await db.storeResetToken(usuario.id, token, new Date(Date.now() + 3600000)); // 1 hora de expiración
const url = require('url');
const nodemailer = require('nodemailer');
//ahora configuro el transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'empleoinclusivo24@gmail.com',
        pass: 'uigs gwvj aezg wuij'
    }
})
router.post('/send-mail', async(req, res) => {
    try {
        const { table, correo } = req.body;
        const id = await db.ReadFromMail(table, correo);
        const token = jwt.sign({ userId: id }, secretKey, { expiresIn: '1h' });
        console.log(token);
        //una vez q conseguimos el id guardamos en la base de datos en el cliente:
        // Token 
        //Fecha de expiracion, 1h expiracion
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        console.log(expirationDate);
        const results2 = await db.storeToken(id, token, expirationDate, table);
        //Ya hemos guardado el token
        //Ahora creamos el enlace con el token
        const resetLink = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: '/reset-password',
            query: {token: token, t:table},
        });
    
        //configuro el mensaje a enviar
        const mailOptions = {
            from: 'empleoinclusivo24@gmail.com',
            to: correo,
            subject: 'Restablecimiento de la Contraseña',
            html: `Haz click en el siguiente enlace para reestablecer tu contraseña: <a href="${resetLink}">${resetLink}</a>`,
        };
        
        //Envio el correo
        await transporter.sendMail(mailOptions);
        if (results2[0].affectedRows > 0) {
            res.json({success:true, message: 'todo bien'});
        } else {
            res.json({success:false, message:'error'});
        }
    } catch(error) {
        console.log('Error al verificar el correo', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }

});

module.exports = router;
