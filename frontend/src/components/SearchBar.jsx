import React from "react";

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Search for recipes by title or ingredients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
      />
    </div>
  );
}

export default SearchBar;

