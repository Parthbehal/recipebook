import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Trending = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleAddRecipe = () => {
    if (isLoggedIn) {
      navigate('/add');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'http://localhost:3000/api/recipes/trending'
        );

        if (!response.ok) {
          throw new Error('Failed to load trending recipes');
        }

        const data = await response.json();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Trending error:', error);
        setError('Failed to load trending recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">
            🔥
          </div>

          <p className="text-lg font-semibold text-gray-700">
            Loading trending recipes...
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Finding what the community loves
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
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">

              <button
                onClick={() => navigate('/')}
                className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Home
              </button>

              <button
                onClick={() => navigate('/community')}
                className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Community
              </button>

              <button
                onClick={() => navigate('/todays-special')}
                className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Today's Special
              </button>

              {isLoggedIn && (
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

              <button
                onClick={handleAddRecipe}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 lg:px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition"
              >
                + Add Recipe
              </button>

              {isLoggedIn ? (
                <div className="flex items-center gap-3">

                  <button
                    onClick={() => navigate(`/profile/${user?._id}`)}
                    className="hidden xl:block text-right hover:opacity-80 transition"
                    aria-label="Open profile"
                  >
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Level {user?.level || 1}
                    </p>
                  </button>

                  <button
                    onClick={logout}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 py-2.5 rounded-xl transition"
                  >
                    Logout
                  </button>

                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-2.5 rounded-xl transition"
                >
                  Login
                </button>
              )}

            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">

              {isLoggedIn && (
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
                    navigate('/community');
                    closeMobileMenu();
                  }}
                  className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                >
                  👥 Community
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

                {isLoggedIn ? (
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

                    <button
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="text-left px-4 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold transition"
                    >
                      Logout
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
      <main className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 py-8 md:py-14">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-10">

          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
            Most Loved by the Community
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            🔥 Trending Recipes
          </h1>

          <p className="text-gray-600 text-base md:text-lg mt-3 max-w-2xl mx-auto">
            Discover the recipes everyone is loving right now.
          </p>

        </div>

        {/* RECIPES */}
        {recipes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8 sm:p-10 text-center">

            <div className="text-6xl mb-5">
              🍽️
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              No trending recipes yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Start sharing and enjoying recipes to get the community
              trending!
            </p>

            <button
              onClick={handleAddRecipe}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Share a Recipe
            </button>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">

            {recipes.map((recipe) => (
              <article
                key={recipe._id}
                className="bg-white rounded-3xl border border-orange-100 shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
              >

                {/* IMAGE */}
                {(recipe.image || recipe.imageUrl) && (
                  <div className="h-56 sm:h-60 bg-orange-50">
                    <img
                      src={recipe.image || recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">

                  {/* AUTHOR */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden shrink-0">
                      {recipe.author?.profileImage ? (
                        <img
                          src={recipe.author.profileImage}
                          alt={recipe.author.name || 'Chef'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>👨‍🍳</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      {recipe.author?._id ? (
                        <button
                          onClick={() =>
                            navigate(`/profile/${recipe.author._id}`)
                          }
                          className="font-semibold text-gray-800 hover:text-orange-600 transition truncate block max-w-full"
                        >
                          {recipe.author.name || 'ReciPedia Chef'}
                        </button>
                      ) : (
                        <p className="font-semibold text-gray-800">
                          {recipe.author?.name || 'ReciPedia Chef'}
                        </p>
                      )}

                      <p className="text-xs text-gray-400">
                        ReciPedia Chef
                      </p>
                    </div>
                  </div>

                  {recipe.category && (
                    <span className="self-start inline-block bg-orange-50 text-orange-600 font-semibold text-xs px-3 py-1.5 rounded-full mb-3">
                      {recipe.category}
                    </span>
                  )}

                  <h2 className="text-xl font-bold text-gray-900">
                    {recipe.title}
                  </h2>

                  <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-2">
                    {recipe.description ||
                      'A delicious recipe from the ReciPedia community.'}
                  </p>

                  {/* STATS */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm">
                    <span className="text-gray-500">
                      ❤️ {recipe.likesCount || 0} likes
                    </span>

                    <span className="text-gray-500">
                      💬 {recipe.reviewCount || 0} reviews
                    </span>

                    {recipe.rating > 0 && (
                      <span className="text-gray-500">
                        ⭐ {recipe.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/recipes/${recipe._id}`)
                    }
                    className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
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

export default Trending;