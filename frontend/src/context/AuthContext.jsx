import { createContext, useContext, useEffect, useState } from 'react';
import {
  registerUser,
  loginUser,
  getProfile,
} from '../../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('token')
  );
  const [loading, setLoading] = useState(true);

  // Check if a saved token is still valid
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getProfile(token);
        setUser(profile);
      } catch (error) {
        console.log('Session expired or invalid');
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register
  const register = async (userData) => {
    const data = await registerUser(userData);
    return data;
  };

  // Login
  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem('token', data.token);
    setToken(data.token);

    const profile = await getProfile(data.token);
    setUser(profile);

    return profile;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isLoggedIn: !!user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};