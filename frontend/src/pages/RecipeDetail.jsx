import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/recipes/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch recipe');
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('❌ Failed to load recipe data');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-200 dark:from-gray-800 dark:to-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          Loading recipe details...
        </p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 dark:bg-gray-900 px-4">
        <p className="text-xl text-red-600 dark:text-red-400 mb-4">Recipe not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-xl transition"
        >
          🔙 Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-orange-600 dark:text-orange-400 mb-4">
          {recipe.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide font-semibold">
          Category: {recipe.category} | Time: {recipe.cookingTime || '45 mins'} | Difficulty: {recipe.difficulty || 'Medium'}
        </p>

        {recipe.imageUrl && (
          <div className="flex justify-center my-6">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="rounded-xl max-w-full max-h-96 object-cover shadow-lg transition-transform hover:scale-105 duration-300"
            />
          </div>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))
            ) : (
              <li>No ingredients listed.</li>
            )}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Instructions</h2>
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
            {recipe.instructions || 'No instructions provided.'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Chef's Tips</h2>
          <p className="text-gray-600 dark:text-gray-400 italic">{recipe.tips || 'No special tips provided.'}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {(recipe.tags || ['Easy', 'Family Favorite']).map((tag, i) => (
              <span key={i} className="bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-white px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        <button
          onClick={() => navigate(-1)}
          className="mt-10 w-full md:w-auto bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-200"
        >
          🔙 Back to Recipes
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
