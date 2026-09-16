const Review = require('../models/Review');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const checkAchievements = require('../utils/achievementHelper');
const addXP = require('../utils/xpHelper');

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating, comment } = req.body;

    // Check recipe exists
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found',
      });
    }

    // Check whether user already reviewed this recipe
    const existingReview = await Review.findOne({
      user: req.user._id,
      recipe: recipeId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: 'You have already reviewed this recipe',
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user._id,
      recipe: recipeId,
      rating,
      comment,
    });

    // Give XP to reviewer
const reviewer = await User.findById(req.user._id);

if (reviewer) {
  await addXP(reviewer, 20);
  await checkAchievements(reviewer);
}

    // Update recipe review count
    recipe.reviewCount += 1;
    await recipe.save();

    const populatedReview = await review.populate(
      'user',
      'name profileImage'
    );

    res.status(201).json(populatedReview);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get reviews for a recipe
exports.getRecipeReviews = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const reviews = await Review.find({
      recipe: recipeId,
    })
      .populate('user', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};