const express = require('express');
const mysql = require('mysql2'); // Importa la versión de la biblioteca que soporta promesas
const config = require('./config');
const path = require('path');
const dbAdmin = require('./database/admin.js');
const dbToken = require('./database/token.js');
const dbCRUD = require('./database/CRUD.js');
const crypto = require('crypto');
const { sendMail, generateRegistrationEmail } = require('./routes/sendmail');
const bcrypt = require('bcrypt');
require('dotenv').config();


const app = express();


app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend-empleoinclusivo.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.set('port', process.env.PORT || 5000);



const clientRoute = require('./routes/clientRoute');
const mailRoute = require('./routes/mailRoute');
const infoRoute = require('./routes/infoRoute');
const deleteRoute = require('./routes/deleteRoute');
const enterpriseRoute = require('./routes/enterpriseRoute');
const checkUserRoute = require('./routes/checkUserRoute');
const loginUserRoute = require('./routes/loginUserRoute');
const changePasswordRoute = require('./routes/changePasswordRoute');
const ofertaRoute = require('./routes/ofertaRoute');
const favRoute = require('./routes/favRoute');
const adminRoute = require('./routes/adminRoute');
const chatRoute = require('./routes/chatRoute');

app.use('/chatRoute', chatRoute);
app.use('/clientRoute', clientRoute);
app.use('/adminRoute', adminRoute);
app.use('/mailRoute', mailRoute);
app.use('/infoRoute', infoRoute);
app.use('/deleteRoute', deleteRoute);
app.use('/enterpriseRoute', enterpriseRoute);
app.use('/checkUserRoute', checkUserRoute);
app.use('/loginUserRoute', loginUserRoute);
app.use('/changePasswordRoute', changePasswordRoute);
app.use('/ofertaRoute', ofertaRoute);
app.use('/favRoute', favRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/download/:filename', async (req, res) => {
    try {
      const filename = req.params.filename;
      const curriculumName = req.query.curriculumName || 'file.pdf';
      const filePath = path.join(__dirname, 'uploads', filename);
  
      res.download(filePath, curriculumName);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      res.status(500).send('Error interno del servidor');
    }
  });
  

app.use('/reset-password', async(req, res) => {
    try {
        const id = await dbToken.ReadToken(req.query.t, req.query.token);
        if (id) {
            let t;
            if (req.query.t === 'clientes') {
              t = 'c';
            } else if (req.query.t === 'empresas'){
              t = 'e';
            }
            res.redirect(`https://frontend-empleoinclusivo.onrender.com/#/reset-password?token=${req.query.token}&t=${t}`);
        } else {
          res.json({success: false, message: 'Se ha producido un error.'});
        }
    } catch(error) {
        console.log('Error al verificar el token', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }
  
});


app.use('/accept-admin', async(req, res) => {
    try {
        const key = crypto.randomBytes(Math.ceil(10 / 2)).toString('hex').slice(0, 10);  
        const keyCodificada = await bcrypt.hash(key, 10);
        const results = await dbAdmin.validateAdmin(keyCodificada, parseInt(req.query.id));
        if (results) {
          const title = `Su Cuenta de Administrador ha sido aceptada`;
          const subtitle = `Su Clave Secreta para Iniciar Sesión como Administrador es <br\>
          ${key}`;
          const textBoton = 'Iniciar Sesión';
          const link = 'https://frontend-empleoinclusivo.onrender.com/#/tengoCuenta';
          const htmlText = generateRegistrationEmail(title, subtitle, textBoton, link);     
          const subject = 'Administrador Registrado'        
          sendMail(req.query.correo, subject, htmlText)
          res.redirect(`https://frontend-empleoinclusivo.onrender.com/#/?admin=yes`);
        } else {
          res.json({success: false, message: 'Se ha producido un error.'});
        }
    } catch(error) {
        console.log('Error al verificar el token', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }
  
});


app.use('/delete-admin', async(req, res) => {
    try {
        const results = await dbCRUD.Delete('admin', req.query.id);
        if (results[0].affectedRows > 0) {
            res.redirect(`https://frontend-empleoinclusivo.onrender.com/#/?admin=no`);
        } else {
          res.json({success: false, message: 'Se ha producido un error.'});
        }
    } catch(error) {
        console.log('Error al verificar el token', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }
  
});

app.listen(app.get('port'), function() {
    console.log(`El servidor esta escuchando en el puerto ${app.get('port')}`);
});