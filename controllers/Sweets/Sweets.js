const sweetModel = require('../../models/Sweets/Sweets');
const appErr = require("../../utils/appErr");

const addSweetCtrl = async (req, res, next) => {
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    if (!recipeName) {
        return next(appErr('Recipe name is required...!', 400));
    }
    if (!recipeIngredients) {
        return next(appErr('Recipe ingredients are required...!', 400));
    }
    if (!recipeSteps) {
        return next(appErr('Recipe steps are required...!', 400));
    }

    try {
        const sweetFound = await sweetModel.findOne({ recipeName });

        if (sweetFound) {
            return next(appErr('Sweet already exists', 400));
        }

        const sweet = await sweetModel.create({
            recipeName,
            recipeIngredients,
            recipeSteps,
            recipeImage: req.file.path,
        });

        res.json({
            status: 'success',
            data: {
                "Recipe ID": sweet._id,
                "Recipe name": sweet.recipeName,
                "Recipe ingredients": sweet.recipeIngredients,
                "Recipe steps": sweet.recipeSteps,
                "Recipe image": sweet.recipeImage,
            }
        });

    } catch (error) {
        next(appErr(error.message));
    }
};

const getSweetCtrl = async (req, res, next) => {
    const sweet = req.params.id;
    const sweetFound = await sweetModel.findById(sweet);

    try {
        res.json({
            status: 'success',
            data: {
                "Recipe ID": sweetFound._id,
                "Recipe name": sweetFound.recipeName,
                "Recipe ingredients": sweetFound.recipeIngredients,
                "Recipe steps": sweetFound.recipeSteps,
                "Recipe image": sweetFound.recipeImage,
            }
        });
    } catch (error) {
        next(appErr(error.message));   
    }
};

const getAllSweetCtrl = async (req, res, next) => { 
    try {
        const allSweets = await sweetModel.find();

        res.json({
            status: 'success',
            data: allSweets,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const totalSweetCtrl = async (req, res, next) => {
    try {
        const totalSweet = await  sweetModel.countDocuments({});
        res.json({
            status: 'success',
            data: totalSweet,
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const updateSweetCtrl = async (req, res, next) => { 
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    try {
        const sweetFound = await sweetModel.findById(req.params.id);

        if (!sweetFound) {
            return next(appErr('Sweet not found...!', 400));
        }

        const updatedData = {
            recipeName,
            recipeIngredients,
            recipeSteps,
        };

        if (req.file) {
            updatedData.recipeImage = req.file.path;
        };

        const updatedSweet = await sweetModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.json({
            status: 'success',
            data: {
                "Recipe ID": updatedSweet._id,
                "Recipe name": updatedSweet.recipeName,
                "Recipe ingredients": updatedSweet.recipeIngredients,
                "Recipe steps": updatedSweet.recipeSteps,
                "Recipe image": updatedSweet.recipeImage,
            },
        });

    } catch (error) {
        next(appErr(error.message));
    }
};

const deleteSweetCtrl = async (req, res, next) => { 
    try {
        await sweetModel.findByIdAndDelete(req.params.id);

        res.json({
            status: "success",
            data: "Sweet deleted...!",
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

module.exports = {
    addSweetCtrl,
    getSweetCtrl,
    getAllSweetCtrl,
    totalSweetCtrl,
    updateSweetCtrl,
    deleteSweetCtrl,
};