const Recipe = require('../models/Recipe');
const Like = require('../models/Like');
const Review = require('../models/Review');

const checkAchievements = async (user) => {
  const achievements = user.achievements || [];

  // 1️⃣ First Recipe
  const recipeCount = await Recipe.countDocuments({
    author: user._id,
  });

  if (
    recipeCount >= 1 &&
    !achievements.includes('first_recipe')
  ) {
    achievements.push('first_recipe');
  }

  // 2️⃣ Recipe Creator
  if (
    recipeCount >= 5 &&
    !achievements.includes('recipe_creator')
  ) {
    achievements.push('recipe_creator');
  }

  // 3️⃣ Popular Chef
  const receivedLikes = await Like.countDocuments({
    recipe: {
      $in: await Recipe.find({
        author: user._id,
      }).distinct('_id'),
    },
  });

  if (
    receivedLikes >= 10 &&
    !achievements.includes('popular_chef')
  ) {
    achievements.push('popular_chef');
  }

  // 4️⃣ Reviewer
  const reviewCount = await Review.countDocuments({
    user: user._id,
  });

  if (
    reviewCount >= 5 &&
    !achievements.includes('reviewer')
  ) {
    achievements.push('reviewer');
  }

  user.achievements = achievements;

  await user.save();

  return user;
};

module.exports = checkAchievements;