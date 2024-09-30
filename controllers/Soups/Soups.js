const soupModel = require('../../models/Soups/Soups');
const appErr = require("../../utils/appErr");

const addSoupCtrl = async (req, res, next) => {
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
        const soupFound = await soupModel.findOne({ recipeName });

        if (soupFound) {
            return next(appErr('Soup already exists', 400));
        }

        const soup = await soupModel.create({
            recipeName,
            recipeIngredients,
            recipeSteps,
            recipeImage: req.file.path,
        });

        res.json({
            status: 'success',
            data: {
                "Recipe ID": soup._id,
                "Recipe name": soup.recipeName,
                "Recipe ingredients": soup.recipeIngredients,
                "Recipe steps": soup.recipeSteps,
                "Recipe image": soup.recipeImage,
            }
        });

    } catch (error) {
        next(appErr(error.message));
    }
};

const getSoupCtrl = async (req, res, next) => {
    const soup = req.params.id;
    const soupFound = await soupModel.findById(soup);

    try {
        res.json({
            status: 'success',
            data: {
                "Recipe ID": soupFound._id,
                "Recipe name": soupFound.recipeName,
                "Recipe ingredients": soupFound.recipeIngredients,
                "Recipe steps": soupFound.recipeSteps,
                "Recipe image": soupFound.recipeImage,
            }
        });
    } catch (error) {
        next(appErr(error.message));   
    }
};

const getAllSoupCtrl = async (req, res, next) => {
    try {
        const allSoups = await soupModel.find();

        res.json({
            status: 'success',
            data: allSoups,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

const totalSoupCtrl = async (req, res, next) => {
    try {
        const totalSoup = await  soupModel.countDocuments({});
        res.json({
            status: 'success',
            data: totalSoup,
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const updateSoupCtrl = async (req, res, next) => { 
    const { recipeName, recipeIngredients, recipeSteps } = req.body;

    try {
        const soupFound = await soupModel.findById(req.params.id);

        if (!soupFound) {
            return next(appErr('Soup not found...!', 400));
        }

        const updatedData = {
            recipeName,
            recipeIngredients,
            recipeSteps,
        };

        if (req.file) {
            updatedData.recipeImage = req.file.path;
        };

        const updatedSoup = await soupModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.json({
            status: 'success',
            data: {
                "Recipe ID": updatedSoup._id,
                "Recipe name": updatedSoup.recipeName,
                "Recipe ingredients": updatedSoup.recipeIngredients,
                "Recipe steps": updatedSoup.recipeSteps,
                "Recipe image": updatedSoup.recipeImage,
            },
        });

    } catch (error) {
        next(appErr(error.message));
    }
};

const deleteSoupCtrl = async (req, res, next) => {
    try {
        await soupModel.findByIdAndDelete(req.params.id);

        res.json({
            status: "success",
            data: "Soup deleted...!",
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

module.exports = {
    addSoupCtrl,
    getSoupCtrl,
    getAllSoupCtrl,
    totalSoupCtrl,
    updateSoupCtrl,
    deleteSoupCtrl,
};