const User = require('../models/User');
const Recipe = require('../models/Recipe');

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select('name profileImage xp level')
      .sort({ xp: -1 })
      .limit(20)
      .lean();

    const leaderboard = await Promise.all(
      users.map(async (user, index) => {
        const recipeCount = await Recipe.countDocuments({
          author: user._id,
        });

        return {
          rank: index + 1,
          _id: user._id,
          name: user.name,
          profileImage: user.profileImage,
          xp: user.xp,
          level: user.level,
          recipeCount,
        };
      })
    );

    res.json(leaderboard);
  } catch (err) {
    console.error('Leaderboard error:', err);

    res.status(500).json({
      message: 'Failed to load leaderboard',
    });
  }
};