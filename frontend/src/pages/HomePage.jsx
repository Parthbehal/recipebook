// // src/pages/Home.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import HeroSection from '../components/HeroSection';
// import SearchBar from '../components/SearchBar';
// import RecipeCard from '../components/RecipeCard';
// import CategoryFilter from '../components/CategoryFilter';
// import Aurora from '../components/Aurora';
// import { useAuth } from '../context/AuthContext';

// const Home = () => {
//   const navigate = useNavigate();
//   const { user, isLoggedIn, logout } = useAuth();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const [recipes, setRecipes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// const categories = [
//   'All',
//   'Vegan',
//   'Vegetarian',
//   'Breakfast',
//   'Dinner',
//   'Dessert',
// ];
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(
//           'http://localhost:3000/api/recipes'
//         );

//         if (!response.ok) {
//           throw new Error('Failed to fetch recipes');
//         }

//         const data = await response.json();

//         setRecipes(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error('Failed to load recipes:', error);
//         setError('Unable to load recipes right now.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const filteredRecipes = recipes.filter((recipe) => {
//     const matchesCategory =
//       selectedCategory === 'All' ||
//       recipe.category === selectedCategory;

//     const title =
//       recipe.title?.toLowerCase() || '';

//     const ingredients = Array.isArray(recipe.ingredients)
//       ? recipe.ingredients.join(' ').toLowerCase()
//       : '';

//     const query = searchQuery.toLowerCase();

//     const matchesSearch =
//       title.includes(query) ||
//       ingredients.includes(query);

//     return matchesCategory && matchesSearch;
//   });

//   const handleAddRecipe = () => {
//     if (isLoggedIn) {
//       navigate('/add');
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">

//       {/* =====================================================
//           AURORA BACKGROUND
//       ====================================================== */}
//       <div className="relative overflow-hidden">

//         <div className="absolute inset-0 pointer-events-none">
//           <Aurora
//             colorStops={['#3A29FF', '#FF94B4', '#000000']}
//             blend={0.5}
//             amplitude={1.0}
//             speed={0.5}
//           />
//         </div>

//         {/* ===================================================
//             NAVBAR
//         ==================================================== */}
//         <header className="relative z-20 sticky top-0 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">

//           <div className="max-w-7xl mx-auto px-5 md:px-8 py-4">

//             <div className="flex items-center justify-between gap-6">

//               {/* Brand */}
//               <button
//                 onClick={() => navigate('/')}
//                 className="flex items-center gap-3 bg-transparent border-0 p-0"
//               >
//                 <span className="text-4xl">
//                   🍕
//                 </span>

//                 <span className="text-3xl md:text-4xl font-extrabold text-orange-600 font-serif tracking-tight">
//                   ReciPedia
//                 </span>
//               </button>

//               {/* Desktop Navigation */}
//               <nav className="hidden md:flex items-center gap-8">

//                 <button
//                   onClick={() => window.scrollTo({
//                     top: 0,
//                     behavior: 'smooth',
//                   })}
//                   className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
//                 >
//                   Explore
//                 </button>

//                 <button
//                   onClick={() => {
//                     document
//                       .getElementById('categories')
//                       ?.scrollIntoView({
//                         behavior: 'smooth',
//                       });
//                   }}
//                   className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
//                 >
//                   Categories
//                 </button>

//        {isLoggedIn && (
//   <>
//     <button
//       onClick={() => navigate('/community')}
//       className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
//     >
//       Community
//     </button>

//     <button
//       onClick={() => navigate('/my-recipes')}
//       className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
//     >
//       My Recipes
//     </button>

//     <button
//       onClick={() => navigate('/saved-recipes')}
//       className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
//     >
//       Saved Recipes
//     </button>
//   </>
// )}

//               </nav>

//               {/* Right Actions */}
//               <div className="flex items-center gap-3">

//                 <button
//                   onClick={handleAddRecipe}
//                   className="hidden sm:block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition"
//                 >
//                   + Add Recipe
//                 </button>

//                 {isLoggedIn ? (
//   <div className="flex items-center gap-3">

//     <button
//       onClick={() => navigate(`/profile/${user?._id}`)}
//       className="hidden lg:block text-right hover:opacity-80 transition"
//     >
//       <p className="text-sm font-semibold text-gray-800">
//         {user?.name}
//       </p>

//       <p className="text-xs text-gray-500">
//         Level {user?.level || 1}
//       </p>
//     </button>

//     <button
//       onClick={logout}
//       className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 py-2.5 rounded-xl transition"
//     >
//       Logout
//     </button>
//   </div>
// ): (
//                   <button
//                     onClick={() => navigate('/login')}
//                     className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-2.5 rounded-xl transition"
//                   >
//                     Login
//                   </button>
//                 )}

//               </div>

//             </div>
//           </div>
//         </header>

//         {/* ===================================================
//             HERO
//         ==================================================== */}
//         <main className="relative z-10">

//           <section className="max-w-7xl mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-8">
//             <HeroSection />
//           </section>

//           {/* =================================================
//               FEATURED RECIPE
//           ================================================== */}
//           <section className="max-w-6xl mx-auto px-5 md:px-8 pb-12">

//             <div className="relative overflow-hidden bg-white rounded-3xl border border-orange-100 shadow-lg p-6 md:p-8">

//               <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-100 rounded-full opacity-60" />

//               <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">

//                 <div>
//                   <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full mb-3">
//                     ✨ Today's Special
//                   </span>

//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//                     A recipe worth making today
//                   </h2>

//                   <p className="mt-2 text-gray-600 max-w-2xl">
//                     Discover something delicious from the ReciPedia
//                     community and make your next meal a little more special.
//                   </p>
//                 </div>

//                <button
//   onClick={() => navigate('/todays-special')}
//   className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
// >
//   ✨ View Today's Special →
// </button>
// <button
//   onClick={() => navigate('/trending')}
//   className="shrink-0 bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold px-6 py-3 rounded-xl border border-orange-200 transition"
// >
//   🔥 Explore Trending →
// </button>

//               </div>
//             </div>

//           </section>

//           {/* =================================================
//               SEARCH + CATEGORIES
//           ================================================== */}
//           <section
//             id="categories"
//             className="max-w-6xl mx-auto px-5 md:px-8 pb-14"
//           >

//             <div className="text-center mb-8">

//               <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-2">
//                 Find your next favourite
//               </p>

//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//                 What are you craving?
//               </h2>

//               <p className="text-gray-500 mt-2">
//                 Search recipes or explore by category.
//               </p>

//             </div>

//             {/* Search */}
//             <div className="max-w-2xl mx-auto mb-7">
//               <SearchBar
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//               />
//             </div>

//             {/* Categories */}
//             <CategoryFilter
//               categories={categories}
//               selectedCategory={selectedCategory}
//               setSelectedCategory={setSelectedCategory}
//             />

//           </section>

//           {/* =================================================
//               RECIPES
//           ================================================== */}
//           <section
//             id="recipes"
//             className="max-w-7xl mx-auto px-5 md:px-8 pb-20"
//           >

//             <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">

//               <div>
//                 <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-1">
//                   Fresh from ReciPedia
//                 </p>

//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//                   Explore Recipes
//                 </h2>
//               </div>

//               {recipes.length > 0 && (
//                 <p className="text-sm text-gray-500">
//                   {filteredRecipes.length} recipe
//                   {filteredRecipes.length !== 1 ? 's' : ''} found
//                 </p>
//               )}

//             </div>

//             {/* Loading */}
//             {loading && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

//                 {[1, 2, 3].map((item) => (
//                   <div
//                     key={item}
//                     className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
//                   >
//                     <div className="h-56 bg-orange-100" />

//                     <div className="p-5 space-y-3">
//                       <div className="h-5 bg-gray-200 rounded w-3/4" />
//                       <div className="h-4 bg-gray-200 rounded w-full" />
//                       <div className="h-4 bg-gray-200 rounded w-2/3" />
//                       <div className="h-10 bg-gray-200 rounded mt-5" />
//                     </div>
//                   </div>
//                 ))}

//               </div>
//             )}

//             {/* Error */}
//             {!loading && error && (
//               <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-10 text-center">

//                 <div className="text-5xl mb-4">
//                   😕
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-800">
//                   Something went wrong
//                 </h3>

//                 <p className="text-gray-500 mt-2">
//                   {error}
//                 </p>

//               </div>
//             )}

//             {/* Recipes */}
//             {!loading && !error && filteredRecipes.length > 0 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

//                 {filteredRecipes.map((recipe) => (
//                   <RecipeCard
//                     key={recipe._id}
//                     recipe={recipe}
//                   />
//                 ))}

//               </div>
//             )}

//             {/* Empty state */}
//             {!loading &&
//               !error &&
//               filteredRecipes.length === 0 && (
//                 <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-12 text-center">

//                   <div className="text-6xl mb-5">
//                     🍳
//                   </div>

//                   <h3 className="text-2xl font-bold text-gray-800">
//                     No recipes found
//                   </h3>

//                   <p className="text-gray-500 mt-2 max-w-md mx-auto">
//                     Try another search or category. Your next favourite
//                     recipe might just be waiting to be discovered.
//                   </p>

//                   {isLoggedIn && (
//                     <button
//                       onClick={() => navigate('/add')}
//                       className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
//                     >
//                       Add the first recipe
//                     </button>
//                   )}

//                 </div>
//               )}

//           </section>

//         </main>

//       </div>

//     </div>
//   );
// };

// export default Home;




// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';
import Aurora from '../components/Aurora';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    'All',
    'Vegan',
    'Vegetarian',
    'Breakfast',
    'Dinner',
    'Dessert',
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          'http://localhost:3000/api/recipes'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();

        setRecipes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load recipes:', error);
        setError('Unable to load recipes right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      recipe.category === selectedCategory;

    const title = recipe.title?.toLowerCase() || '';

    const ingredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join(' ').toLowerCase()
      : '';

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      title.includes(query) ||
      ingredients.includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleAddRecipe = () => {
    if (isLoggedIn) {
      navigate('/add');
    } else {
      navigate('/login');
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">
      <div className="relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <Aurora
            colorStops={['#3A29FF', '#FF94B4', '#000000']}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        {/* NAVBAR */}
        <header className="relative z-20 sticky top-0 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-3 md:py-4">

            <div className="flex items-center justify-between gap-4">

              {/* Brand */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 md:gap-3 bg-transparent border-0 p-0"
                aria-label="Go to ReciPedia home"
              >
                <span className="text-3xl md:text-4xl">🍕</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-600 font-serif tracking-tight">
                  ReciPedia
                </span>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Explore
                </button>

                <button
                  onClick={() => {
                    document.getElementById('categories')?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                  className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Categories
                </button>

                {isLoggedIn && (
                  <>
                    <button
                      onClick={() => navigate('/community')}
                      className="bg-transparent border-0 p-0 text-gray-700 hover:text-orange-600 font-medium transition"
                    >
                      Community
                    </button>

<button
  onClick={() => navigate('/leaderboard')}
  className="text-gray-700 hover:text-orange-600 font-medium transition"
>
  Leaderboard
</button>


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
                      Saved Recipes
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
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      closeMobileMenu();
                    }}
                    className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                  >
                    Explore
                  </button>

                  <button
                    onClick={() => {
                      document.getElementById('categories')?.scrollIntoView({
                        behavior: 'smooth',
                      });
                      closeMobileMenu();
                    }}
                    className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                  >
                    Categories
                  </button>

                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={() => {
                          navigate('/community');
                          closeMobileMenu();
                        }}
                        className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                      >
                        Community
                      </button>

                      <button
                        onClick={() => {
                          navigate('/my-recipes');
                          closeMobileMenu();
                        }}
                        className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                      >
                        My Recipes
                      </button>

                      <button
                        onClick={() => {
                          navigate('/saved-recipes');
                          closeMobileMenu();
                        }}
                        className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                      >
                        Saved Recipes
                      </button>

                      <button
                        onClick={() => {
                          navigate(`/profile/${user?._id}`);
                          closeMobileMenu();
                        }}
                        className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                      >
                        👤 Profile{user?.name ? ` — ${user.name}` : ''}
                      </button>

                      <button
                        onClick={() => {
                          handleAddRecipe();
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

        {/* HERO */}
        <main className="relative z-10">
          <section className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 pt-8 md:pt-14 pb-8">
            <HeroSection />
          </section>

          {/* FEATURED RECIPE */}
          <section className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 pb-12">
            <div className="relative overflow-hidden bg-white rounded-3xl border border-orange-100 shadow-lg p-5 sm:p-6 md:p-8">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-100 rounded-full opacity-60" />

              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full mb-3">
                    ✨ Today's Special
                  </span>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    A recipe worth making today
                  </h2>

                  <p className="mt-2 text-gray-600 max-w-2xl">
                    Discover something delicious from the ReciPedia
                    community and make your next meal a little more special.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button
                    onClick={() => navigate('/todays-special')}
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
                  >
                    ✨ View Today's Special →
                  </button>

                  <button
                    onClick={() => navigate('/trending')}
                    className="w-full sm:w-auto bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold px-6 py-3 rounded-xl border border-orange-200 transition"
                  >
                    🔥 Explore Trending →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SEARCH + CATEGORIES */}
          <section
            id="categories"
            className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 pb-14"
          >
            <div className="text-center mb-8">
              <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-2">
                Find your next favourite
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                What are you craving?
              </h2>

              <p className="text-gray-500 mt-2">
                Search recipes or explore by category.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-7">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </section>

          {/* RECIPES */}
          <section
            id="recipes"
            className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 pb-20"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
              <div>
                <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-1">
                  Fresh from ReciPedia
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Explore Recipes
                </h2>
              </div>

              {recipes.length > 0 && (
                <p className="text-sm text-gray-500">
                  {filteredRecipes.length} recipe
                  {filteredRecipes.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
                  >
                    <div className="h-56 bg-orange-100" />

                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                      <div className="h-10 bg-gray-200 rounded mt-5" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-10 text-center">
                <div className="text-5xl mb-4">😕</div>

                <h3 className="text-xl font-bold text-gray-800">
                  Something went wrong
                </h3>

                <p className="text-gray-500 mt-2">
                  {error}
                </p>
              </div>
            )}

            {/* Recipes */}
            {!loading && !error && filteredRecipes.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                  />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading &&
              !error &&
              filteredRecipes.length === 0 && (
                <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8 sm:p-12 text-center">
                  <div className="text-6xl mb-5">🍳</div>

                  <h3 className="text-2xl font-bold text-gray-800">
                    No recipes found
                  </h3>

                  <p className="text-gray-500 mt-2 max-w-md mx-auto">
                    Try another search or category. Your next favourite
                    recipe might just be waiting to be discovered.
                  </p>

                  {isLoggedIn && (
                    <button
                      onClick={() => navigate('/add')}
                      className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
                    >
                      Add the first recipe
                    </button>
                  )}
                </div>
              )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;