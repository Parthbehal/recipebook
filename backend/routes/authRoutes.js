const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authControllers');
const { protect } = require('../controllers/middlewre/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);  // 👈 protected route

module.exports = router;