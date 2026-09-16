const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Follow = require('../models/Follow');

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
  '-password -email'
);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
const recipeCount = await Recipe.countDocuments({
  author: userId,
});
   const recipes = await Recipe.find({
  author: userId,
})
  .populate('author', 'name profileImage')
  .sort({ createdAt: -1 });

    const followersCount = await Follow.countDocuments({
      following: userId,
    });

    const followingCount = await Follow.countDocuments({
      follower: userId,
    });

   res.json({
 user: {
  _id: user._id,
  name: user.name,
  profileImage: user.profileImage,
  bio: user.bio,
  xp: user.xp,
  level: user.level,
  achievements: user.achievements,
  createdAt: user.createdAt,
},

  stats: {
    recipeCount,
    followersCount,
    followingCount,
  },

  recipes,
});
  } catch (error) {
    console.error('Get profile error:', error);

    res.status(500).json({
      message: 'Failed to fetch profile',
    });
  }
};