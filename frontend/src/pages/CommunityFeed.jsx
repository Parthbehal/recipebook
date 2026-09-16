import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import {
  likeRecipe,
  unlikeRecipe,
  checkLikeStatus,
  saveRecipe,
  unsaveRecipe,
  checkSaveStatus,
} from '../../services/communityService';

const CommunityFeed = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, token } = useAuth();

  const [likedRecipes, setLikedRecipes] = useState({});
  const [savedRecipes, setSavedRecipes] = useState({});

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLike = async (recipeId) => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    try {
      if (likedRecipes[recipeId]) {
        await unlikeRecipe(recipeId, token);

        setLikedRecipes((prev) => ({
          ...prev,
          [recipeId]: false,
        }));

        setRecipes((prev) =>
          prev.map((recipe) =>
            recipe._id === recipeId
              ? {
                  ...recipe,
                  likesCount: Math.max(
                    (recipe.likesCount || 0) - 1,
                    0
                  ),
                }
              : recipe
          )
        );
      } else {
        await likeRecipe(recipeId, token);

        setLikedRecipes((prev) => ({
          ...prev,
          [recipeId]: true,
        }));

        setRecipes((prev) =>
          prev.map((recipe) =>
            recipe._id === recipeId
              ? {
                  ...recipe,
                  likesCount: (recipe.likesCount || 0) + 1,
                }
              : recipe
          )
        );
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleSave = async (recipeId) => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    try {
      if (savedRecipes[recipeId]) {
        await unsaveRecipe(recipeId, token);

        setSavedRecipes((prev) => ({
          ...prev,
          [recipeId]: false,
        }));
      } else {
        await saveRecipe(recipeId, token);

        setSavedRecipes((prev) => ({
          ...prev,
          [recipeId]: true,
        }));
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  useEffect(() => {
    const fetchCommunityFeed = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'http://localhost:3000/api/recipes/feed'
        );

        if (!response.ok) {
          throw new Error('Failed to load community feed');
        }

        const data = await response.json();

        setRecipes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Community feed error:', error);
        setError('Failed to load community feed');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityFeed();
  }, []);

  useEffect(() => {
    const loadInteractionStatus = async () => {
      if (!token || recipes.length === 0) return;

      try {
        const liked = {};
        const saved = {};

        for (const recipe of recipes) {
          try {
            const likeStatus = await checkLikeStatus(
              recipe._id,
              token
            );

            liked[recipe._id] = likeStatus.liked;
          } catch (error) {
            liked[recipe._id] = false;
          }

          try {
            const saveStatus = await checkSaveStatus(
              recipe._id,
              token
            );

            saved[recipe._id] = saveStatus.saved;
          } catch (error) {
            saved[recipe._id] = false;
          }
        }

        setLikedRecipes(liked);
        setSavedRecipes(saved);
      } catch (error) {
        console.error(
          'Failed to load interaction status:',
          error
        );
      }
    };

    loadInteractionStatus();
  }, [token, recipes]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">
            🍳
          </div>

          <p className="text-lg font-semibold text-gray-700">
            Loading community...
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Discovering what everyone is cooking
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 sm:p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-5">
            😕
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="text-gray-500 mt-2 mb-7">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-3 md:py-4">

          <div className="flex items-center justify-between gap-4">

            {/* Brand */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 md:gap-3 bg-transparent border-0 p-0"
              aria-label="Go to ReciPedia home"
            >
              <span className="text-3xl md:text-4xl">
                🍕
              </span>

              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-600 font-serif tracking-tight">
                ReciPedia
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7">

              <button
                onClick={() => navigate('/')}
                className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Home
              </button>

              <button
                onClick={() => navigate('/trending')}
                className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Trending
              </button>

              <button
                onClick={() => navigate('/todays-special')}
                className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Today's Special
              </button>

              {user && (
                <>
                  <button
                    onClick={() => navigate('/my-recipes')}
                    className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
                  >
                    My Recipes
                  </button>

                  <button
                    onClick={() => navigate('/saved-recipes')}
                    className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
                  >
                    Saved
                  </button>
                </>
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <button
                    onClick={() => navigate(`/profile/${user?._id}`)}
                    className="hidden lg:block text-right hover:opacity-80 transition"
                  >
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Level {user?.level || 1}
                    </p>
                  </button>

                  <button
                    onClick={() => navigate('/add')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-xl transition"
                  >
                    + Add Recipe
                  </button>

                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 py-2.5 rounded-xl transition"
                  >
                    Home
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/add')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-xl transition"
                  >
                    + Add Recipe
                  </button>

                  <button
                    onClick={() => navigate('/login')}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-2.5 rounded-xl transition"
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">

              {user && (
                <button
                  onClick={() => navigate(`/profile/${user?._id}`)}
                  className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold hover:bg-orange-100 transition"
                  aria-label="Open profile"
                  title="Profile"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || '👤'}
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl hover:bg-orange-100 transition"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-orange-100">
              <div className="flex flex-col gap-1.5">

                <button
                  onClick={() => {
                    navigate('/');
                    closeMobileMenu();
                  }}
                  className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                >
                  🏠 Home
                </button>

                <button
                  onClick={() => {
                    navigate('/trending');
                    closeMobileMenu();
                  }}
                  className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                >
                  🔥 Trending
                </button>

                <button
                  onClick={() => {
                    navigate('/todays-special');
                    closeMobileMenu();
                  }}
                  className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                >
                  ✨ Today's Special
                </button>

                {user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate('/my-recipes');
                        closeMobileMenu();
                      }}
                      className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                    >
                      📖 My Recipes
                    </button>

                    <button
                      onClick={() => {
                        navigate('/saved-recipes');
                        closeMobileMenu();
                      }}
                      className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                    >
                      🔖 Saved Recipes
                    </button>

                    <button
                      onClick={() => {
                        navigate(`/profile/${user?._id}`);
                        closeMobileMenu();
                      }}
                      className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                    >
                      👤 Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate('/add');
                        closeMobileMenu();
                      }}
                      className="mt-2 text-left px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                    >
                      + Add Recipe
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/login');
                      closeMobileMenu();
                    }}
                    className="mt-2 text-left px-4 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold transition"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 sm:px-5 md:px-8 py-8 md:py-14">

        {/* PAGE HEADER */}
        <div className="text-center mb-8 md:mb-10">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
            Cook • Share • Discover
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Community
          </h1>

          <p className="text-gray-600 text-base md:text-lg mt-3 max-w-2xl mx-auto">
            Discover what the ReciPedia community is cooking and
            get inspired for your next meal.
          </p>
        </div>

        {/* EMPTY STATE */}
        {recipes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8 sm:p-10 text-center">
            <div className="text-6xl mb-5">
              🍽️
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              No recipes yet
            </h2>

            <p className="text-gray-500 mt-2">
              Be the first person to share a recipe with the community.
            </p>

            <button
              onClick={() => navigate('/add')}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Add a Recipe
            </button>
          </div>
        ) : (

          /* RECIPE FEED */
          <div className="space-y-6 md:space-y-7">
            {recipes.map((recipe) => (
              <article
                key={recipe._id}
                className="bg-white rounded-3xl border border-orange-100 shadow-sm hover:shadow-lg transition overflow-hidden"
              >

                {/* AUTHOR */}
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                        {recipe.author?.profileImage ? (
                          <img
                            src={recipe.author.profileImage}
                            alt={recipe.author.name || 'Chef'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          '👨‍🍳'
                        )}
                      </div>

                      <div className="min-w-0">
                        {recipe.author?._id ? (
                          <button
                            onClick={() =>
                              navigate(`/profile/${recipe.author._id}`)
                            }
                            className="font-semibold text-gray-900 hover:text-orange-600 transition truncate max-w-[220px] sm:max-w-none block"
                          >
                            {recipe.author?.name || 'ReciPedia Chef'}
                          </button>
                        ) : (
                          <p className="font-semibold text-gray-900">
                            {recipe.author?.name || 'ReciPedia Chef'}
                          </p>
                        )}

                        <p className="text-xs sm:text-sm text-gray-400">
                          Shared {new Date(recipe.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/recipes/${recipe._id}`)}
                      className="text-sm font-semibold text-orange-600 hover:text-orange-700 shrink-0"
                    >
                      View →
                    </button>
                  </div>
                </div>

                {/* RECIPE IMAGE */}
                {(recipe.image || recipe.imageUrl) && (
                  <div className="w-full h-56 sm:h-64 md:h-80 bg-orange-50">
                    <img
                      src={recipe.image || recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* RECIPE CONTENT */}
                <div className="p-4 sm:p-5 md:p-6">

                  {recipe.category && (
                    <span className="inline-block bg-orange-50 text-orange-600 font-semibold text-xs px-3 py-1.5 rounded-full mb-3">
                      {recipe.category}
                    </span>
                  )}

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {recipe.title}
                  </h2>

                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {recipe.description ||
                      'A delicious recipe from the ReciPedia community.'}
                  </p>

                  {/* STATS */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>

                      <span className="font-semibold text-gray-700">
                        {recipe.rating
                          ? recipe.rating.toFixed(1)
                          : 'New'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500">
                      <span>❤️</span>
                      <span>{recipe.likesCount || 0} likes</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500">
                      <span>💬</span>
                      <span>{recipe.reviewCount || 0} reviews</span>
                    </div>
                  </div>

                  {/* LIKE + SAVE */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">

                    <button
                      onClick={() => handleLike(recipe._id)}
                      className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold transition ${
                        likedRecipes[recipe._id]
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      {likedRecipes[recipe._id]
                        ? '❤️ Liked'
                        : '🤍 Like'}
                    </button>

                    <button
                      onClick={() => handleSave(recipe._id)}
                      className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold transition ${
                        savedRecipes[recipe._id]
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                      }`}
                    >
                      {savedRecipes[recipe._id]
                        ? '🔖 Saved'
                        : '🔖 Save'}
                    </button>
                  </div>

                  {/* VIEW RECIPE */}
                  <button
                    onClick={() => navigate(`/recipes/${recipe._id}`)}
                    className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition"
                  >
                    View Recipe →
                  </button>

                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default CommunityFeed;