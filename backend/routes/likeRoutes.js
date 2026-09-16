const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');
const { protect } = require('../controllers/middlewre/authMiddleware');

router.post('/:recipeId', protect, likeController.likeRecipe);

router.delete('/:recipeId', protect, likeController.unlikeRecipe);

router.get('/:recipeId/status', protect, likeController.checkLike);

module.exports = router;