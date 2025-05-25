// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';
import Aurora from '../components/Aurora';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categories = ["All", "Vegan", "Vegetarian", "Breakfast", "Dinner"];
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://recipebook-hxvc.onrender.com/api/recipes')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load recipes');
        setLoading(false);
      });
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.join(", ").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className="text-center py-10 animate-pulse text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 text-gray-800">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#000000"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Top Bar with Title and Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 shadow-lg bg-white sticky top-0 z-50">
        <h1 className="text-4xl font-extrabold text-orange-600 font-serif animate-fade-in">
          🥘 ReciPedia
        </h1>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => navigate('/add')}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl transition duration-300"
          >
            ➕ Add Recipe
          </button>
          <button
            onClick={() => navigate('/edit/:id')}
            className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-xl transition duration-300"
          >
            ✏️ Edit Recipe
          </button>
          <button
            onClick={() => navigate('/recipes/:id')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl transition duration-300"
          >
            📖 Recipe Detail
          </button>
        </div>
      </div>

      {/* Hero */}
      <HeroSection />

      <section className="py-10 px-4 max-w-6xl mx-auto">

        {/* Featured Recipe / Tip Box */}
        <div className="bg-white border-l-4 border-orange-400 rounded-xl p-4 mb-8 shadow-md animate-fade-in">
          <h3 className="text-xl font-bold text-orange-600">🍽️ Today's Featured Recipe</h3>
          <p className="text-gray-700 mt-1 italic">"Start your day with our refreshing Vegan Smoothie packed with energy!"</p>
        </div>

        {/* Search */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Recipes */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Our Recipes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No recipes found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

