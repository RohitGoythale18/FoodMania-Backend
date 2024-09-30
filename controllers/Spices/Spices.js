const spiceModel = require('../../models/Spices/Spices');
const appErr = require("../../utils/appErr");

const addSpiceCtrl = async (req, res, next) => {
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
        const spiceFound = await spiceModel.findOne({ recipeName });

        if (spiceFound) {
            return next(appErr('Spice already exists', 400));
        }

        const spice = await spiceModel.create({
            recipeName,
            recipeIngredients,
            recipeSteps,
            recipeImage: req.file.path,
        });

        res.json({
            status: 'success',
            data: {
                "Recipe ID": spice._id,
                "Recipe name": spice.recipeName,
                "Recipe ingredients": spice.recipeIngredients,
                "Recipe steps": spice.recipeSteps,
                "Recipe image": spice.recipeImage,
            }
        });

    } catch (error) {
        next(appErr(error.message));
    }
};

const getSpiceCtrl = async (req, res, next) => {
    const spice = req.params.id;
    const spiceFound = await spiceModel.findById(spice);

    try {
        res.json({
            status: 'success',
            data: {
                "Recipe ID": spiceFound._id,
                "Recipe name": spiceFound.recipeName,
                "Recipe ingredients": spiceFound.recipeIngredients,
                "Recipe steps": spiceFound.recipeSteps,
                "Recipe image": spiceFound.recipeImage,
            }
        });
    } catch (error) {
        next(appErr(error.message));   
    }
};

const getAllSpiceCtrl = async (req, res, next) => {
    try {
        const allSpices = await spiceModel.find();

        res.json({
            status: 'success',
            data: allSpices,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const totalSpiceCtrl = async (req, res, next) => {
    try {
        const totalSpice = await  spiceModel.countDocuments({});
        res.json({
            status: 'success',
            data: totalSpice,
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const updateSpiceCtrl = async (req, res, next) => { 
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    try {
        const spiceFound = await spiceModel.findById(req.params.id);

        if (!spiceFound) {
            return next(appErr('Spice not found...!', 400));
        }

        const updatedData = {
            recipeName,
            recipeIngredients,
            recipeSteps,
        };

        if (req.file) {
            updatedData.recipeImage = req.file.path;
        };

        const updatedSpice = await spiceModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.json({
            status: 'success',
            data: {
                "Recipe ID": updatedSpice._id,
                "Recipe name": updatedSpice.recipeName,
                "Recipe ingredients": updatedSpice.recipeIngredients,
                "Recipe steps": updatedSpice.recipeSteps,
                "Recipe image": updatedSpice.recipeImage,
            },
        });

    } catch (error) {
        next(appErr(error.message));
    }
};

const deleteSpiceCtrl = async (req, res, next) => {
    try {
        await spiceModel.findByIdAndDelete(req.params.id);

        res.json({
            status: "success",
            data: "Spice deleted...!",
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

module.exports = {
    addSpiceCtrl,
    getSpiceCtrl,
    getAllSpiceCtrl,
    totalSpiceCtrl,
    updateSpiceCtrl,
    deleteSpiceCtrl,
};