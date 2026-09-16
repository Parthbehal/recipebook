const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same user from liking the same recipe more than once
likeSchema.index(
  { user: 1, recipe: 1 },
  { unique: true }
);

module.exports = mongoose.model('Like', likeSchema);