import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'http://localhost:3000/api/leaderboard'
        );

        if (!response.ok) {
          throw new Error('Failed to load leaderboard');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Leaderboard error:', error);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-3 md:py-4">

          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 md:gap-3"
            >
              <span className="text-3xl md:text-4xl">🍕</span>

              <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-serif">
                ReciPedia
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">

              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Home
              </button>

              <button
                onClick={() => navigate('/community')}
                className="text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Community
              </button>

              <button
                onClick={() => navigate('/trending')}
                className="text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Trending
              </button>

              <button
                onClick={() => navigate('/todays-special')}
                className="text-gray-700 hover:text-orange-600 font-medium transition"
              >
                Today's Special
              </button>

              {isLoggedIn && (
                <>
                  <button
                    onClick={() => navigate('/my-recipes')}
                    className="text-gray-700 hover:text-orange-600 font-medium transition"
                  >
                    My Recipes
                  </button>

                  <button
                    onClick={() => navigate('/saved-recipes')}
                    className="text-gray-700 hover:text-orange-600 font-medium transition"
                  >
                    Saved
                  </button>
                </>
              )}

            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">

              <button
                onClick={() =>
                  navigate(isLoggedIn ? '/add' : '/login')
                }
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-xl transition"
              >
                + Add Recipe
              </button>

              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate(`/profile/${user?._id}`)}
                    className="hidden xl:block text-sm font-semibold text-gray-800 hover:text-orange-600 transition"
                  >
                    {user?.name}
                  </button>

                  <button
                    onClick={logout}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 py-2.5 rounded-xl transition"
                  >
                    Logout
                  </button>
                </>
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
                  className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 font-bold flex items-center justify-center"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || '👤'}
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 text-xl"
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
                  onClick={() => navigate('/')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-orange-50"
                >
                  🏠 Home
                </button>

                <button
                  onClick={() => navigate('/community')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-orange-50"
                >
                  👥 Community
                </button>

                <button
                  onClick={() => navigate('/trending')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-orange-50"
                >
                  🔥 Trending
                </button>

                <button
                  onClick={() => navigate('/todays-special')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-orange-50"
                >
                  🍽️ Today's Special
                </button>

                {isLoggedIn && (
                  <>
                    <button
                      onClick={() => navigate('/my-recipes')}
                      className="text-left px-4 py-3 rounded-xl hover:bg-orange-50"
                    >
                      📖 My Recipes
                    </button>

                    <button
                      onClick={() => navigate('/saved-recipes')}
                      className="text-left px-4 py-3 rounded-xl hover:bg-orange-50"
                    >
                      🔖 Saved Recipes
                    </button>

                    <button
                      onClick={() => navigate(`/profile/${user?._id}`)}
                      className="text-left px-4 py-3 rounded-xl hover:bg-orange-50"
                    >
                      👤 Profile
                    </button>

                    <button
                      onClick={() => navigate('/add')}
                      className="mt-2 text-left px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold"
                    >
                      + Add Recipe
                    </button>

                    <button
                      onClick={logout}
                      className="text-left px-4 py-3 rounded-xl bg-gray-900 text-white font-semibold"
                    >
                      Logout
                    </button>
                  </>
                )}

                {!isLoggedIn && (
                  <button
                    onClick={() => navigate('/login')}
                    className="mt-2 text-left px-4 py-3 rounded-xl bg-gray-900 text-white font-semibold"
                  >
                    Login
                  </button>
                )}

              </div>
            </div>
          )}

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-4 sm:px-5 md:px-8 py-10 md:py-14">

        {/* HEADER */}
        <div className="text-center mb-10">

          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
            ReciPedia Community
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            🏆 Leaderboard
          </h1>

          <p className="text-gray-600 text-base md:text-lg mt-3">
            See the top recipe creators in the community.
          </p>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-3xl border border-orange-100 shadow-lg p-10 text-center">

            <div className="text-5xl mb-4 animate-bounce">
              🏆
            </div>

            <p className="font-semibold text-gray-700">
              Loading leaderboard...
            </p>

          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="bg-white rounded-3xl border border-orange-100 shadow-lg p-10 text-center">

            <div className="text-5xl mb-4">
              😕
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Something went wrong
            </h2>

            <p className="text-gray-500 mt-2">
              {error}
            </p>

          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && users.length === 0 && (
          <div className="bg-white rounded-3xl border border-orange-100 shadow-lg p-10 text-center">

            <div className="text-5xl mb-4">
              🍳
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No users yet
            </h2>

            <p className="text-gray-500 mt-2">
              Start sharing recipes to appear on the leaderboard.
            </p>

          </div>
        )}

        {/* LEADERBOARD */}
        {!loading && !error && users.length > 0 && (
          <div className="bg-white rounded-3xl border border-orange-100 shadow-xl overflow-hidden">

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-orange-50 border-b border-orange-100 text-sm font-semibold text-gray-500">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Chef</div>
              <div className="col-span-2 text-center">Level</div>
              <div className="col-span-2 text-center">XP</div>
              <div className="col-span-2 text-center">Recipes</div>
            </div>

            <div className="divide-y divide-orange-50">

              {users.map((item) => (
                <div
                  key={item._id}
                  className="px-4 sm:px-6 py-5 hover:bg-orange-50/50 transition"
                >

                  {/* Desktop */}
                  <div className="hidden sm:grid grid-cols-12 gap-4 items-center">

                    <div className="col-span-1">
                      <span className="text-lg font-bold text-gray-700">
                        {item.rank === 1
                          ? '🥇'
                          : item.rank === 2
                          ? '🥈'
                          : item.rank === 3
                          ? '🥉'
                          : `#${item.rank}`}
                      </span>
                    </div>

                    <div className="col-span-5">
                      <button
                        onClick={() =>
                          navigate(`/profile/${item._id}`)
                        }
                        className="flex items-center gap-3 text-left group"
                      >

                        <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden shrink-0">

                          {item.profileImage ? (
                            <img
                              src={item.profileImage}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-lg">
                              👨‍🍳
                            </span>
                          )}

                        </div>

                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-orange-600 transition">
                            {item.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Recipe Creator
                          </p>
                        </div>

                      </button>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="font-semibold text-orange-600">
                        Level {item.level}
                      </span>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="font-bold text-gray-800">
                        {item.xp} XP
                      </span>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="font-semibold text-gray-700">
                        {item.recipeCount}
                      </span>
                    </div>

                  </div>

                  {/* Mobile */}
                  <div className="sm:hidden">

                    <div className="flex items-center gap-3">

                      <div className="w-10 text-center">
                        <span className="text-lg font-bold">
                          {item.rank === 1
                            ? '🥇'
                            : item.rank === 2
                            ? '🥈'
                            : item.rank === 3
                            ? '🥉'
                            : `#${item.rank}`}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          navigate(`/profile/${item._id}`)
                        }
                        className="flex items-center gap-3 text-left flex-1 min-w-0"
                      >

                        <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden shrink-0">

                          {item.profileImage ? (
                            <img
                              src={item.profileImage}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            '👨‍🍳'
                          )}

                        </div>

                        <div className="min-w-0">

                          <p className="font-bold text-gray-900 truncate">
                            {item.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Level {item.level}
                          </p>

                        </div>

                      </button>

                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 ml-12">

                      <div className="bg-orange-50 rounded-xl px-3 py-2">
                        <p className="text-xs text-gray-400">
                          XP
                        </p>

                        <p className="font-bold text-gray-800">
                          {item.xp}
                        </p>
                      </div>

                      <div className="bg-orange-50 rounded-xl px-3 py-2">
                        <p className="text-xs text-gray-400">
                          Recipes
                        </p>

                        <p className="font-bold text-gray-800">
                          {item.recipeCount}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Leaderboard;