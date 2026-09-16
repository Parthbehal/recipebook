const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      default: '',
      maxlength: 200,
    },

    xp: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 1,
    },
    achievements: [
  {
    type: String,
  },
],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);