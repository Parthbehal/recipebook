import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch recipe');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Recipe deleted');
        navigate('/');
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting recipe');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!recipe) return <div className="text-center">Recipe not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full rounded-3xl max-h-[500px] object-cover shadow-md"
      />

      <h1 className="text-4xl font-bold text-orange-600 mt-6">{recipe.title}</h1>
      <p className="mt-2 text-gray-600 italic">Category: {recipe.category}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🥕 Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700">
          {recipe.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🧑‍🍳 Instructions</h2>
        <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          to={`/edit/${recipe._id}`}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
