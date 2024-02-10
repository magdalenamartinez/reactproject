const express = require('express');
const db = require('../database/db');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const upload = multer({ dest: 'uploads/' });
const dbChat = require('../database/chat');

router.post('/get-messages', async (req, res) => {
    try {
        const id = req.body.sender_id;
        const type = req.body.type;
        const table = (type === 1 || type === '1')? 'chat_mesages':'chat_messages_empresa';
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
        const table = (type === 1 || type === '1')? 'chat_mesages':'chat_messages_empresa';
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

module.exports = router;