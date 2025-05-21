const express = require('express');
const mongoose = require('mongoose');
const cors= require("cors")
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

