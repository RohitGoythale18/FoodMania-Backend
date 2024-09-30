const mongoose = require('mongoose');

//Schema
const nonvegSchema = new mongoose.Schema({
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
const nonvegModel = mongoose.model('Nonveg', nonvegSchema);

module.exports = nonvegModel;