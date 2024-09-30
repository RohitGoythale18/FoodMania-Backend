const express = require('express');
const { sendMessageCtrl, getMessageCtrl, getAllMessageCtrl, totalMessageCtrl, deleteMessageCtrl } = require('../../controllers/contact/Contact');
const contactRoutes = express.Router();

contactRoutes.post('/send-message', sendMessageCtrl);
contactRoutes.get('/get-message/:id', getMessageCtrl);
contactRoutes.get('/get-message-list', getAllMessageCtrl);
contactRoutes.get('/message-count', totalMessageCtrl);
contactRoutes.delete('/delete-message/:id', deleteMessageCtrl);

module.exports = contactRoutes;