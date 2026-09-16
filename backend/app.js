const express = require('express');
const mongoose = require('mongoose');
const cors= require("cors")
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');
const likeRoutes = require('./routes/likeRoutes');
const saveRoutes = require('./routes/saveRoutes');
const followRoutes = require('./routes/followRoutes');
const profileRoutes = require('./routes/profileRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/saves', saveRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

