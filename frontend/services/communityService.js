const API_URL = 'https://recipebook-1-gjz7.onrender.com/api';

// Helper for authenticated requests
const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

// ==================== LIKES ====================

// Like a recipe
export const likeRecipe = async (recipeId, token) => {
  const response = await fetch(
    `${API_URL}/likes/${recipeId}`,
    {
      method: 'POST',
      headers: authHeaders(token),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to like recipe');
  }

  return data;
};

// Unlike a recipe
export const unlikeRecipe = async (recipeId, token) => {
  const response = await fetch(
    `${API_URL}/likes/${recipeId}`,
    {
      method: 'DELETE',
      headers: authHeaders(token),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to unlike recipe');
  }

  return data;
};

// Check like status
export const checkLikeStatus = async (recipeId, token) => {
  const response = await fetch(
    `${API_URL}/likes/${recipeId}/status`,
    {
      headers: authHeaders(token),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to check like status');
  }

  return data;
};

// ==================== SAVES ====================

// Save a recipe
export const saveRecipe = async (recipeId, token) => {
  const response = await fetch(
    `${API_URL}/saves/${recipeId}`,
    {
      method: 'POST',
      headers: authHeaders(token),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to save recipe');
  }

  return data;
};

// Unsave a recipe
export const unsaveRecipe = async (recipeId, token) => {
  const response = await fetch(
    `${API_URL}/saves/${recipeId}`,
    {
      method: 'DELETE',
      headers: authHeaders(token),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to unsave recipe');
  }

  return data;
};

// Check save status
export const checkSaveStatus = async (recipeId, token) => {
  const response = await fetch(
    `${API_URL}/saves/${recipeId}/status`,
    {
      headers: authHeaders(token),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to check save status');
  }

  return data;
};

// ==================== FOLLOWS ====================

// Follow a user
export const followUser = async (userId, token) => {
  const response = await fetch(
    `${API_URL}/follows/${userId}`,
    {
      method: 'POST',
      headers: authHeaders(token),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to follow user');
  }

  return data;
};

// Unfollow a user
export const unfollowUser = async (userId, token) => {
  const response = await fetch(
    `${API_URL}/follows/${userId}`,
    {
      method: 'DELETE',
      headers: authHeaders(token),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to unfollow user');
  }

  return data;
};

// Check follow status
export const checkFollowStatus = async (userId, token) => {
  const response = await fetch(
    `${API_URL}/follows/${userId}/status`,
    {
      headers: authHeaders(token),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to check follow status');
  }

  return data;
};
// REVIEWS

export const getRecipeReviews = async (recipeId) => {
  const response = await fetch(
    `${API_URL}/reviews/${recipeId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to load reviews'
    );
  }

  return data;
};

export const createReview = async (
  recipeId,
  rating,
  comment,
  token
) => {
  const response = await fetch(
    `${API_URL}/reviews/${recipeId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating,
        comment,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to submit review'
    );
  }

  return data;
};