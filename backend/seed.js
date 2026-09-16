const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const User = require('./models/User');
const Recipe = require('./models/Recipe');

dotenv.config();

const users = [
  {
    name: 'Aarav Sharma',
    email: 'aarav@recipedia.com',
    password: 'password123',
    bio: 'Home cook who loves Indian comfort food.',
    profileImage: '',
    xp: 420,
    level: 4,
  },
  {
    name: 'Priya Kapoor',
    email: 'priya@recipedia.com',
    password: 'password123',
    bio: 'Vegetarian food enthusiast and weekend baker.',
    profileImage: '',
    xp: 680,
    level: 6,
  },
  {
    name: 'Rohan Mehta',
    email: 'rohan@recipedia.com',
    password: 'password123',
    bio: 'Exploring global flavours one recipe at a time.',
    profileImage: '',
    xp: 310,
    level: 3,
  },
  {
    name: 'Ananya Verma',
    email: 'ananya@recipedia.com',
    password: 'password123',
    bio: 'Simple recipes for busy days.',
    profileImage: '',
    xp: 540,
    level: 5,
  },
  {
    name: 'Kabir Singh',
    email: 'kabir@recipedia.com',
    password: 'password123',
    bio: 'Street food lover and experimental cook.',
    profileImage: '',
    xp: 250,
    level: 3,
  },
  {
    name: 'Meera Joshi',
    email: 'meera@recipedia.com',
    password: 'password123',
    bio: 'Desserts, coffee and everything homemade.',
    profileImage: '',
    xp: 790,
    level: 7,
  },
];

const recipes = [
  {
    title: 'Creamy Garlic Pasta',
    description:
      'A rich and comforting pasta tossed in a creamy garlic sauce with parmesan.',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Pasta',
      'Garlic',
      'Butter',
      'Cream',
      'Parmesan',
      'Black Pepper',
    ],
    instructions: [
      'Boil the pasta until al dente.',
      'Sauté minced garlic in butter.',
      'Add cream and parmesan and simmer gently.',
      'Toss the pasta through the sauce.',
      'Finish with black pepper and parmesan.',
    ],
    cookingTime: 25,
    difficulty: 'Easy',
    category: 'Dinner',
    cuisine: 'Italian',
    dietaryTags: ['Vegetarian'],
    servings: 2,
    rating: 4.8,
    reviewCount: 42,
    likesCount: 128,
  },

  {
    title: 'Paneer Butter Masala',
    description:
      'Soft paneer cooked in a silky tomato and butter gravy with aromatic spices.',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Paneer',
      'Tomatoes',
      'Butter',
      'Cream',
      'Garam Masala',
      'Ginger',
      'Garlic',
    ],
    instructions: [
      'Prepare a smooth tomato-based gravy.',
      'Add butter and aromatic spices.',
      'Add paneer cubes and simmer.',
      'Finish with cream and coriander.',
    ],
    cookingTime: 40,
    difficulty: 'Medium',
    category: 'Dinner',
    cuisine: 'Indian',
    dietaryTags: ['Vegetarian'],
    servings: 4,
    rating: 4.9,
    reviewCount: 67,
    likesCount: 194,
  },

  {
    title: 'Classic Pancakes',
    description:
      'Fluffy golden pancakes perfect for a relaxed weekend breakfast.',
    image:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Flour',
      'Milk',
      'Eggs',
      'Sugar',
      'Butter',
      'Baking Powder',
    ],
    instructions: [
      'Mix the dry ingredients.',
      'Whisk milk, eggs and melted butter.',
      'Combine wet and dry ingredients.',
      'Cook pancakes on a hot pan.',
      'Serve with maple syrup and fruit.',
    ],
    cookingTime: 20,
    difficulty: 'Easy',
    category: 'Breakfast',
    cuisine: 'American',
    dietaryTags: [],
    servings: 3,
    rating: 4.7,
    reviewCount: 31,
    likesCount: 96,
  },

  {
    title: 'Avocado Toast',
    description:
      'A quick and fresh breakfast with creamy avocado, lemon and chilli flakes.',
    image:
      'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Bread',
      'Avocado',
      'Lemon',
      'Chilli Flakes',
      'Salt',
      'Black Pepper',
    ],
    instructions: [
      'Toast the bread until golden.',
      'Mash the avocado with lemon juice.',
      'Spread avocado over the toast.',
      'Season with chilli flakes, salt and pepper.',
    ],
    cookingTime: 10,
    difficulty: 'Easy',
    category: 'Breakfast',
    cuisine: 'American',
    dietaryTags: ['Vegan', 'Healthy'],
    servings: 1,
    rating: 4.6,
    reviewCount: 18,
    likesCount: 71,
  },

  {
    title: 'Chicken Tikka Masala',
    description:
      'Tender chicken pieces simmered in a creamy tomato curry with Indian spices.',
    image:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Chicken',
      'Yogurt',
      'Tomatoes',
      'Onion',
      'Cream',
      'Garam Masala',
      'Cumin',
    ],
    instructions: [
      'Marinate the chicken with yogurt and spices.',
      'Grill or pan-sear the chicken.',
      'Prepare the tomato and onion gravy.',
      'Add chicken and simmer.',
      'Finish with cream and coriander.',
    ],
    cookingTime: 50,
    difficulty: 'Medium',
    category: 'Dinner',
    cuisine: 'Indian',
    dietaryTags: [],
    servings: 4,
    rating: 4.9,
    reviewCount: 89,
    likesCount: 241,
  },

  {
    title: 'Veggie Buddha Bowl',
    description:
      'A colourful bowl packed with roasted vegetables, grains and a creamy dressing.',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Quinoa',
      'Chickpeas',
      'Avocado',
      'Carrots',
      'Cucumber',
      'Spinach',
      'Tahini',
    ],
    instructions: [
      'Cook the quinoa.',
      'Roast the vegetables and chickpeas.',
      'Prepare the tahini dressing.',
      'Arrange everything in a bowl.',
      'Drizzle with dressing and serve.',
    ],
    cookingTime: 35,
    difficulty: 'Easy',
    category: 'Dinner',
    cuisine: 'Mediterranean',
    dietaryTags: ['Vegan', 'Healthy'],
    servings: 2,
    rating: 4.8,
    reviewCount: 36,
    likesCount: 114,
  },

  {
    title: 'Margherita Pizza',
    description:
      'A classic pizza with tomato, mozzarella, basil and a crisp homemade crust.',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Pizza Dough',
      'Tomato Sauce',
      'Mozzarella',
      'Basil',
      'Olive Oil',
    ],
    instructions: [
      'Stretch the pizza dough.',
      'Spread tomato sauce evenly.',
      'Add mozzarella and basil.',
      'Bake until the crust is golden.',
      'Finish with olive oil.',
    ],
    cookingTime: 45,
    difficulty: 'Medium',
    category: 'Dinner',
    cuisine: 'Italian',
    dietaryTags: ['Vegetarian'],
    servings: 2,
    rating: 4.9,
    reviewCount: 73,
    likesCount: 215,
  },

  {
    title: 'Chocolate Lava Cake',
    description:
      'A rich chocolate cake with a warm molten centre.',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476f?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Dark Chocolate',
      'Butter',
      'Flour',
      'Eggs',
      'Sugar',
      'Cocoa Powder',
    ],
    instructions: [
      'Melt chocolate and butter together.',
      'Whisk eggs and sugar.',
      'Combine with the chocolate mixture.',
      'Add flour and cocoa powder.',
      'Bake briefly and serve warm.',
    ],
    cookingTime: 25,
    difficulty: 'Medium',
    category: 'Dessert',
    cuisine: 'French',
    dietaryTags: ['Vegetarian'],
    servings: 2,
    rating: 4.9,
    reviewCount: 54,
    likesCount: 176,
  },

  {
    title: 'Masala Dosa',
    description:
      'Crispy South Indian dosa filled with a spiced potato mixture.',
    image:
      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Dosa Batter',
      'Potatoes',
      'Onion',
      'Mustard Seeds',
      'Curry Leaves',
      'Turmeric',
    ],
    instructions: [
      'Prepare the spiced potato filling.',
      'Heat a flat pan.',
      'Spread dosa batter into a thin circle.',
      'Cook until crisp.',
      'Add potato filling and fold.',
    ],
    cookingTime: 35,
    difficulty: 'Medium',
    category: 'Breakfast',
    cuisine: 'Indian',
    dietaryTags: ['Vegetarian'],
    servings: 3,
    rating: 4.8,
    reviewCount: 61,
    likesCount: 153,
  },

  {
    title: 'Greek Salad',
    description:
      'A refreshing Mediterranean salad with vegetables, feta and olive oil.',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Cucumber',
      'Tomatoes',
      'Olives',
      'Feta Cheese',
      'Onion',
      'Olive Oil',
    ],
    instructions: [
      'Chop the vegetables.',
      'Add olives and feta.',
      'Drizzle with olive oil.',
      'Season and toss gently.',
    ],
    cookingTime: 15,
    difficulty: 'Easy',
    category: 'Dinner',
    cuisine: 'Greek',
    dietaryTags: ['Vegetarian', 'Healthy'],
    servings: 2,
    rating: 4.6,
    reviewCount: 22,
    likesCount: 68,
  },

  {
    title: 'Mango Smoothie',
    description:
      'A refreshing tropical smoothie made with ripe mango and creamy yogurt.',
    image:
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Mango',
      'Yogurt',
      'Milk',
      'Honey',
      'Ice',
    ],
    instructions: [
      'Add all ingredients to a blender.',
      'Blend until smooth.',
      'Adjust sweetness if needed.',
      'Serve chilled.',
    ],
    cookingTime: 5,
    difficulty: 'Easy',
    category: 'Breakfast',
    cuisine: 'Indian',
    dietaryTags: ['Vegetarian'],
    servings: 2,
    rating: 4.7,
    reviewCount: 27,
    likesCount: 83,
  },

  {
    title: 'Butter Chicken',
    description:
      'A North Indian classic featuring tender chicken in a buttery tomato gravy.',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Chicken',
      'Butter',
      'Tomatoes',
      'Cream',
      'Ginger',
      'Garlic',
      'Garam Masala',
    ],
    instructions: [
      'Marinate and cook the chicken.',
      'Prepare the tomato gravy.',
      'Add butter and spices.',
      'Add chicken and simmer.',
      'Finish with cream.',
    ],
    cookingTime: 55,
    difficulty: 'Medium',
    category: 'Dinner',
    cuisine: 'Indian',
    dietaryTags: [],
    servings: 4,
    rating: 4.9,
    reviewCount: 102,
    likesCount: 298,
  },

  {
    title: 'Berry Overnight Oats',
    description:
      'An easy make-ahead breakfast loaded with oats, berries and creamy yogurt.',
    image:
      'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Oats',
      'Milk',
      'Yogurt',
      'Berries',
      'Chia Seeds',
      'Honey',
    ],
    instructions: [
      'Mix oats, milk and yogurt.',
      'Add chia seeds and honey.',
      'Refrigerate overnight.',
      'Top with fresh berries.',
    ],
    cookingTime: 5,
    difficulty: 'Easy',
    category: 'Breakfast',
    cuisine: 'American',
    dietaryTags: ['Vegetarian', 'Healthy'],
    servings: 1,
    rating: 4.7,
    reviewCount: 19,
    likesCount: 59,
  },

  {
    title: 'Creamy Tomato Soup',
    description:
      'A comforting tomato soup with herbs and a silky creamy finish.',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Tomatoes',
      'Onion',
      'Garlic',
      'Vegetable Stock',
      'Cream',
      'Basil',
    ],
    instructions: [
      'Sauté onion and garlic.',
      'Add tomatoes and vegetable stock.',
      'Simmer until soft.',
      'Blend until smooth.',
      'Finish with cream and basil.',
    ],
    cookingTime: 30,
    difficulty: 'Easy',
    category: 'Dinner',
    cuisine: 'Italian',
    dietaryTags: ['Vegetarian'],
    servings: 4,
    rating: 4.5,
    reviewCount: 16,
    likesCount: 52,
  },

  {
    title: 'Tandoori Paneer Wrap',
    description:
      'Smoky paneer, crunchy vegetables and mint chutney wrapped in soft flatbread.',
    image:
      'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Paneer',
      'Yogurt',
      'Capsicum',
      'Onion',
      'Roti',
      'Mint Chutney',
    ],
    instructions: [
      'Marinate paneer with yogurt and spices.',
      'Cook paneer and vegetables.',
      'Warm the roti.',
      'Spread mint chutney.',
      'Add filling and roll tightly.',
    ],
    cookingTime: 30,
    difficulty: 'Easy',
    category: 'Dinner',
    cuisine: 'Indian',
    dietaryTags: ['Vegetarian'],
    servings: 2,
    rating: 4.8,
    reviewCount: 33,
    likesCount: 91,
  },

  {
    title: 'Classic Cheesecake',
    description:
      'A smooth and creamy baked cheesecake with a buttery biscuit crust.',
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Cream Cheese',
      'Biscuits',
      'Butter',
      'Sugar',
      'Eggs',
      'Vanilla',
    ],
    instructions: [
      'Prepare the biscuit crust.',
      'Beat cream cheese and sugar.',
      'Add eggs and vanilla.',
      'Pour over the crust.',
      'Bake and chill before serving.',
    ],
    cookingTime: 70,
    difficulty: 'Hard',
    category: 'Dessert',
    cuisine: 'American',
    dietaryTags: ['Vegetarian'],
    servings: 8,
    rating: 4.9,
    reviewCount: 47,
    likesCount: 139,
  },

  {
    title: 'Chickpea Curry',
    description:
      'A hearty and aromatic chickpea curry that comes together in one pot.',
    image:
      'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Chickpeas',
      'Tomatoes',
      'Onion',
      'Garlic',
      'Ginger',
      'Cumin',
      'Garam Masala',
    ],
    instructions: [
      'Sauté onion, ginger and garlic.',
      'Add tomatoes and spices.',
      'Add chickpeas and water.',
      'Simmer until thick.',
      'Serve with rice or roti.',
    ],
    cookingTime: 35,
    difficulty: 'Easy',
    category: 'Dinner',
    cuisine: 'Indian',
    dietaryTags: ['Vegan', 'Healthy'],
    servings: 4,
    rating: 4.7,
    reviewCount: 29,
    likesCount: 84,
  },

  {
    title: 'Cinnamon French Toast',
    description:
      'Golden French toast with cinnamon, butter and fresh fruit.',
    image:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      'Bread',
      'Eggs',
      'Milk',
      'Cinnamon',
      'Butter',
      'Maple Syrup',
    ],
    instructions: [
      'Whisk eggs, milk and cinnamon.',
      'Dip bread into the mixture.',
      'Cook in butter until golden.',
      'Serve with maple syrup and fruit.',
    ],
    cookingTime: 20,
    difficulty: 'Easy',
    category: 'Breakfast',
    cuisine: 'American',
    dietaryTags: ['Vegetarian'],
    servings: 2,
    rating: 4.8,
    reviewCount: 24,
    likesCount: 77,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

    // Remove old test recipes
    await Recipe.deleteMany({});

    console.log('Old recipes removed');

    // Create / update seed users
    const createdUsers = [];

    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(
        userData.password,
        10
      );

      const user = await User.findOneAndUpdate(
        { email: userData.email },
        {
          ...userData,
          password: hashedPassword,
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

      createdUsers.push(user);
    }

    console.log(`${createdUsers.length} users ready`);

    // Connect recipes with users
    const recipesWithAuthors = recipes.map((recipe, index) => ({
      ...recipe,
      author: createdUsers[index % createdUsers.length]._id,
    }));

    await Recipe.insertMany(recipesWithAuthors);

    console.log(`${recipesWithAuthors.length} recipes inserted`);

    console.log('Database seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();