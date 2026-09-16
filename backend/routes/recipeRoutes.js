const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/reciepeControllers');
const { protect } = require('../controllers/middlewre/authMiddleware');

// Create recipe → Protected
router.post('/', protect, recipeController.createRecipe);

// Public routes
router.get('/', recipeController.getAllRecipes);
router.get('/feed', recipeController.getCommunityFeed);
router.get('/trending', recipeController.getTrendingRecipes);
router.get('/todays-special', recipeController.getTodaysSpecial);
router.get('/my', protect, recipeController.getMyRecipes);
router.get('/:id', recipeController.getRecipeById);

// We'll protect these in the next step
router.put('/:id', protect, recipeController.updateRecipe);
router.delete('/:id', protect, recipeController.deleteRecipe);

module.exports = router;