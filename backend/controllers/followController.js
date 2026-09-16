const Follow = require('../models/Follow');
const User = require('../models/User');

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check that the user exists
    const userToFollow = await User.findById(userId);

    if (!userToFollow) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Prevent following yourself
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        message: 'You cannot follow yourself',
      });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: req.user._id,
      following: userId,
    });

    if (existingFollow) {
      return res.status(400).json({
        message: 'User already followed',
      });
    }

    // Create follow relationship
    await Follow.create({
      follower: req.user._id,
      following: userId,
    });

    res.status(201).json({
      message: 'User followed successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const follow = await Follow.findOneAndDelete({
      follower: req.user._id,
      following: userId,
    });

    if (!follow) {
      return res.status(400).json({
        message: 'User is not followed',
      });
    }

    res.json({
      message: 'User unfollowed successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Check whether current user follows another user
exports.checkFollow = async (req, res) => {
  try {
    const { userId } = req.params;

    const follow = await Follow.findOne({
      follower: req.user._id,
      following: userId,
    });

    res.json({
      following: !!follow,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};