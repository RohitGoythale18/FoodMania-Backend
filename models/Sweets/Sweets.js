const mongoose = require('mongoose');

//Schema
const sweetSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        require: true,
    },
    recipeIngredients: {
        type: String,
        require: true,
    },
    recipeSteps: {
        type: String,
        require: true,
    },
    recipeImage: {
        type: String,
    },
}, {
    timestamps: true,
});

//Model
const sweetModel = mongoose.model('Sweet', sweetSchema);

module.exports = sweetModel;