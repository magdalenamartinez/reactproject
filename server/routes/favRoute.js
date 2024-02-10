const express = require('express');
const dbFav = require('../database/fav');
const dbOfertas = require('../database/ofertas');
const router = express.Router();


router.post('/change-fav', async(req, res) => {
    try {
        const id = req.body.id;
        const select_id = req.body.select_id;
        const table = req.body.table;

        const isFavorito = await dbFav.existFav(id, select_id, table);
        
        console.log(req.body.id);
        console.log(req.body.select_id);
        console.log(req.body.table);
        if (isFavorito) {
            //No existe en favoritos
            const removeFav = await dbFav.RemoveFromFav(id, select_id, table);
            console.log('Existe en favoritos');
            res.json({ success: true, num: '1' });

        } else{
            //Existe en favoritos
            const addFav = await dbFav.AddToFav(id, select_id, table);
            console.log('No existe en favs');
            res.json({ success: true, num: '2' });
        }
    } catch(error) {
        console.log('Error al añadir a favoritos', error);
        res.status(500).json({ success: false, message: 'Error interno del Servidor' });
    }

});


router.post('/get-favs', async(req, res) => {
    try {
        const id = req.body.id;
        const table = req.body.table;
        const favoritos = await dbFav.GetFavs(id, table);
        res.json({ success: true, data: favoritos });
    } catch(error) {
        console.log('Error al añadir a favoritos', error);
        res.status(500).json({ success: false, message: 'Error interno del Servidor' });
    }

});


router.post('/get-favs-ofertas', async(req, res) => {
    try {
        const id = req.body.id;
        const table = req.body.table;
        const tableToSearch = req.body.tableToSearch;
        const idsFav = await dbFav.GetFavs(id, table);
        if (idsFav.length > 0) {
            const ofertas = await dbOfertas.getOfertasFavs(tableToSearch, idsFav);
            res.json({ success: true, data: ofertas }); 
        } else {
        res.json({ success: true, data: null}); 

        }
    } catch(error) {
        console.log('Error al añadir a favoritos', error);
        res.status(500).json({ success: false, message: 'Error interno del Servidor' });
    }

});




module.exports = router;

