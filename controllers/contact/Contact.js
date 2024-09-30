const contactModel = require('../../models/contact/Contact');
const appErr = require("../../utils/appErr");

const sendMessageCtrl = async (req, res, next) => {
    const { userName, userEmail, userPhone, userMessage } = req.body;

    try {
        const message = await contactModel.create({
            userName,
            userEmail,
            userPhone,
            userMessage,
        });

        res.json({
            status: 'success',
            data: {
                "User ID": message._id,
                "User name": message.userName,
                "User email": message.userEmail,
                "User phone": message.userPhone,
                "User message": message.userMessage,
            },
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const getMessageCtrl = async (req, res, next) => {
    const message = req.params.id;
    const messageFound = await contactModel.findById(message);
    
    try {
        res.json({
            status: 'success',
            data: {
                "User ID": messageFound._id,
                "User name": messageFound.userName,
                "User email": messageFound.userEmail,
                "User phone": messageFound.userPhone,
                "User message": messageFound.userMessage,
            },
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const getAllMessageCtrl = async (req, res, next) => {
    try {
        const allMessage = await contactModel.find();

        res.json({
            status: 'success',
            data: allMessage,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const totalMessageCtrl = async (req, res, next) => {
    try {
        const totalMessage = await  contactModel.countDocuments({});
        res.json({
            status: 'success',
            data: totalMessage,
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const deleteMessageCtrl = async (req, res, next) => {
    try {
        await contactModel.findByIdAndDelete(req.params.id);

        res.json({
            status: "success",
            data: "Message deleted...!",
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

module.exports = {
    sendMessageCtrl,
    getMessageCtrl,
    getAllMessageCtrl,
    totalMessageCtrl,
    deleteMessageCtrl,
}