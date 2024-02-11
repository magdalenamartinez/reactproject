const express = require('express');
const dbCRUD = require('../database/CRUD');
const dbPublish = require('../database/publish');
const dbOfertas = require('../database/ofertas');
const dbMail = require('../database/mail');
const dbFav = require('../database/fav');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const { sendMail, generateRegistrationEmail } = require('./sendmail');


router.post('/save-data3', upload.fields([
    { name: 'imageInput', maxCount: 1 },
  ]), function(req, res) {
    const imageFile = req.files['imageInput'] ? req.files['imageInput'][0] : '';
    const imageHash = imageFile ? imageFile.filename : '';
  
    const data = {
        id_empresa: req.body.id_empresa,
        titulo_oferta: req.body.titulo_oferta,
        id_empresa: req.body.id_empresa,
        descripcion_oferta: req.body.descripcion_oferta,
        fechaInicio: req.body.fechaInicio,
        salario: req.body.salario,
        image: imageHash,
        provincia: req.body.provincia|| '',
        codpostal: parseInt(req.body.codpostal,10),
        calendarioEventos: req.body.calendarioEventos,
        politicasInclusivas: req.body.politicasInclusivas === 'on',
        instalacionesAccesibles: req.body.instalacionesAccesibles === 'on',
        formacionInclusividad: req.body.formacionInclusividad === 'on',
        mentoresApoyo: req.body.mentoresApoyo === 'on',
        ambienteAdaptado: req.body.ambienteAdaptado === 'on',
        requisitosSolicitante: req.body.requisitos,
        
        };
     
        dbCRUD.Create('oferta_empleo', data)
        .then(result => {
          console.log('DATOS GUARDADOS EN LA BASE');
          res.json({ success: true});
        })
        .catch(error => {
          console.error('Error al guardar datos en la base de datos', error);
          res.status(500).send('Error interno del servidor');
        });
    
  
  
  
  });


  
  router.post('/get-ofertas', async(req, res) => {
    id_empresa = req.body.id_empresa;
    console.log(id_empresa);
    if (id_empresa) {
        try {
            const results = await db.Read_Ofertas_id_num(id_empresa);
            if (results.length > 0) {
                res.json({ success: true, data: results});
            } else {
                res.json({ success: false, message: 'Error de la base de datos' });
            }

        } catch (error) {
            console.log('Error al obtener los datos', error);
            res.status(500).json({error: 'Error Interno Del Servidor'});
        }
    } else {
        res.json({ success: false, number: 1, message: 'Error de servidor' });
    }
   

});

router.get('/get-all-ofertas', async(req, res) => {
  try {
      const results = await dbPublish.GetPublish();
      if (results && results.length > 0) {
          res.json({ success: true, data: results });
      } else {
          res.json({ success: false, message: 'No hay resultados o error de la base de datos' });
      }
  } catch (error) {
      console.log('Error al obtener los datos', error);
      res.status(500).json({ error: 'Error Interno Del Servidor' });
  }
});


router.post('/operation-ofertas', async(req, res)  => {
  const id_oferta= req.body.id;
  const action = req.body.action;
  if (action === 'delete') {
    try {
      const results = await dbCRUD.Delete('oferta_empleo',id_oferta);
      if (results.length > 0) {
          res.json({ success: true, data: results});
      } else {
          res.json({ success: false, message: 'Error de la base de datos' });
      }
      } catch (error) {
          console.log('Error al obtener los datos', error);
          res.status(500).json({error: 'Error Interno Del Servidor'});
      }
  } else if (action === 'publish'){
    try {
      const results = await dbPublish.SetPublish(id_oferta);
      if (results.length > 0) {
        const published = await dbPublish.GetPublishById(id_oferta);
        if (published.publish === 1) {
            const correo = await dbMail.GetMail('empresas', req.body.idEmpresa);
            if (correo) {
                const title = `Publicación`;
                const subtitle = `Una de las Ofertas de Empleo de su Empresa ha sido publicada, <br\>
                cualquier persona podrá verla. <br\> 
                Si desea modificarlo vuelva a Ofertas Creadas desde su cuenta
                en Empleo Inclusivo`;
                const textBoton = 'Ir a Empleo Inclusivo';
                const htmlText = generateRegistrationEmail(title, subtitle, textBoton);     
                const subject = 'Publicación de Oferta de Empleo'
                sendMail(correo, subject, htmlText)
            }
        } else {
            await dbFav.RemoveFavById('favoritos',id_oferta);
        }
          res.json({ success: true, data: results});
      } else {
          res.json({ success: false, message: 'Error de la base de datos' });
      }
      } catch (error) {
          console.log('Error al obtener los datos', error);
          res.status(500).json({error: 'Error Interno Del Servidor'});
      }
  } else {
    res.json({ success: false, message: 'Error de servidor' });
  }
});


router.post('/get-one-oferta', async(req, res) => {
    const id_oferta = req.body.id_oferta;
    if (id_oferta) {
        try {
            const results = await dbCRUD.ReadOne('oferta_empleo',id_oferta);
            if (results.length > 0) {
                res.json({ success: true, data: results});
            } else {
                res.json({ success: false, message: 'Error de la base de datos' });
            }
        } catch (error) {
            console.log('Error al obtener los datos', error);
            res.status(500).json({error: 'Error Interno Del Servidor'});
        }
    } else {
        res.json({ success: false, number: 1, message: 'Error de servidor' });
    }
   

});

router.post('/update-data-oferta',  upload.fields([
    { name: 'imageInput', maxCount: 1 },
  ]), async(req, res) => {
    try {
          const modifiedFields = JSON.parse(req.body.modifiedFields);
          const deleteImage = JSON.parse(req.body.deleteImage);
          const imageFile = req.files['imageInput'] ? req.files['imageInput'][0] : '';
          const imageHash = imageFile ? imageFile.filename : '';
          const id = req.body.id_oferta;

          const data = {
              id_empresa: modifiedFields.id_empresa === true? req.body.id_empresa : undefined,
              publish: modifiedFields.publish === true? req.body.publish : undefined,
              titulo_oferta: modifiedFields.titulo_oferta === true? req.body.titulo_oferta : undefined,
              image: modifiedFields.imageInput === true? imageHash : undefined,
              descripcion_oferta: modifiedFields.descripcion_oferta === true? req.body.descripcion_oferta : undefined,
              fechaInicio: modifiedFields.fechaInicio === true?   req.body.fechaInicio : undefined,
              salario: modifiedFields.salario === true? req.body.salario : undefined,
              provincia: modifiedFields.provincia === true? req.body.provincia : undefined,
              codpostal: modifiedFields.codpostal === true? req.body.codpostal : undefined,
              calendarioEventos: modifiedFields.calendarioEventos === true? req.body.calendarioEventos : undefined,
              politicasInclusivas: modifiedFields.politicasInclusivas === true? req.body.p1 : undefined,
              instalacionesAccesibles: modifiedFields.instalacionesAccesibles === true? req.body.p2 : undefined,
              formacionInclusividad: modifiedFields.formacionInclusividad === true? req.body.p3 : undefined,
              mentoresApoyo: modifiedFields.mentoresApoyo ? req.body.p4 : undefined,
              ambienteAdaptado: modifiedFields.ambienteAdaptado === true? req.body.p5 : undefined,
              requisitosSolicitante: modifiedFields.requisitos === true? req.body.requisitos : undefined,
              };
  
            if (deleteImage === true) {
              data.image = '';
            }
            
            dbOfertas.UpdateOferta('oferta_empleo', data, id)
            const dataNew =  await dbOfertas.getOfertaData('oferta_empleo',id);
            res.json({success: true, dataNew: dataNew});
      }
      catch (error) {
            console.error("Error:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });
  


  module.exports = router;