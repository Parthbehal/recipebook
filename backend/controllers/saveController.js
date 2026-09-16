const Save = require('../models/Save');
const Recipe = require('../models/Recipe');

// Save a recipe
exports.saveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found',
      });
    }

    const existingSave = await Save.findOne({
      user: req.user._id,
      recipe: recipeId,
    });

    if (existingSave) {
      return res.status(400).json({
        message: 'Recipe already saved',
      });
    }

    await Save.create({
      user: req.user._id,
      recipe: recipeId,
    });

    res.status(201).json({
      message: 'Recipe saved successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Unsave a recipe
exports.unsaveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const save = await Save.findOneAndDelete({
      user: req.user._id,
      recipe: recipeId,
    });

    if (!save) {
      return res.status(400).json({
        message: 'Recipe has not been saved',
      });
    }

    res.json({
      message: 'Recipe unsaved successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Check whether current user saved a recipe
exports.checkSave = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const save = await Save.findOne({
      user: req.user._id,
      recipe: recipeId,
    });

    res.json({
      saved: !!save,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Get recipes saved by logged-in user

exports.getSavedRecipes = async (req, res) => {
  try {
    const savedRecipes = await Save.find({
      user: req.user._id,
    })
      .populate({
        path: 'recipe',
        populate: {
          path: 'author',
          select: 'name profileImage',
        },
      })
      .sort({ createdAt: -1 });

    const recipes = savedRecipes.map((save) => save.recipe);

    res.json(recipes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};