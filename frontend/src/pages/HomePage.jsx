// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null); // Add error state
  const categories = ["All", "Vegan", "Vegetarian", "Breakfast", "Dinner"];

  useEffect(() => {
    fetch('http://localhost:3000/api/recipes')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError('Failed to load recipes');
        setLoading(false);  // Stop loading in case of error
      });
  }, []);

  // Apply category and search filters
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.join(", ").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <HeroSection />

      <section className="py-10 px-4 max-w-6xl mx-auto">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <h2 className="text-2xl font-semibold mb-6 text-center">Our Recipes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center col-span-full">No recipes found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;



