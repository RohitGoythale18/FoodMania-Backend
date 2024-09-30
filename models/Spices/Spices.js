const mongoose = require('mongoose');

//Schema
const spiceSchema = new mongoose.Schema({
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
const spiceModel = mongoose.model('Spice', spiceSchema);

module.exports = spiceModel;