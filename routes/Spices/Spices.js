const express = require('express');
const { addSpiceCtrl, getSpiceCtrl, getAllSpiceCtrl, totalSpiceCtrl, updateSpiceCtrl, deleteSpiceCtrl } = require('../../controllers/Spices/Spices');
const spiceRoutes = express.Router();
const multer = require("multer");
const storage = require("../../config/cloudinary");

const upload = multer({ storage });

spiceRoutes.post('/add-spice', upload.single('recipeImage'), addSpiceCtrl);
spiceRoutes.get('/get-spice/:id', getSpiceCtrl);
spiceRoutes.get('/get-spice-list', getAllSpiceCtrl);
spiceRoutes.get('/spice-count', totalSpiceCtrl);
spiceRoutes.put('/update-spice/:id', upload.single('recipeImage'), updateSpiceCtrl);
spiceRoutes.delete('/delete-spice/:id', deleteSpiceCtrl);

module.exports = spiceRoutes;