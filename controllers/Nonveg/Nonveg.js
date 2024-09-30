const nonvegModel = require('../../models/Nonveg/Nonveg');
const appErr = require("../../utils/appErr");

const addNonvegCtrl = async (req, res, next) => {
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
        const nonvegFound = await nonvegModel.findOne({ recipeName });

        if (nonvegFound) {
            return next(appErr('Nonveg already exists', 400));
        }

        const nonveg = await nonvegModel.create({
            recipeName,
            recipeIngredients,
            recipeSteps,
            recipeImage: req.file.path,
        });

        res.json({
            status: 'success',
            data: {
                "Recipe ID": nonveg._id,
                "Recipe name": nonveg.recipeName,
                "Recipe ingredients": nonveg.recipeIngredients,
                "Recipe steps": nonveg.recipeSteps,
                "Recipe image": nonveg.recipeImage,
            }
        });

    } catch (error) {
        next(appErr(error.message));
    }
};

const getNonvegCtrl = async (req, res, next) => {
    const nonveg = req.params.id;
    const nonvegFound = await nonvegModel.findById(nonveg);

    try {
        res.json({
            status: 'success',
            data: {
                "Recipe ID": nonvegFound._id,
                "Recipe name": nonvegFound.recipeName,
                "Recipe ingredients": nonvegFound.recipeIngredients,
                "Recipe steps": nonvegFound.recipeSteps,
                "Recipe image": nonvegFound.recipeImage,
            }
        });
    } catch (error) {
        next(appErr(error.message));   
    }
};

const getAllNonvegCtrl = async (req, res, next) => {
    try {
        const allNonveg = await nonvegModel.find();

        res.json({
            status: 'success',
            data: allNonveg,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const totalNonvegCtrl = async (req, res, next) => {
    try {
        const totalNonveg = await  nonvegModel.countDocuments({});
        res.json({
            status: 'success',
            data: totalNonveg,
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const updateNonvegCtrl = async (req, res, next) => { 
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    try {
        const nonvegFound = await nonvegModel.findById(req.params.id);

        if (!nonvegFound) {
            return next(appErr('Nonveg not found...!', 400));
        }

        const updatedData = {
            recipeName,
            recipeIngredients,
            recipeSteps,
        };

        if (req.file) {
            updatedData.recipeImage = req.file.path;
        };

        const updatedNonveg = await nonvegModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.json({
            status: 'success',
            data: {
                "Recipe ID": updatedNonveg._id,
                "Recipe name": updatedNonveg.recipeName,
                "Recipe ingredients": updatedNonveg.recipeIngredients,
                "Recipe steps": updatedNonveg.recipeSteps,
                "Recipe image": updatedNonveg.recipeImage,
            },
        });

    } catch (error) {
        next(appErr(error.message));
    }
};

const deleteNonvegCtrl = async (req, res, next) => {
    try {
        await nonvegModel.findByIdAndDelete(req.params.id);

        res.json({
            status: "success",
            data: "Nonveg deleted...!",
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

module.exports = {
    addNonvegCtrl,
    getNonvegCtrl,
    getAllNonvegCtrl,
    totalNonvegCtrl,
    updateNonvegCtrl,
    deleteNonvegCtrl,
};