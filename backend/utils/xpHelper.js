const addXP = async (user, amount) => {
  user.xp += amount;

  // Every 100 XP = 1 level
  user.level = Math.floor(user.xp / 100) + 1;

  await user.save();

  return user;
};

module.exports = addXP;