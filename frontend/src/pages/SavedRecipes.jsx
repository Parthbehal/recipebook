import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';

function SavedRecipes() {
  const { user, token } = useAuth();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'https://recipebook-1-gjz7.onrender.com/api/saves/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to load saved recipes'
          );
        }

        setRecipes(data);
      } catch (error) {
        console.error('Saved recipes error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [token]);

  if (!user) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please log in
          </h2>

          <p className="text-gray-500 mb-5">
            You need to be logged in to view your saved recipes.
          </p>

          <Link
            to="/login"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-orange-600 font-semibold">
          Loading saved recipes...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">
            {error}
          </p>

          <Link
            to="/"
            className="text-orange-600 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link
          to="/"
          className="inline-block mb-6 text-gray-600 hover:text-orange-600 font-medium"
        >
          ← Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Saved Recipes
          </h1>

          <p className="text-gray-500 mt-1">
            Recipes you've saved for later.
          </p>
        </div>

        {/* Recipes */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-orange-100 p-12 text-center">

            <div className="text-6xl mb-4">
              🔖
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No saved recipes yet
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Save recipes you love and find them here later.
            </p>

            <Link
              to="/"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
            >
              Explore Recipes
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}

export default SavedRecipes;