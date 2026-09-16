const express = require('express');
const router = express.Router();

const saveController = require('../controllers/saveController');
const { protect } = require('../controllers/middlewre/authMiddleware');

// Save a recipe
router.post('/:recipeId', protect, saveController.saveRecipe);

// Unsave a recipe
router.delete('/:recipeId', protect, saveController.unsaveRecipe);
router.get('/me', protect, saveController.getSavedRecipes);
// Check save status
router.get('/:recipeId/status', protect, saveController.checkSave);

module.exports = router;