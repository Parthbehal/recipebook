import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-orange-500 tracking-wide">
          FlavorBook
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition">
            Home
          </Link>
          <Link to="/add" className="text-gray-700 hover:text-orange-500 font-medium transition">
            Add Recipe
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 hover:text-orange-500"
          >
            Home
          </Link>
          <Link
            to="/add"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 hover:text-orange-500"
          >
            Add Recipe
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;//to include npm install lucide-react

