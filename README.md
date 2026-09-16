# 🍳 ReciPedia — Community Recipe Sharing Platform

ReciPedia is a full-stack MERN web application that allows users to discover, create, save, like, review, and share recipes through a community-driven platform.

The application includes secure authentication, user profiles, recipe management, social interactions, gamification, and personalized community features.

## 🚀 Live Demo

👉 https://recipebook-qnjk.vercel.app/

## 📂 GitHub Repository

👉 https://github.com/Parthbehal/recipebook

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password hashing using bcrypt
- Persistent login sessions

### 🍲 Recipe Management
- Create new recipes
- View recipe details
- Edit your own recipes
- Delete your own recipes
- Recipe categories, cuisines, dietary tags, difficulty, cooking time, and servings
- Owner-based authorization

### 👥 Community Features
- Like and unlike recipes
- Save and unsave recipes
- Write and view reviews
- Follow and unfollow users
- View community recipe feed
- Explore other users' profiles

### 📈 Discovery
- Trending recipes
- Today's Special recipe
- Community feed
- Recipe ratings and review counts

### 🏆 Gamification
- Earn XP through platform activities
- Automatic level progression
- Achievement system
- Community leaderboard

### 👤 User Profiles
- Profile information
- Profile image and bio
- User statistics
- Created recipes
- Followers and following
- XP and level
- Earned achievements

### 📱 Responsive Design
- Responsive interface for desktop, tablet, and mobile devices
- Built with React and Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt.js

### Database
- MongoDB
- Mongoose

### Tools & Deployment
- Git & GitHub
- Postman
- VS Code
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🏗️ Project Architecture

```text
ReciPedia
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── context
│   │   └── App.jsx
│   │
│   ├── public
│   ├── index.html
│   └── vercel.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   ├── app.js
│   └── package.json
│
└── README.md****
