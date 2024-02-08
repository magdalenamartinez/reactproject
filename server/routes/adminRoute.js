const express = require('express');
const db = require('../db');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const upload = multer({ dest: 'uploads/' });
const url = require('url');
const { sendMail, generateRegistrationEmail2 } = require('./sendmail');

router.use(upload.none());

router.post('/register-admin', async function(req, res) {

    console.log(req.body.password);
    console.log(req.body);

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
        user: req.body.user,
        correo: req.body.correo,
        password: hashPassword,
    }
    db.Create('admin', data)
      .then(async result => {
        console.log('DATOS GUARDADOS EN LA BASE');
        const title = `Solicitud de Registro como Administrador`;
        const subtitle = `El usuario ${data.user}, con correo ${data.correo} desea registrarse como Administrador.`;
        const textBoton = 'Aceptar Solicitud';
        const textBoton2 = 'Cancelar Solicitud';
        const id = await db.ReadFromMail('admin', data.correo);
        const link = url.format({
            protocol: req.protocol,
            host: 'backend-empleoinclusivo.onrender.com',
            pathname: '/accept-admin',
            query: {id: id, correo: data.correo},
        });
        const link2 = url.format({
            protocol: req.protocol,
            host: 'backend-empleoinclusivo.onrender.com',
            pathname: '/delete-admin',
            query: {id: id},
        });
        const htmlText = generateRegistrationEmail2(title, subtitle,  link, link2, textBoton, textBoton2);     
        const subject = 'Registro en Empleo Inclusivo'        
        sendMail('gestion.empleoinclusivo24@gmail.com', subject, htmlText)
        res.json({ success: true});
      })
      .catch(error => {
        console.error('Error al guardar datos en la base de datos', error);
        res.status(500).send('Error interno del servidor');
      });
});


router.get('/get-num', async function(req, res) {
  try {
    const numOfertas = await db.countOfertas();
    const numClientes = await db.countClientes();
    const numEmpresas = await db.countEmpresas();
    res.json({success:true, numOfertas: numOfertas, numClientes:numClientes, numEmpresas:numEmpresas});
  } catch (error) {
    console.log('Error al obtener el numero de registros:', error);
    res.status(500).json({success:false, message: 'Error interno del servidor'});
  }

});


router.get('/get-by-fecha', async function(req, res) {
  try {
    const ofertasPorFecha = await db.getNumberOfertsByDay();
    console.log(ofertasPorFecha);
    const fechas = ofertasPorFecha.map(oferta => oferta.fecha);
    const numOfertasPorFecha = ofertasPorFecha.map(oferta => oferta.num_ofertas);
    console.log(fechas); console.log(numOfertasPorFecha);
    res.json({success:true, numofertasporfecha: numOfertasPorFecha, fechas:fechas});
  } catch (error) {
    console.log('Error al obtener el numero de registros:', error);
    res.status(500).json({success:false, message: 'Error interno del servidor'});
  }

});


router.post('/get-all', async function(req, res) {
    const id = req.body.id;
    const table = req.body.table;
    const token = req.body.token;
    const result = db.checkAdmin(id, token);
    if (result) {
        try {
            let results;
            if (table === 'oferta_empleo') {
              results = await db.ReadAllNombre(table);
            } else if (table === 'oferta_empleo-id') {
              results = await db.Read_Ofertas_id('oferta_empleo', req.body.id_empresa);
            } else {
              results = await db.getInfoAdmin(table);
            }
            res.json({ success: true, data: results});

        } catch (error) {
            console.log('Error al verificar los datos', error);
            res.status(500).json({error: 'Error Interno Del Servidor'});
        }
    } else {
        console.error('recaptcha no valido');
        res.json({ success: false, number: 1, message: 'Error de recaptcha' });
    }
   
});

router.post('/admin-delete', async function(req, res) {
  const id = req.body.id;
  const id_delete = req.body.idToDelete;
  const table = req.body.table;
  const token = req.body.token;
  try {
  const result = db.checkAdmin(id, token);
  if (result) {
    const deleteResult = await db.Delete(table, id_delete);
    if (deleteResult.affectedRows > 0) {
      if (result.affectedRows > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
    }
  }} catch (error) {
    console.log('Se ha producido un error', error);
  }

});

module.exports = router;
