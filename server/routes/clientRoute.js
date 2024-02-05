const express = require('express');
const db = require('../db');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const upload = multer({ dest: 'uploads/' });


const nodemailer = require('nodemailer');
const { sendMail, generateRegistrationEmail } = require('./sendmail');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'empleoinclusivo24@gmail.com',
        pass: 'uigs gwvj aezg wuij'
    }
})

router.post('/save-data', upload.fields([
  { name: 'imageInput', maxCount: 1 },
  { name: 'videoInput', maxCount: 1 }, 
  { name: 'curriculumInput', maxCount: 1 }
]), async function(req, res) {
  
  const imageFile = req.files['imageInput'] ? req.files['imageInput'][0] : '';
  const videoFile = req.files['videoInput'] ? req.files['videoInput'][0] : '';
  const fileFile = req.files['curriculumInput'] ? req.files['curriculumInput'][0] : '';

  const imageHash = imageFile ? imageFile.filename : '';
  const videoHash = videoFile ? videoFile.filename : '';
  const fileHash = fileFile ? fileFile.filename : '';

  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const data = {
       user: req.body.user,
       name: req.body.name,
       correo: req.body.correo,
       password: hashPassword,     
       tlf: parseInt(req.body.tlf, 10),
       image: imageHash,
       calle: req.body.calle,
       ciudad: req.body.ciudad,
       codpostal: isNaN(req.body.codpostal) ? 0 : parseInt(req.body.codpostal, 10),
       posanterior: req.body.posanterior,
       duracion:  req.body.duracion,
       empresa: req.body.empresa,
       titulo: req.body.titulo,
       institucion: req.body.institucion,
       perfil: req.body.perfil,
       habilidad: req.body.habilidad,
       provincia: req.body.provincia,
       educacion: req.body.nivel_educacion,
       ubi: req.body.distancia,
       video: videoHash ,
       curriculum: fileHash ,
       curriculumName: fileFile ? fileFile.originalname : '',
      };
   
      db.Create('clientes', data)
      .then(async result => {
        console.log('DATOS GUARDADOS EN LA BASE');
        const title = `¡Gracias por registrarte en la plataforma Empleo Inclusivo, ${req.body.name}!`;
        const subtitle = `Te ayudaremos en todo lo que necesites para que encuentres el trabajo de tus sueños.`;
        const textBoton = 'Comienza Ahora';
        const htmlText = generateRegistrationEmail(title, subtitle, textBoton);     
        const subject = 'Registro en Empleo Inclusivo'
        sendMail(req.body.correo, subject, htmlText)
        res.json({ success: true});
      })
      .catch(error => {
        console.error('Error al guardar datos en la base de datos', error);
        res.status(500).send('Error interno del servidor');
      });
  



});

router.post('/update-data',  upload.fields([
  { name: 'imageInput', maxCount: 1 },
  { name: 'videoInput', maxCount: 1 }, 
  { name: 'curriculumInput', maxCount: 1 }
]), async(req, res) => {
  try {
        const modifiedFields = JSON.parse(req.body.modifiedFields);
        const deleteVideo = JSON.parse(req.body.deleteVideo);
        const deleteImage = JSON.parse(req.body.deleteImage);
        const deleteCurriculum = JSON.parse(req.body.deleteCurriculum);

        const imageFile = req.files['imageInput'] ? req.files['imageInput'][0] : '';
        const videoFile = req.files['videoInput'] ? req.files['videoInput'][0] : '';
        const fileFile = req.files['curriculumInput'] ? req.files['curriculumInput'][0] : '';

        const imageHash = imageFile ? imageFile.filename : '';
        const videoHash = videoFile ? videoFile.filename : '';
        const fileHash = fileFile ? fileFile.filename : '';

        console.log(fileHash);
        const formData = req.body; // Accede directamente a los datos del formulario

      // Resto del código


        console.log(modifiedFields);

        const data = {
            user: req.body.user,
            name: modifiedFields.name === true? req.body.name : undefined,
            correo: modifiedFields.correo === true? req.body.correo : undefined,
            password: modifiedFields.password === true? req.body.password : undefined,
            tlf: modifiedFields.tlf === true? parseInt(req.body.tlf, 10): undefined,
            image: modifiedFields.imageInput === true? imageHash : undefined,
            calle: modifiedFields.calle === true? req.body.calle : undefined,
            ciudad: modifiedFields.ciudad === true?   req.body.ciudad : undefined,
            codpostal: modifiedFields.codpostal === true? isNaN(req.body.codpostal)? 0 : parseInt(req.body.codpostal, 10) : undefined,
            posanterior: modifiedFields.posanterior === true? req.body.posanterior : undefined,
            duracion: modifiedFields.duracion === true? req.body.duracion : undefined,
            titulo: modifiedFields.titulo === true? req.body.titulo : undefined,
            empresa: modifiedFields.empresa === true? req.body.empresa : undefined,
            institucion: modifiedFields.institucion === true? req.body.institucion : undefined,
            perfil: modifiedFields.perfil === true? req.body.perfil : undefined,
            habilidad: modifiedFields.habilidad === true? req.body.habilidad : undefined,
            provincia: modifiedFields.provincia === true? req.body.provincia : undefined,
            educacion: modifiedFields.nivel_educacion === true? req.body.nivel_educacion : undefined,
            ubi: modifiedFields.distancia === true? req.body.distancia : undefined,
            video: modifiedFields.videoInput === true? videoHash : undefined,
            curriculum: fileFile? fileHash : undefined,
            curriculumName: fileFile? fileFile.originalname : undefined,
            };

          if (deleteCurriculum === true) {
            data.curriculum = '';
            data.curriculumName = '';
          }
          if (deleteVideo === true) {
            data.video = '';
          }
          if (deleteImage === true) {
            data.image = '';
          }
          if (modifiedFields.password === true) {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            data.password = hashPassword;
          }
          
          db.Update('clientes', data, data.user)
          const dataNew =  await db.getUserData(data.user, 'clientes');
          console.log(dataNew);
          if (modifiedFields.password === true) {
            const title = `Contraseña Actualizada`;
            const subtitle = `Su Contraseña ha sido actualizada. <br\> 
            En caso de que usted no la haya modificado pongase en contacto con el 
            soporte técnico de Empleo Inclusivo.`;
            const textBoton = 'Ir a Empleo Inclusivo';
            const htmlText = generateRegistrationEmail(title, subtitle, textBoton);     
            const subject = 'Actualización de Contraseña'
            sendMail(dataNew.correo, subject, htmlText)
          }            
            res.json({success: true, dataNew: dataNew});

    }
    catch (error) {
          console.error("Error:", error);

          // Enviar una respuesta de error al cliente
          res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


router.get('/get-clientes', async(req, res) => {
  try {
      const results = await db.ReadClientes();
      console.log(results[0]);
      if (results.length>0) {
          res.json({success: true, data:results});
      } else {
          res.json({success : false});
      }
  } catch(error) {
      console.log('Error al verificar el token', error);
      res.status(500).json({error: 'Error interno del Servidor'});
  }

});


router.post('/change-active', async(req, res) => {
  try {
      const id = req.body.id;
      const results = await db.ClientState(id);
      if (results.length > 0) {
        const result = await db.GetState(id);
        if (result.active === 1) {
          const title = `Su perfil se encuentra ahora activo`;
          const subtitle = `Las empresas podrán ver su perfil a partir de ahora, lo podrá volver a cambiar desde su perfil cuando desee`;
          const textBoton = 'Ir a Empleo Inclusivo';
          const htmlText = generateRegistrationEmail(title, subtitle, textBoton);     
          const subject = 'Perfil Activado'
          sendMail(result.correo, subject, htmlText)
        }
        res.json({ success: true});

      } else {
          res.json({ success: false, message: 'Error de la base de datos' });
      }
      } catch (error) {
          console.log('Error al obtener los datos', error);
          res.status(500).json({error: 'Error Interno Del Servidor'});
      }
});


module.exports = router;