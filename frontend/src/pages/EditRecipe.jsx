import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: 'Breakfast',
    imageUrl: '',
  });

  const [previewUrl, setPreviewUrl] = useState('');

  // Fetch existing recipe details
  useEffect(() => {
    fetch(`http://localhost:3000/api/recipes/${id}`)
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
      .catch(() => alert('❌ Failed to load recipe data'));
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
      const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        alert('✅ Recipe updated successfully!');
        navigate(`/recipe/${id}`);
      } else {
        alert('❌ Failed to update recipe.');
      }
    } catch (err) {
      console.error(err);
      alert('⚠️ Error while updating recipe.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">✏️ Edit Recipe</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Recipe Title"
            className="w-full border border-gray-300 px-5 py-3 rounded-xl"
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
            <div>
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl"
          >
            ✅ Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
