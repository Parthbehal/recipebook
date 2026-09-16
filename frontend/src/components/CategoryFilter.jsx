import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full transition duration-300 ${
            selectedCategory === category
              ? 'bg-orange-500 text-white'
              : 'bg-white text-orange-500 border border-orange-500'
          } hover:bg-orange-600 hover:text-white`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
