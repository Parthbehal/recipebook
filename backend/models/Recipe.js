const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    image: {
      type: String,
      default: '',
    },

    ingredients: {
      type: [String],
      default: [],
    },

    instructions: {
      type: [String],
      required: true,
    },

    cookingTime: {
      type: Number,
      default: 0,
    },

    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy',
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    cuisine: {
      type: String,
      default: '',
      trim: true,
    },

    dietaryTags: {
      type: [String],
      default: [],
    },

    servings: {
      type: Number,
      default: 1,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    likesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);