const express = require('express');
const dbOfertas = require('../database/ofertas');
const dbCRUD = require('../database/CRUD');
const router = express.Router();


router.post('/delete-data', async(req, res) => {
    try {
        if (req.body.table === 'empresas') {
            await dbOfertas.DeleteByIdEmpresa(req.body.id);
        }
        const results = await dbCRUD.Delete(req.body.table, req.body.id);
        if (results[0].affectedRows > 0) {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch(error) {
        console.log('Error al eliminar la cuenta', error);
        res.status(500).json({error: 'Error interno del Servidor'});
    }

});

module.exports = router;