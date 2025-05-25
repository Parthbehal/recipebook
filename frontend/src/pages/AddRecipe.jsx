import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const categories = ['Breakfast', 'Vegan', 'Vegetarian', 'Dinner'];

const AddRecipe = () => {
  const [formData, setFormData] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('recipe-draft');
    return saved
      ? JSON.parse(saved)
      : {
          title: '',
          ingredients: '',
          instructions: '',
          category: 'Breakfast',
          imageUrl: '',
        };
  });

  const [previewUrl, setPreviewUrl] = useState(formData.imageUrl || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    localStorage.setItem('recipe-draft', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (name === 'imageUrl') setPreviewUrl(value);
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required.';
    if (!formData.ingredients.trim()) errs.ingredients = 'Ingredients required.';
    if (!formData.instructions.trim()) errs.instructions = 'Instructions required.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setTouched({ title: true, ingredients: true, instructions: true });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('🎉 Recipe added successfully!');
        localStorage.removeItem('recipe-draft');
        setFormData({
          title: '',
          ingredients: '',
          instructions: '',
          category: 'Breakfast',
          imageUrl: '',
        });
        setPreviewUrl('');
        setTouched({});
      } else {
        setError('❌ Failed to add recipe. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('⚠️ Network error');
    }
    setLoading(false);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-tr from-orange-100 via-pink-100 to-yellow-50'} min-h-screen w-full flex items-center justify-center px-4`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-xl shadow text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
            {/* Visual Quote Section (Right Side) */}
           
  {/* Animated Cooking Emoji */}
  <motion.div
  className="fixed top-1/2 right-8 transform -translate-y-1/2 w-96 text-center hidden md:block"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.5, duration: 0.6 }}
>
  {/* Animated Cooking Emoji */}
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 3,
      ease: 'easeInOut',
    }}
    className="text-9xl"
  >
    🍲
  </motion.div>

  {/* Quote */}
  <p className="mt-6 italic text-2xl font-semibold text-gray-800 dark:text-gray-200">
    "Cooking is love made visible." 🍳
  </p>
</motion.div>




      

      <div className="w-full max-w-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-orange-600 dark:text-orange-400 mb-8">
          🍽️ Add a New Recipe
        </h2>

        {error && <div className="text-center mb-4 text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter recipe title"
              className={`w-full border px-5 py-3 rounded-xl shadow-sm outline-none ${
                touched.title && !formData.title ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {touched.title && !formData.title && (
              <p className="text-red-500 text-sm mt-1">Title is required.</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 font-semibold">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Paste image URL"
              className="w-full border border-gray-300 px-5 py-3 rounded-xl"
            />
          </div>

          {previewUrl && (
            <div className="mt-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-xl w-full max-h-64 object-cover border border-gray-200"
              />
            </div>
          )}

          {/* Ingredients */}
          <div>
            <label className="block mb-1 font-semibold">Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="List ingredients separated by commas"
              className={`w-full border px-5 py-3 rounded-xl h-28 ${
                touched.ingredients && !formData.ingredients
                  ? 'border-red-400'
                  : 'border-gray-300'
              }`}
            ></textarea>
            {touched.ingredients && !formData.ingredients && (
              <p className="text-red-500 text-sm mt-1">Ingredients required.</p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label className="block mb-1 font-semibold">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Describe cooking steps"
              className={`w-full border px-5 py-3 rounded-xl h-40 ${
                touched.instructions && !formData.instructions
                  ? 'border-red-400'
                  : 'border-gray-300'
              }`}
            ></textarea>
            {touched.instructions && !formData.instructions && (
              <p className="text-red-500 text-sm mt-1">Instructions required.</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 px-5 py-3 rounded-xl"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-xl transition duration-200 ${
              loading
                ? 'bg-orange-300 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {loading ? 'Adding...' : '➕ Add Recipe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;


