import React, { useState } from 'react';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: 'Breakfast',
    imageUrl: '',
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'imageUrl') {
      setPreviewUrl(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('🎉 Recipe added successfully!');
        setFormData({
          title: '',
          ingredients: '',
          instructions: '',
          category: 'Breakfast',
          imageUrl: '',
        });
        setPreviewUrl('');
      } else {
        alert('❌ Failed to add recipe. Try again.');
      }
    } catch (err) {
      console.error(err);
      alert('⚠️ Error submitting recipe');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">🍽️ Add a New Recipe</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Recipe Title"
            className="w-full border border-gray-300 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border border-gray-300 px-5 py-3 rounded-xl"
          />

          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-xl w-full max-h-64 object-cover border border-gray-200"
              />
            </div>
          )}

          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingredients (comma separated)"
            className="w-full border border-gray-300 px-5 py-3 rounded-xl h-32"
            required
          ></textarea>

          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Instructions"
            className="w-full border border-gray-300 px-5 py-3 rounded-xl h-40"
            required
          ></textarea>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-5 py-3 rounded-xl"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Dinner">Dinner</option>
          </select>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transition"
          >
            ➕ Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
