const mongoose = require('mongoose');

//Schema
const contactSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    userEmail: {
        type: String,
        require: true,
    },
    userPhone: {
        type: String,
        require: true,
    },
    userMessage: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});

//Model
const contactModel = mongoose.model('Contact', contactSchema);

module.exports = contactModel;