const express = require('express');
const { addSoupCtrl, getSoupCtrl, getAllSoupCtrl, totalSoupCtrl, updateSoupCtrl, deleteSoupCtrl } = require('../../controllers/Soups/Soups');
const soupRoutes = express.Router();
const multer = require("multer");
const storage = require("../../config/cloudinary");

const upload = multer({ storage });

soupRoutes.post('/add-soup', upload.single('recipeImage'), addSoupCtrl);
soupRoutes.get('/get-soup/:id', getSoupCtrl);
soupRoutes.get('/get-soup-list', getAllSoupCtrl);
soupRoutes.get('/soup-count', totalSoupCtrl);
soupRoutes.put('/update-soup/:id', upload.single('recipeImage'), updateSoupCtrl);
soupRoutes.delete('/delete-soup/:id', deleteSoupCtrl);

module.exports = soupRoutes;