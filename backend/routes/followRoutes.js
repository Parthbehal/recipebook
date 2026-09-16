const express = require('express');
const router = express.Router();

const followController = require('../controllers/followController');
const { protect } = require('../controllers/middlewre/authMiddleware');

// Follow a user
router.post('/:userId', protect, followController.followUser);

// Unfollow a user
router.delete('/:userId', protect, followController.unfollowUser);

// Check follow status
router.get('/:userId/status', protect, followController.checkFollow);

module.exports = router;