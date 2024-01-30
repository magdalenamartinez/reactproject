const express = require('express');
const mysql = require('mysql2'); // Importa la versión de la biblioteca que soporta promesas
const config = require('./config');
const path = require('path');
const db = require('./db.js');
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
const infoRoute = require('./routes/infoRoute');
const deleteRoute = require('./routes/deleteRoute');
const enterpriseRoute = require('./routes/enterpriseRoute');
const checkUserRoute = require('./routes/checkUserRoute');
const loginUserRoute = require('./routes/loginUserRoute');
const changePasswordRoute = require('./routes/changePasswordRoute');
const ofertaRoute = require('./routes/ofertaRoute');
const favRoute = require('./routes/favRoute');

app.use('/clientRoute', clientRoute);
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
  
      // Envía el archivo como respuesta
      res.download(filePath, curriculumName);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      res.status(500).send('Error interno del servidor');
    }
  });
  

app.use('/reset-password', async(req, res) => {
    // Lógica para manejar el restablecimiento de contraseña aquí
      try {
          const id = await db.ReadToken(req.query.t, req.query.token);
          if (id) {
              let t;
              if (req.query.t === 'clientes') {
                t = 1;
              } else if (req.query.t === 'empresas'){
                t = 2;
              }
              res.redirect(`https://frontend-empleoinclusivo.onrender.com/reset-password?id=${id}&token=${req.query.token}&t=${t}`);
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