const mongoose = require('mongoose');

//Schema
const soupSchema = new mongoose.Schema({
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
const soupModel = mongoose.model('Soup', soupSchema);

module.exports = soupModel;