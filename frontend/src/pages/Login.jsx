import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await login(formData);

      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-orange-100 via-pink-100 to-yellow-50 flex items-center justify-center px-4">

      {/* Main Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            🍽️
          </div>

          <h1 className="text-4xl font-extrabold text-orange-600 font-serif">
            Welcome Back!
          </h1>

          <p className="text-gray-600 mt-2">
            Login to your ReciPedia account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 text-center text-red-500 font-medium">
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 px-5 py-3 rounded-xl shadow-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 px-5 py-3 rounded-xl shadow-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-xl transition duration-200 ${
              loading
                ? 'bg-orange-300 cursor-not-allowed text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {loading ? 'Logging in...' : '🔐 Login'}
          </button>

        </form>

        {/* Register */}
        <div className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-orange-500 hover:text-orange-600 font-semibold bg-transparent p-0 border-0"
          >
            Create one
          </button>
        </div>

        {/* Back Home */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-orange-500 bg-transparent p-0 border-0"
          >
            ← Back to ReciPedia
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;