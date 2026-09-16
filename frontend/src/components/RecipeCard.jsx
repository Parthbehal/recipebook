import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import {
  likeRecipe,
  unlikeRecipe,
  checkLikeStatus,
} from '../../services/communityService';

function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);

  const { user, token } = useAuth();

  // Check like status from backend
  useEffect(() => {
    const loadLikeStatus = async () => {
      if (!token) {
        setLiked(false);
        return;
      }

      try {
        const data = await checkLikeStatus(recipe._id, token);
        setLiked(data.liked);
      } catch (error) {
        console.error('Failed to load like status:', error);
      }
    };

    loadLikeStatus();
  }, [recipe._id, token]);

  // Like / Unlike recipe
  const toggleLike = async () => {
    if (!user || !token) {
      return;
    }

    try {
      if (liked) {
        await unlikeRecipe(recipe._id, token);
        setLiked(false);
      } else {
        await likeRecipe(recipe._id, token);
        setLiked(true);
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions.join(' ')
    : recipe.instructions || '';

  const description =
    recipe.description ||
    'A delicious recipe waiting to be discovered.';

  const image =
    recipe.image ||
    recipe.imageUrl ||
    '';

  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">

      {/* =========================
          IMAGE
      ========================== */}

      <div className="relative h-60 overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50">

        {image ? (
          <img
            src={image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">
                🍽️
              </div>

              <p className="text-orange-600 font-semibold">
                ReciPedia
              </p>
            </div>
          </div>
        )}

        {/* Image Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Category */}

        {recipe.category && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/95 backdrop-blur-sm text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {recipe.category}
            </span>
          </div>
        )}

        {/* Like Button */}

        <button
          type="button"
          onClick={toggleLike}
          aria-label={liked ? 'Unlike recipe' : 'Like recipe'}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform duration-200 border-0"
        >
          <span className="text-xl">
            {liked ? '❤️' : '♡'}
          </span>
        </button>

      </div>

      {/* =========================
          CONTENT
      ========================== */}

      <div className="p-5 flex flex-col flex-1">

        {/* Title */}

        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">
            {recipe.title}
          </h3>
        </div>

        {/* Description */}

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* =========================
            RECIPE META
        ========================== */}

        <div className="flex flex-wrap items-center gap-2 mb-5">

          {recipe.cookingTime > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
              ⏱️ {recipe.cookingTime} min
            </span>
          )}

          {recipe.difficulty && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
              👨‍🍳 {recipe.difficulty}
            </span>
          )}

          {recipe.servings > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
              🍽️ {recipe.servings}
            </span>
          )}

        </div>

        {/* Rating */}

        <div className="flex items-center justify-between mb-5">

          <div className="flex items-center gap-1.5">

            <span className="text-yellow-500">
              ★
            </span>

            <span className="text-sm font-semibold text-gray-800">
              {recipe.rating
                ? recipe.rating.toFixed(1)
                : 'New'}
            </span>

            {recipe.reviewCount > 0 && (
              <span className="text-xs text-gray-400">
                ({recipe.reviewCount})
              </span>
            )}

          </div>

          {recipe.cuisine && (
            <span className="text-xs text-gray-400 font-medium">
              {recipe.cuisine}
            </span>
          )}

        </div>

        {/* Divider */}

        <div className="border-t border-gray-100 mb-4" />

        {/* =========================
            AUTHOR
        ========================== */}

        <div className="flex items-center justify-between mb-5">

          <div className="flex items-center gap-2.5">

            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm">
              👨‍🍳
            </div>

            <div>

              <p className="text-xs text-gray-400">
                Recipe by
              </p>

              <p className="text-sm font-semibold text-gray-700">
                {recipe.author?.name || 'ReciPedia Chef'}
              </p>

            </div>

          </div>

        </div>

        {/* =========================
            BUTTON
        ========================== */}

        <Link
          to={`/recipes/${recipe._id}`}
          className="mt-auto block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-center py-3 rounded-xl transition-all duration-200 hover:shadow-md"
        >
          View Recipe →
        </Link>

      </div>

    </article>
  );
}

export default RecipeCard;