const express = require('express');
const { addSweetCtrl, getSweetCtrl, getAllSweetCtrl,totalSweetCtrl , updateSweetCtrl, deleteSweetCtrl } = require('../../controllers/Sweets/Sweets');
const sweetRoutes = express.Router();
const multer = require("multer");
const storage = require("../../config/cloudinary");

const upload = multer({ storage });

sweetRoutes.post('/add-sweet', upload.single('recipeImage'), addSweetCtrl);
sweetRoutes.get('/get-sweet/:id', getSweetCtrl);
sweetRoutes.get('/get-sweet-list', getAllSweetCtrl);
sweetRoutes.get('/sweet-count', totalSweetCtrl);
sweetRoutes.put('/update-sweet/:id', upload.single('recipeImage'), updateSweetCtrl);
sweetRoutes.delete('/delete-sweet/:id', deleteSweetCtrl);

module.exports = sweetRoutes;