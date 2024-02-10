const express = require('express');
const dbLogin = require('../database/login');
const dbBlock = require('../database/block');
const dbAdmin = require('../database/admin');
const dbToken = require('../database/token');
const dbMail = require('../database/mail');
const Recaptcha = require('express-recaptcha');
const router = express.Router();
const bcrypt = require('bcrypt');
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
            if (req.body.table === 'admin') {
                const result_admin = await dbAdmin.getSecretKeyAdmin(req.body.table, req.body.user);
                console.log(result_admin);
                if (result_admin && result_admin.secret_key) {
                    console.log('primer if');
                    const isAdminKeyValid = await bcrypt.compare(req.body.secret_key, result_admin.secret_key);
                    const isValido = (1 === result_admin.Validado);
                    console.log(isAdminKeyValid, isValido);
                    if (!isAdminKeyValid || !isValido) {
                        res.json({ success: false, number: 0, message: 'Clave secreta de administrador incorrecta' });
                        return;
                    }
                }
            }
            
            const result = await dbLogin.getLogin(req.body.table, req.body.user);
            if (result && result.id && result.hashPassword) {
                const isPasswordValid = await bcrypt.compare(req.body.password, result.hashPassword);
                if (isPasswordValid && result.block === 0) {
                    await dbBlock.RestoreAttemps(result.id, req.body.table);
                    const token = jwt.sign({ userId: result.id }, secretKey, { expiresIn: '1h' });
                    const data = {
                        token: token,
                        user_id: result.id,
                        tableName: req.body.table,
                    };
                    const storetoken = await dbToken.storeTokenSesion(data);
                    try {
                        const dataUser = await dbLogin.getHeaderData(req.body.table, result.id);
                        let type = 2;
                        if (req.body.table === 'clientes') {
                            type = 1;
                        } else if (req.body.table === 'admin') {
                            type = 3;
                        }
                        const { image, user } = dataUser;
                        res.json({ success: true, token, id: result.id, number: 0, typeUser:type, user, image});
                    
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    const intentos = await dbBlock.IncrementAttemps(result.id, req.body.table);
                    if (intentos > 3) {
                        await dbBlock.blockAccount(result.id, req.body.table, 10*(intentos-3));
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
                        const correo = await dbMail.GetMail(req.body.table, result.id);
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


const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const url = require('url');


router.post('/send-mail', async(req, res) => {
    try {
        const { table, correo } = req.body;
        const id = await dbMail.GetIdByMail(table, correo);
        const token = jwt.sign({ userId: id }, secretKey, { expiresIn: '1h' });
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        const results2 = await dbToken.storeToken(id, token, expirationDate, table);
        
        const resetLink = url.format({
            protocol: req.protocol,
            host: 'backend-empleoinclusivo.onrender.com',
            pathname: '/reset-password',
            query: {token: token, t:table},
        });
    
        const title = `Reestablecimiento de Contraseña`;
        const subtitle = `Haga Click en el botón para reestablecer<br\> Su Contraseña
        <br\> Si usted no ha solicitado el reestablecimiento de contraseña póngase en contacto con el <br\> 
        Servicio Técnico de Empleo Inlusivo`;
        const textBoton = 'Reestablecer';
        const htmlText = generateRegistrationEmail(title, subtitle, textBoton, resetLink);     
        const subject = 'Reestablecer Contraseña'
        sendMail(correo, subject, htmlText);
       
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
