const Recipe = require('../models/Recipe');
const addXP = require('../utils/xpHelper');
const checkAchievements = require('../utils/achievementHelper');

// Create new recipe
exports.createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      author: req.user._id,
    });

    const savedRecipe = await recipe.save();

await addXP(req.user, 50);

await checkAchievements(req.user);

res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get community feed

exports.getCommunityFeed = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('author', 'name profileImage bio xp level')
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      author: req.user._id,
    })
      .populate('author', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get single recipe
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'name profileImage bio xp level');

    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found',
      });
    }

    res.json(recipe);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    // Recipe doesn't exist
    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found',
      });
    }

    // User is not the owner
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'You are not allowed to update this recipe',
      });
    }

    // Update recipe
    Object.assign(recipe, req.body);

    // Never allow client to change the owner
    recipe.author = req.user._id;

    const updatedRecipe = await recipe.save();

    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// Delete recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    // Recipe doesn't exist
    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found',
      });
    }

    // User is not the owner
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'You are not allowed to delete this recipe',
      });
    }

    // Delete recipe
    await Recipe.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Recipe deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getTrendingRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('author', 'name profileImage')
      .sort({
        likesCount: -1,
        reviewCount: -1,
      })
      .limit(6);

    res.json(recipes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getTodaysSpecial = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    if (recipes.length === 0) {
      return res.json(null);
    }

    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

    const index = dayOfYear % recipes.length;

    const recipe = await Recipe.findById(recipes[index]._id)
      .populate('author', 'name profileImage');

    res.json(recipe);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};