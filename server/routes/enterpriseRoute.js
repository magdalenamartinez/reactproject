const express = require('express');
const dbCRUD = require('../database/CRUD');
const dbLogin = require('../database/login');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcrypt');
const { sendMail, generateRegistrationEmail } = require('./sendmail');

router.post('/save-data2', upload.fields([ { name: 'imageInput', maxCount: 1 },  { name: 'videoInput', maxCount: 1 }]),
async function(req, res) {
    const imageFile  = req.files['imageInput'] ? req.files['imageInput'][0] : '';
    const videoFile = req.files['videoInput'] ? req.files['videoInput'][0] : '';
    
    const imageHash = imageFile ? imageFile.filename : '';
    const videoHash = videoFile ? videoFile.filename : '';
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const data = {
        user: req.body.user,
        name: req.body.name,
        correo: req.body.correo,
        password: hashPassword,
        tlf: parseInt(req.body.tlf, 10),
        cultura: req.body.cultura,
        descripcion: req.body.description,
        image: imageHash,
        video: videoHash,
        tipo_empresa: req.body.tipo_empresa|| '',
        sector: req.body.sector|| '',
        provincia: req.body.provincia|| '',
        codpostal: parseInt(req.body.codpostal,10)
            };

        dbCRUD.Create('empresas', data)
        .then(result => {
            console.log('DATOS GUARDADOS EN LA BASE');
            const title = `¡Gracias por registrar a su Empresa  ${req.body.name} en la plataforma Empleo Inclusivo`;
            const subtitle = ` Estamos comprometidos en ayudarle a encontrar el mejor talento y a hacer crecer su equipo.`;
            const textBoton = 'Ir a Empleo Inclusivo';
            const htmlText = generateRegistrationEmail(title, subtitle, textBoton);     
            const subject = 'Registro de Empresa en Empleo Inclusivo'
            sendMail(req.body.correo, subject, htmlText)
            res.json({ success: true});
        })
        .catch(error => {
            console.error('Error al guardar datos en la base de datos', error);
            res.status(500).send('Error interno del servidor');
        });
    
});

router.post('/update-data2', upload.fields([ { name: 'imageInput', maxCount: 1 }, { name: 'videoInput', maxCount: 1 }]),
async(req, res) => {
    try {
        const modifiedFields = JSON.parse(req.body.modifiedFields);

        const imageFile  = req.files['imageInput'] ? req.files['imageInput'][0] : '';
        const videoFile = req.files['videoInput'] ? req.files['videoInput'][0] : '';

        const imageHash = imageFile ? imageFile.filename : '';
        const videoHash = videoFile ? videoFile.filename : '';
        
        const deleteVideo = JSON.parse(req.body.deleteVideo);
        const deleteImage = JSON.parse(req.body.deleteImage);

        const data = {
            user: req.body.user,
            name:  modifiedFields.name === true? req.body.name : undefined,
            correo: modifiedFields.correo === true? req.body.correo : undefined,
            password: modifiedFields.password === true? req.body.password : undefined,
            tlf: modifiedFields.tlf === true? parseInt(req.body.tlf, 10): undefined,
            cultura: modifiedFields.cultura === true? req.body.cultura : undefined,
            descripcion: modifiedFields.description === true? req.body.description : undefined,
            image: modifiedFields.imageInput === true? imageHash : undefined,
            tipo_empresa: modifiedFields.tipo_empresa === true? req.body.tipo_empresa : undefined,
            sector: modifiedFields.sector === true? req.body.sector : undefined,
            provincia: modifiedFields.provincia === true? req.body.provincia : undefined,
            video: modifiedFields.videoInput === true? videoHash : undefined,
            codpostal: modifiedFields.codpostal === true? isNaN(req.body.codpostal)? 0 : parseInt(req.body.codpostal, 10) : undefined
        };

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

        dbCRUD.Update('empresas', data, data.user)
            const dataNew =  await dbLogin.getUserData(data.user, 'empresas');
            console.log(dataNew);
            if (modifiedFields.password === true) {
              const title = `Contraseña Actualizada`;
              const subtitle = `Su Contraseña Coorporativa ha sido actualizada. <br\> 
              En caso de que usted no la haya modificado pongase en contacto con el 
              soporte técnico de Empleo Inclusivo.`;
              const textBoton = 'Ir a Empleo Inclusivo';
              const htmlText = generateRegistrationEmail(title, subtitle, textBoton);     
              const subject = 'Actualización de Contraseña'
              sendMail(dataNew.correo, subject, htmlText)
            }
            res.json({success: true, dataNew: dataNew.image});
        } catch (error) {
            console.error("Error:", error);
    
            // Enviar una respuesta de error al cliente
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    
});

module.exports = router;