const express = require('express');
const router = express.Router();
const recipeController = require("../controllers/reciepeControllers");

// Create a new recipe
router.post('/', recipeController.createRecipe);

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Get a recipe by ID
router.get('/:id', recipeController.getRecipeById);

// Update a recipe
router.put('/:id', recipeController.updateRecipe);

// Delete a recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;

