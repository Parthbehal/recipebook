const Like = require('../models/Like');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const addXP = require('../utils/xpHelper');
const checkAchievements = require('../utils/achievementHelper');


// Like a recipe
exports.likeRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    // Check that recipe exists
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found',
      });
    }

    // Check whether user already liked it
    const existingLike = await Like.findOne({
      user: req.user._id,
      recipe: recipeId,
    });

    if (existingLike) {
      return res.status(400).json({
        message: 'Recipe already liked',
      });
    }

    // Create like
    // Create like
await Like.create({
  user: req.user._id,
  recipe: recipeId,
});

// Give XP to recipe owner
const recipeOwner = await User.findById(recipe.author);

if (recipeOwner) {
  await addXP(recipeOwner, 10);
  await checkAchievements(recipeOwner);
}

// Update recipe like count
recipe.likesCount += 1;
await recipe.save();

    res.status(201).json({
      message: 'Recipe liked successfully',
      likesCount: recipe.likesCount,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Unlike a recipe
exports.unlikeRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const like = await Like.findOneAndDelete({
      user: req.user._id,
      recipe: recipeId,
    });

    if (!like) {
      return res.status(400).json({
        message: 'Recipe has not been liked',
      });
    }

    // Decrease like count
    const recipe = await Recipe.findById(recipeId);

    if (recipe) {
      recipe.likesCount = Math.max(
        0,
        recipe.likesCount - 1
      );

      await recipe.save();
    }

    res.json({
      message: 'Recipe unliked successfully',
      likesCount: recipe ? recipe.likesCount : 0,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Check whether current user liked a recipe
exports.checkLike = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const like = await Like.findOne({
      user: req.user._id,
      recipe: recipeId,
    });

    res.json({
      liked: !!like,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};