const express = require('express');
const db = require('../database/db');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const upload = multer({ dest: 'uploads/' });
const dbChat = require('../database/chat');
const dbOfertas = require('../database/ofertas');
const dbApply = require('../database/apply');

router.post('/get-messages', async (req, res) => {
    try {
        const id = req.body.sender_id;
        const type = req.body.type;
        const table = (type === 1 || type === '1')? 'chat_messages':'chat_messages_empresa';
        const table2 = (type === 1 || type === '1')? 'clientes':'empresas';
        const admin = req.body.admin;
        const column = (admin === true)? 'readByAdmin':'readByUser';
        await dbChat.changeRead(id, table2, column);
        setTimeout(async () => {
            try {
                const messages = await dbChat.getMessages(id, table);
                res.json({ success: !!messages, data: messages || null });
            } catch (error) {
                console.error('Error al obtener mensajes: ', error);
                res.status(500).json({ success: false, message: 'Error interno del Servidor' });
            }
        }, 5000);
    } catch (error) {
        console.log('Error al obtener mensajes', error);
        res.status(500).json({ success: false, message: 'Error interno del Servidor' });
    }
});



router.post('/save-message', async(req, res) => {
    try {
        const id = req.body.sender_id;
        const message = req.body.message;
        const type = req.body.type;
        const kind = req.body.kind;
        const table = (type === 1 || type === '1')? 'chat_messages':'chat_messages_empresa';
        const table2 = (type === 1 || type === '1')? 'clientes':'empresas';
        const column = (kind === 'user')? 'readByAdmin':'readByUser';
        await dbChat.changeReadToFalse(id, table2, column);
        const messages = await dbChat.saveMessage(id, kind, message, table);
        res.json({ success: !!messages, num: messages ? '1' : '2' });
    } catch(error) {
        console.log('Error al añadir mensaje', error);
        res.status(500).json({ success: false, message: 'Error interno del Servidor' });
    }

});



router.post('/get-conversaciones', async(req, res) => {
    const id = req.body.id;
    const type = req.body.type;
    console.log(id, type);
      try {
        let ids;
        if (type === 'empresa') {
            ids = await dbChat.getUniqueIdChatApply('chat_messages_solicitantes', id);
        } else {
            ids = await dbChat.getUniqueIdEmpresaChatApply('chat_messages_solicitantes', id);
        }
        console.log(ids);
        if (ids) {
            if (type === 'empresa') {
              data = await dbApply.getHeaderDataIdsApply('clientes', ids, 'isread', 'sender_id'); 
            } else {
              data = await dbApply.getHeaderDataIdsApply('empresas', ids, 'readByUser','id_empresa'); 
            }
            res.json({ success: true, data: data });
        } else{
            res.json({ success: false, data: null });
        }
      } catch(error) {
          console.log('Error al get mensaje', error);
          res.status(500).json({ success: false, message: 'Error interno del Servidor' });
      }
});



router.post('/get-messages-apply', async (req, res) => {
    try {
        const sender_id = req.body.sender_id;
        const id_empresa = req.body.id_empresa;
        const type = req.body.type;
        if (type === 'empresa') {
            await dbApply.changeReadApply(id_empresa, sender_id, 'isread');
        } else {
            await dbApply.changeReadApply(id_empresa, sender_id, 'readByUser');
        }
            try {
                const messages = await dbApply.getMessagesApply(sender_id, id_empresa);
                if (messages) {
                    res.json({ success: true, data: messages });
                } else {
                    res.json({ success: false, data: null });
                }
            } catch (error) {
                console.error('Error al obtener mensajes:', error);
                res.status(500).json({ success: false, message: 'Error interno del Servidor' });
            }
    } catch (error) {
        console.log('Error al añadir mensaje', error);
        res.status(500).json({ success: false, message: 'Error interno del Servidor' });
    }
});


router.post('/get-clientes-by-idOferta', async(req, res) => {
    try {
        const id_oferta = req.body.id_oferta;
        const table = req.body.table;
        const tableToSearch = req.body.tableToSearch;
        const idsFav = await dbApply.GetSolicitantes(id_oferta, table);
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


router.post('/save-message-apply', async(req, res) => {
    try {
        const sender_id = req.body.sender_id;
        const id_empresa = req.body.id_empresa;
        const message = req.body.message;
        const type = req.body.type;
       
        const messages = await dbApply.saveMessageSolicitante(sender_id, id_empresa, type, message,
             'chat_messages_solicitantes');

        if (messages) {
            res.json({ success: true, num: '1' });
        } else{
            res.json({ success: false, num: '2' });
        }
    } catch(error) {
        console.log('Error al añadir mensaje', error);
        res.status(500).json({ success: false, message: 'Error interno del Servidor' });
    }

});



module.exports = router;