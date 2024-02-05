const express = require('express');
const db = require('../db');
const Recaptcha = require('express-recaptcha');
const router = express.Router();
const bcrypt = require('bcrypt');
//para generar tokens
const jwt = require('jsonwebtoken');

const site_key = process.env.RECAPTCHA_SITE_KEY || 'error';
const secret_key = process.env.RECAPTCHA_SECRET_KEY || 'error';


const recaptcha = new Recaptcha.RecaptchaV2(site_key, secret_key);

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const { sendMail, generateRegistrationEmail } = require('./sendmail');
router.post('/try-login', async(req, res) => {
    recaptchaToken = req.body.recaptchaToken;
    if (recaptchaToken != "") {
        try {
            console.log('RECAPTCHA VALIDO');
            //Obtenemos el id del usuario
            const result = await db.getLogin(req.body.table, req.body.user);
            if (result && result.id && result.hashPassword) {
                const isPasswordValid = await bcrypt.compare(req.body.password, result.hashPassword);
                if (isPasswordValid && result.block === 0) {
                    await db.RestoreAttemps(result.id, req.body.table);
                    const token = jwt.sign({ userId: result.id }, secretKey, { expiresIn: '1h' });
                    const tokenSaved = await db.storeTokenSesion(result.id, token, req.body.table);
                    try {
                        const dataUser = await db.getHeaderData(req.body.table, result.id);
                        let type = 2;
                        if (req.body.table === 'clientes') {
                            type = 1;
                        }
                        const { image, user } = dataUser;
                        res.json({ success: true, token, id: result.id, number: 0, typeUser:type, user, image});
                    
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    const intentos = await db.IncrementAttemps(result.id, req.body.table);
                    if (intentos > 3) {
                        await db.blockAccount(result.id, req.body.table, 10*(intentos-3));
                        const title = `Se ha Bloqueado su Cuenta en Empleo Inclusivo`;
                        const subtitle = `Tras detectar varios intentos fallidos de Inicio de Sesión,<br\> se ha Bloqueado su cuenta
                        durante ${10*(intentos-3)} minutos. <br\>
                        No vuelva a intentar Iniciar Sesión hasta que se desbloquee su Cuenta o el tiempo aumentará.
                        <br\>
                        Si usted no ha intentado Iniciar Sesión, <br\>
                        Pongase en Contacto inmediatamente con el Servicio Técnico`;
                        const textBoton = 'Ir a Empleo Inclusivo';
                        const htmlText = generateRegistrationEmail(title, subtitle, textBoton);     
                        const subject = 'Bloqueo de Cuenta'
                        const correo = await db.GetMail(req.body.table, result.id);
                        sendMail(correo, subject, htmlText);
                        res.json({ success: false, number: 2, time: 10*(intentos-3)});
                    } else{
                        res.json({ success: false, number: 0});
                    }
                }
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


//Genero una clave secreta de forma aleatoria
const crypto = require('crypto');
// Genera una clave secreta aleatoria con 64 bytes de longitud
const secretKey = crypto.randomBytes(32).toString('hex');
// Almacenar token y tiempo de expiración en la base de datos
//await db.storeResetToken(usuario.id, token, new Date(Date.now() + 3600000)); // 1 hora de expiración
const url = require('url');
const nodemailer = require('nodemailer');
const { DataTypes } = require('sequelize');
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
        //una vez q conseguimos el id guardamos en la base de datos en el cliente:
        // Token 
        //Fecha de expiracion, 1h expiracion
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
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
