const express = require('express');
const { addNonvegCtrl, getNonvegCtrl, getAllNonvegCtrl, totalNonvegCtrl, updateNonvegCtrl, deleteNonvegCtrl } = require('../../controllers/Nonveg/Nonveg');
const nonvegRoutes = express.Router();
const multer = require("multer");
const storage = require("../../config/cloudinary");

const upload = multer({ storage });

nonvegRoutes.post('/add-nonveg', upload.single('recipeImage'), addNonvegCtrl);
nonvegRoutes.get('/get-nonveg/:id', getNonvegCtrl);
nonvegRoutes.get('/get-nonveg-list', getAllNonvegCtrl);
nonvegRoutes.get('/nonveg-count', totalNonvegCtrl);
nonvegRoutes.put('/update-nonveg/:id', upload.single('recipeImage'), updateNonvegCtrl);
nonvegRoutes.delete('/delete-nonveg/:id', deleteNonvegCtrl);

module.exports = nonvegRoutes;