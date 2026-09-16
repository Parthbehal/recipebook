import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: 'Breakfast',
    imageUrl: '',
  });

  const [previewUrl, setPreviewUrl] = useState('');

  // Fetch existing recipe details on mount
  useEffect(() => {
    fetch(`https://recipebook-hxvc.onrender.com/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          ...data,
          ingredients: Array.isArray(data.ingredients)
            ? data.ingredients.join(', ')
            : data.ingredients,
        });
        setPreviewUrl(data.imageUrl);
      })
      .catch(() => toast.error('❌ Failed to load recipe data'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'imageUrl') setPreviewUrl(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map((i) => i.trim()),
    };

    try {
      const res = await fetch(`https://recipebook-hxvc.onrender.com/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast.success('✅ Recipe updated successfully!');
        setTimeout(() => {
          navigate(`/recipe/${id}`);
        }, 1500);
      } else {
        toast.error('❌ Failed to update recipe.');
      }
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Error while updating recipe.');
    }
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 relative
        ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-orange-50 text-gray-800'}`}
    >
      <ToastContainer />

      {/* Dark mode toggle button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle Dark Mode"
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-3 rounded-l-full shadow-lg transition-all duration-500 ease-in-out z-50
          hover:right-5
          hover:bg-gray-400 dark:hover:bg-gray-600
          flex items-center justify-center
        `}
        style={{ width: '50px', height: '50px' }}
      >
        <div
          className={`transition-transform duration-700 ${
            isDarkMode ? 'rotate-180 scale-110 animate-pulse' : 'rotate-0 scale-100'
          }`}
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-yellow-400 drop-shadow-lg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m8.66-11.66l-.7.7M4.34 16.66l-.7.7M21 12h-1M4 12H3m15.36 5.36l-.7-.7M6.34 7.34l-.7-.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-800 drop-shadow-md"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
              />
            </svg>
          )}
        </div>
      </button>

      <div
        className={`max-w-3xl mx-auto p-8 rounded-3xl shadow-xl transition-colors duration-500
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <h2
          className={`text-4xl font-extrabold text-center mb-2 ${
            isDarkMode ? 'text-orange-400' : 'text-orange-600'
          } animate-bounce`}
        >
          ✏️ Edit Your Delicious Recipe
        </h2>
        <p className={`text-center mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          Update your recipe details below
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g., Classic Pancakes"
              className={`w-full border px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:scale-105 transition-transform duration-200
                ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600 focus:ring-orange-400 focus:border-orange-400'
                    : 'bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:ring-orange-300 focus:border-orange-300'
                }`}
              required
            />
            <p className="text-sm text-gray-400 mt-1">Enter the recipe title, e.g., "Classic Pancakes"</p>
          </div>

          <div>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Paste image URL here"
              className={`w-full border px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:scale-105 transition-transform duration-200
                ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600 focus:ring-orange-400 focus:border-orange-400'
                    : 'bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:ring-orange-300 focus:border-orange-300'
                }`}
            />
            <p className="text-sm text-gray-400 mt-1">Provide an image URL to preview your recipe</p>
          </div>

          {previewUrl && (
            <div className="flex justify-center mb-5">
              <img
                src={previewUrl}
                alt="Preview"
                className={`rounded-2xl w-full max-w-md object-cover border shadow-md transition-shadow duration-300
                  ${
                    isDarkMode
                      ? 'border-gray-600 shadow-indigo-700/50'
                      : 'border-gray-300 shadow-gray-400/50'
                  }`}
              />
            </div>
          )}

          <div>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Separate ingredients with commas"
              className={`w-full border px-5 py-3 rounded-xl h-32 focus:outline-none focus:ring-4 focus:scale-105 transition-transform duration-200
                ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600 focus:ring-orange-400 focus:border-orange-400'
                    : 'bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:ring-orange-300 focus:border-orange-300'
                }`}
              required
            ></textarea>
            <p className="text-sm text-gray-400 mt-1">
              List all ingredients separated by commas, e.g., "2 eggs, 1 cup milk, 200g flour"
            </p>
          </div>

          <div>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Step-by-step cooking instructions"
              className={`w-full border px-5 py-3 rounded-xl h-40 focus:outline-none focus:ring-4 focus:scale-105 transition-transform duration-200
                ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600 focus:ring-orange-400 focus:border-orange-400'
                    : 'bg-white text-gray-800 placeholder-gray-500 border-gray-300 focus:ring-orange-300 focus:border-orange-300'
                }`}
              required
            ></textarea>
            <p className="text-sm text-gray-400 mt-1">Write clear instructions for preparing your recipe</p>
          </div>

          <div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full border px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:scale-105 transition-transform duration-200
                ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-200 border-gray-600 focus:ring-orange-400 focus:border-orange-400'
                    : 'bg-white text-gray-800 border-gray-300 focus:ring-orange-300 focus:border-orange-300'
                }`}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Dinner">Dinner</option>
            </select>
            <p className="text-sm text-gray-400 mt-1">Choose the category that best fits your recipe</p>
          </div>

          <button
            type="submit"
            className={`w-full text-white font-bold py-3 rounded-xl transition-colors duration-200
              ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            📝 Save Changes
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`w-full font-medium py-3 rounded-xl mt-5 transition-colors duration-200
            ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
        >
          🔙 Go Back
        </button>
      </div>
    </div>
  );
};

export default EditRecipe;
