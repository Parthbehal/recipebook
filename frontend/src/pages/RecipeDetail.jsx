import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../context/AuthContext';

import {
  likeRecipe,
  unlikeRecipe,
  checkLikeStatus,
  saveRecipe,
  unsaveRecipe,
  checkSaveStatus,
  getRecipeReviews,
  createReview,
} from '../../services/communityService';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, token } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  // =========================================================
  // LOAD REVIEWS
  // =========================================================
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setReviewsLoading(true);

        const data = await getRecipeReviews(id);

        setReviews(data);
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [id]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://recipebook-1-gjz7.onrender.com/api/recipes/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }

        const data = await response.json();

        setRecipe(data);
      } catch (error) {
        console.error('Recipe fetch error:', error);
        toast.error('Failed to load recipe data');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // =========================================================
  // LOAD LIKE / SAVE STATE FROM BACKEND
  // =========================================================

  useEffect(() => {
    const loadCommunityState = async () => {
      // User is not logged in
      if (!token) {
        setLiked(false);
        setSaved(false);
        return;
      }

      try {
        const [likeStatus, saveStatus] = await Promise.all([
          checkLikeStatus(id, token),
          checkSaveStatus(id, token),
        ]);

        setLiked(likeStatus.liked);
        setSaved(saveStatus.saved);
      } catch (error) {
        console.error(
          'Failed to load like/save status:',
          error
        );
      }
    };

    loadCommunityState();
  }, [id, token]);

  // =========================================================
  // LIKE
  // =========================================================

  const toggleLike = async () => {
    // User must be logged in
    if (!user || !token) {
      toast.info('Please login to like recipes');
      navigate('/login');
      return;
    }

    try {
      if (liked) {
        const data = await unlikeRecipe(id, token);

        setLiked(false);

        setRecipe((prev) => ({
          ...prev,
          likesCount: data.likesCount,
        }));

        toast.info('Removed from liked recipes');
      } else {
        const data = await likeRecipe(id, token);

        setLiked(true);

        setRecipe((prev) => ({
          ...prev,
          likesCount: data.likesCount,
        }));

        toast.success('Recipe liked ❤️');
      }
    } catch (error) {
      console.error('Like error:', error);
      toast.error(error.message || 'Something went wrong');
    }
  };

  // =========================================================
  // SAVE
  // =========================================================

  const toggleSave = async () => {
    // User must be logged in
    if (!user || !token) {
      toast.info('Please login to save recipes');
      navigate('/login');
      return;
    }

    try {
      if (saved) {
        await unsaveRecipe(id, token);

        setSaved(false);

        toast.info('Removed from saved recipes');
      } else {
        await saveRecipe(id, token);

        setSaved(true);

        toast.success('Recipe saved 🔖');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Something went wrong');
    }
  };
// =========================================================
// CREATE REVIEW
// =========================================================

const submitReview = async () => {
  if (!user || !token) {
    toast.info('Please login to review recipes');
    navigate('/login');
    return;
  }

  if (reviewRating === 0) {
    toast.info('Please select a rating');
    return;
  }

  try {
    const newReview = await createReview(
      id,
      reviewRating,
      reviewComment,
      token
    );

    // Add the new review to the top of the list
    setReviews((prev) => [newReview, ...prev]);

    // Update review count
    setRecipe((prev) => ({
      ...prev,
      reviewCount: (prev.reviewCount || 0) + 1,
    }));

    // Clear the form
    setReviewRating(0);
    setReviewComment('');

    toast.success('Review submitted successfully! ⭐');
  } catch (error) {
    console.error('Review submission error:', error);
    toast.error(error.message || 'Failed to submit review');
  }
};
  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">

        <div className="text-center">

          <div className="text-6xl mb-4 animate-bounce">
            🍳
          </div>

          <p className="text-lg font-semibold text-gray-700">
            Preparing your recipe...
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Just a moment
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // NOT FOUND
  // =========================================================

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-5">

        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-10 text-center max-w-md">

          <div className="text-6xl mb-5">
            🍽️
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Recipe not found
          </h1>

          <p className="text-gray-500 mt-2 mb-7">
            We couldn't find the recipe you're looking for.
          </p>

          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            ← Back to Recipes
          </button>

        </div>

      </div>
    );
  }

  // =========================================================
  // SAFE DATA
  // =========================================================

  const ingredients =
    Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : [];

  const instructions =
    Array.isArray(recipe.instructions)
      ? recipe.instructions
      : recipe.instructions
        ? [recipe.instructions]
        : [];

  const dietaryTags =
    Array.isArray(recipe.dietaryTags)
      ? recipe.dietaryTags
      : [];

  const image =
    recipe.image ||
    recipe.imageUrl ||
    '';

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">

      <ToastContainer
        position="top-right"
        autoClose={2500}
      />

      {/* =====================================================
          TOP NAVIGATION
      ====================================================== */}

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">

        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4">

          <div className="flex items-center justify-between">

            {/* Brand */}

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 bg-transparent border-0 p-0"
            >

              <span className="text-4xl">
                🍕
              </span>

              <span className="text-3xl font-extrabold text-orange-600 font-serif">
                ReciPedia
              </span>

            </button>

            {/* Back */}

            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-orange-600 font-medium transition"
            >
              ← Back
            </button>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-12">

        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">

          <button
            onClick={() => navigate('/')}
            className="hover:text-orange-600 transition"
          >
            Home
          </button>

          <span>›</span>

          <span className="text-gray-600">
            {recipe.category || 'Recipe'}
          </span>

        </div>

        {/* ===================================================
            HERO CARD
        ==================================================== */}

        <section className="bg-white rounded-3xl overflow-hidden shadow-xl border border-orange-100">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* IMAGE */}

            <div className="relative min-h-[360px] lg:min-h-[500px] bg-gradient-to-br from-orange-100 to-orange-50">

              {image ? (
                <img
                  src={image}
                  alt={recipe.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="text-center">

                    <div className="text-8xl mb-4">
                      🍽️
                    </div>

                    <p className="text-orange-600 font-bold text-xl">
                      ReciPedia
                    </p>

                  </div>

                </div>
              )}

              {/* Image overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

              {/* Category */}

              {recipe.category && (
                <div className="absolute top-5 left-5">

                  <span className="bg-white/95 backdrop-blur-sm text-orange-600 font-bold text-sm px-4 py-2 rounded-full shadow-md">
                    {recipe.category}
                  </span>

                </div>
              )}

            </div>

            {/* RECIPE INTRO */}

            <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-center">

              {/* Cuisine */}

              {recipe.cuisine && (
                <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-3">
                  {recipe.cuisine} Cuisine
                </p>
              )}

              {/* Title */}

              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                {recipe.title}
              </h1>

              {/* Description */}

              <p className="text-gray-600 text-lg leading-relaxed mt-5">
                {recipe.description ||
                  'A delicious recipe from the ReciPedia community.'}
              </p>

              {/* Rating */}

              <div className="flex items-center gap-2 mt-6">

                <span className="text-yellow-500 text-xl">
                  ★
                </span>

                <span className="font-bold text-gray-900">
                  {recipe.rating
                    ? recipe.rating.toFixed(1)
                    : 'New'}
                </span>

                {recipe.reviewCount > 0 && (
                  <span className="text-gray-400">
                    ({recipe.reviewCount} reviews)
                  </span>
                )}

              </div>

              {/* Meta */}

              <div className="grid grid-cols-3 gap-3 mt-7">

                <div className="bg-orange-50 rounded-2xl p-4 text-center">

                  <div className="text-xl mb-1">
                    ⏱️
                  </div>

                  <p className="text-xs text-gray-400">
                    Time
                  </p>

                  <p className="font-bold text-gray-800 text-sm mt-1">
                    {recipe.cookingTime || 0} min
                  </p>

                </div>

                <div className="bg-orange-50 rounded-2xl p-4 text-center">

                  <div className="text-xl mb-1">
                    👨‍🍳
                  </div>

                  <p className="text-xs text-gray-400">
                    Difficulty
                  </p>

                  <p className="font-bold text-gray-800 text-sm mt-1">
                    {recipe.difficulty || 'Easy'}
                  </p>

                </div>

                <div className="bg-orange-50 rounded-2xl p-4 text-center">

                  <div className="text-xl mb-1">
                    🍽️
                  </div>

                  <p className="text-xs text-gray-400">
                    Servings
                  </p>

                  <p className="font-bold text-gray-800 text-sm mt-1">
                    {recipe.servings || 1}
                  </p>

                </div>

              </div>

              {/* Actions */}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">

                <button
                  type="button"
                  onClick={toggleLike}
                  className={`flex-1 py-3.5 rounded-xl font-semibold transition ${
                    liked
                      ? 'bg-red-50 text-red-500 border border-red-100'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  {liked ? '❤️ Liked' : '♡ Like Recipe'}
                </button>

                <button
                  type="button"
                  onClick={toggleSave}
                  className={`flex-1 py-3.5 rounded-xl font-semibold transition border ${
                    saved
                      ? 'bg-orange-50 text-orange-600 border-orange-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600'
                  }`}
                >
                  {saved ? '🔖 Saved' : '🔖 Save Recipe'}
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            AUTHOR
        ==================================================== */}

        <section className="mt-8 bg-white rounded-3xl border border-orange-100 shadow-sm p-6 md:p-7">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
              👨‍🍳
            </div>

            <div>

              <p className="text-xs text-gray-400">
                Recipe created by
              </p>

              <h3 className="text-lg font-bold text-gray-900">
                {recipe.author?.name || 'ReciPedia Chef'}
              </h3>

              <p className="text-sm text-gray-500">
                Part of the ReciPedia community
              </p>

            </div>

          </div>

        </section>

        {/* ===================================================
            RECIPE CONTENT
        ==================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* =================================================
              INGREDIENTS
          ================================================== */}

          <section className="lg:col-span-1 bg-white rounded-3xl border border-orange-100 shadow-sm p-6 md:p-7 h-fit">

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
                  What you'll need
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  Ingredients
                </h2>

              </div>

              <span className="bg-orange-50 text-orange-600 font-semibold text-sm px-3 py-1.5 rounded-full">
                {ingredients.length}
              </span>

            </div>

            {ingredients.length > 0 ? (
              <ul className="space-y-3">

                {ingredients.map((ingredient, index) => (

                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >

                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0" />

                    <span className="leading-relaxed">
                      {ingredient}
                    </span>

                  </li>

                ))}

              </ul>
            ) : (
              <p className="text-gray-500">
                No ingredients listed.
              </p>
            )}

          </section>

          {/* =================================================
              INSTRUCTIONS
          ================================================== */}

          <section className="lg:col-span-2 bg-white rounded-3xl border border-orange-100 shadow-sm p-6 md:p-7">

            <div className="mb-7">

              <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
                How to make it
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                Instructions
              </h2>

            </div>

            {instructions.length > 0 ? (
              <div className="space-y-6">

                {instructions.map((step, index) => (

                  <div
                    key={index}
                    className="flex gap-4"
                  >

                    <div className="shrink-0 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>

                    <div className="pt-1">

                      <p className="font-semibold text-gray-900 mb-1">
                        Step {index + 1}
                      </p>

                      <p className="text-gray-600 leading-relaxed">
                        {step}
                      </p>

                    </div>

                  </div>

                ))}

              </div>
            ) : (
              <p className="text-gray-500">
                No instructions provided.
              </p>
            )}

          </section>

        </div>

        {/* ===================================================
            DIETARY TAGS
        ==================================================== */}

        {dietaryTags.length > 0 && (
          <section className="mt-8 bg-white rounded-3xl border border-orange-100 shadow-sm p-6 md:p-7">

            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-3">
              Dietary information
            </p>

            <div className="flex flex-wrap gap-2">

              {dietaryTags.map((tag, index) => (

                <span
                  key={index}
                  className="bg-orange-50 text-orange-700 border border-orange-100 px-4 py-2 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>

              ))}

            </div>

          </section>
        )}

        {/* ===================================================
            REVIEWS
        ==================================================== */}

        <section className="mt-8 bg-white rounded-3xl p-7 md:p-9 shadow-lg border border-orange-100">

          <div className="flex items-center justify-between mb-6">

            <div>

              <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
                Community
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                Reviews
              </h2>

            </div>

            <div className="text-right">

              <p className="text-2xl font-bold text-orange-500">
                {recipe?.reviewCount || 0}
              </p>

              <p className="text-sm text-gray-500">
                {recipe?.reviewCount === 1 ? 'Review' : 'Reviews'}
              </p>

            </div>

          </div>

          {/* WRITE A REVIEW */}

          {token && (
            <div className="mb-8 bg-orange-50 rounded-2xl p-5 md:p-6">

              <h3 className="text-lg font-bold text-gray-900">
                Write a Review
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Share your experience with this recipe.
              </p>

              {/* Star Rating */}

              <div className="mt-4">

                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Your Rating
                </p>

                <div className="flex gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`text-3xl transition ${
                        star <= reviewRating
                          ? 'text-yellow-400'
                          : 'text-gray-300 hover:text-yellow-300'
                      }`}
                    >
                      ★
                    </button>

                  ))}

                </div>

              </div>

              {/* Comment */}

              <div className="mt-4">

                <label className="text-sm font-semibold text-gray-700">
                  Your Review
                </label>

                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us what you think about this recipe..."
                  maxLength={500}
                  rows={4}
                  className="w-full mt-2 border border-orange-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
                />

              </div>

            <button
  type="button"
  onClick={submitReview}
  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
>
  Submit Review
</button>

            </div>
          )}

          {/* EXISTING REVIEWS */}

          {reviewsLoading ? (
            <div className="py-8 text-center text-gray-500">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-8 text-center">

              <p className="text-gray-500">
                No reviews yet.
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Be the first to review this recipe!
              </p>

            </div>
          ) : (
            <div className="space-y-5">

              {reviews.map((review) => (

                <div
                  key={review._id}
                  className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
                >

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <p className="font-semibold text-gray-900">
                        {review.user?.name || 'Anonymous User'}
                      </p>

                      <div className="flex items-center gap-1 mt-1">

                        {[1, 2, 3, 4, 5].map((star) => (

                          <span
                            key={star}
                            className={
                              star <= review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }
                          >
                            ★
                          </span>

                        ))}

                      </div>

                    </div>

                    <p className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                  {review.comment && (
                    <p className="text-gray-600 mt-3 leading-relaxed">
                      {review.comment}
                    </p>
                  )}

                </div>

              ))}

            </div>
          )}

        </section>

        {/* ===================================================
            BACK BUTTON
        ==================================================== */}

        <div className="flex justify-center mt-10">

          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-orange-600 font-medium transition"
          >
            ← Back to Recipes
          </button>

        </div>

      </main>

    </div>
  );
};

export default RecipeDetails;