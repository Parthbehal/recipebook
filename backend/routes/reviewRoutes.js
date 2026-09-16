const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const { protect } = require('../controllers/middlewre/authMiddleware');

// Create a review
router.post('/:recipeId', protect, reviewController.createReview);
router.get('/:recipeId', reviewController.getRecipeReviews);

module.exports = router;