import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import Navbar from './components/Navbar';
import EditRecipe from './pages/EditRecipe';
import New from './pages/new';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyRecipes from './pages/MyRecipes';
import SavedRecipes from './pages/SavedRecipes';
import CommunityFeed from './pages/CommunityFeed';
import Trending from './pages/Trending';
import TodaysSpecial from './pages/TodaysSpecial';
import Leaderboard from './pages/Leaderboard';


function App() {
  return (
    <AuthProvider>
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/s" element={<New/>} />
        <Route path="/community" element={<CommunityFeed />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/todays-special" element={<TodaysSpecial />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
        <Route path="/profile/:userId" element={<Profile />} />
       <Route path="/my-recipes" element={<MyRecipes />} />
       <Route path="/saved-recipes" element={<SavedRecipes />} />
       <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      </Router>
  </AuthProvider>  
  );
}

export default App;




