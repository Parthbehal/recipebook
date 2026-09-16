const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema(
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

// Prevent the same user from saving the same recipe more than once
saveSchema.index(
  { user: 1, recipe: 1 },
  { unique: true }
);

module.exports = mongoose.model('Save', saveSchema);
