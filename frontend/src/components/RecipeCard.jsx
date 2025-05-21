
// src/components/RecipeCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
    setLiked(likedRecipes.includes(recipe._id));
  }, [recipe._id]);

  const toggleLike = () => {
    const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];

    if (liked) {
      const updated = likedRecipes.filter(id => id !== recipe._id);
      localStorage.setItem("likedRecipes", JSON.stringify(updated));
      setLiked(false);
    } else {
      likedRecipes.push(recipe._id);
      localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
      setLiked(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col relative">
      <img
        src={recipe.imageUrl || 'https://via.placeholder.com/400x300.png?text=No+Image'}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded mb-3"
      />

      {/* ❤️ Like Button */}
      <button
        onClick={toggleLike}
        className="absolute top-3 right-3 text-xl text-red-500 hover:scale-110 transition"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      <h3 className="text-lg font-bold text-orange-700 mb-2">{recipe.title}</h3>

      <div className="mb-2">
        <p className="text-sm font-semibold text-gray-700">Ingredients:</p>
        <p className="text-sm text-gray-600">
          {recipe.ingredients && recipe.ingredients.length > 0
            ? recipe.ingredients.join(", ")
            : "No ingredients available."}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700">Instructions:</p>
        <p className="text-sm text-gray-600 line-clamp-3">
          {recipe.instructions || "No instructions available."}
        </p>
      </div>

      <Link
        to={`/recipes/${recipe._id}`}
        className="mt-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition text-center"
      >
        View Recipe
      </Link>
    </div>
  );
}

export default RecipeCard;




