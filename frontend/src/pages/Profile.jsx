import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import {
  followUser,
  unfollowUser,
  checkFollowStatus,
} from '../../services/communityService';


function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();


  const { user, token } = useAuth();

  const [following, setFollowing] = useState(false);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');

       const response = await fetch(
  `https://recipebook-1-gjz7.onrender.com/api/profiles/${userId}`
);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to load profile'
          );
        }

        setProfile(data);
      } catch (error) {
        console.error('Profile error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Check whether current user follows this profile
  useEffect(() => {
    const loadFollowStatus = async () => {
      // No need to check follow status when:
      // - user is not logged in
      // - profile ID is missing
      // - viewing own profile
      if (!token || !userId || userId === user?._id) {
        setFollowing(false);
        return;
      }

      try {
        const data = await checkFollowStatus(userId, token);
        setFollowing(data.following);
      } catch (error) {
        console.error(
          'Failed to load follow status:',
          error
        );
      }
    };

    loadFollowStatus();
  }, [userId, token, user]);

  // Follow / Unfollow
  const toggleFollow = async () => {
    // Login required
    if (!user || !token) {
      navigate('/login');
      return;
    }

    // Prevent following yourself
    if (user._id === userId) {
      return;
    }

    try {
      if (following) {
        await unfollowUser(userId, token);

        setFollowing(false);

        setProfile((prev) => ({
          ...prev,
          stats: {
            ...prev.stats,
            followersCount: Math.max(
              0,
              prev.stats.followersCount - 1
            ),
          },
        }));
      } else {
        await followUser(userId, token);

        setFollowing(true);

        setProfile((prev) => ({
          ...prev,
          stats: {
            ...prev.stats,
            followersCount:
              prev.stats.followersCount + 1,
          },
        }));
      }
    } catch (error) {
      console.error('Follow error:', error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-orange-600 font-semibold">
          Loading profile...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">
            {error}
          </p>

          <Link
            to="/"
            className="text-orange-600 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  // Profile owner
const { user: profileUser, stats, recipes } = profile;

  const isOwnProfile = user?._id === userId;
  const achievementDetails = {
  first_recipe: {
    icon: '🍳',
    title: 'First Recipe',
    description: 'Shared your first recipe',
  },

  recipe_creator: {
    icon: '👨‍🍳',
    title: 'Recipe Creator',
    description: 'Shared 5 recipes',
  },

  popular_chef: {
    icon: '❤️',
    title: 'Popular Chef',
    description: 'Received 10 likes',
  },

  reviewer: {
    icon: '⭐',
    title: 'Reviewer',
    description: 'Written 5 reviews',
  },
};

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back */}

        <Link
          to="/"
          className="inline-block mb-6 text-gray-600 hover:text-orange-600 font-medium"
        >
          ← Back
        </Link>

        {/* Profile Card */}

        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Profile Image */}

            <div className="w-28 h-28 rounded-full bg-orange-100 flex items-center justify-center text-5xl shrink-0 overflow-hidden">

              {profileUser.profileImage ? (
                <img
                  src={profileUser.profileImage}
                  alt={profileUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                '👨‍🍳'
              )}

            </div>

            {/* Profile Info */}

            <div className="text-center md:text-left flex-1">

              <h1 className="text-3xl font-bold text-gray-900">
                {profileUser.name}
              </h1>

              <p className="text-gray-500 mt-2">
                {profileUser.bio ||
                  'ReciPedia community member'}
              </p>

              {/* Follow Button */}

              {!isOwnProfile && (
                <button
                  type="button"
                  onClick={toggleFollow}
                  className={`mt-4 px-6 py-2.5 rounded-xl font-semibold transition ${
                    following
                      ? 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {following
                    ? '✓ Following'
                    : '+ Follow'}
                </button>
              )}

              {/* XP / Level */}

            {/* XP / Level */}
<div className="mt-5 max-w-md">
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center gap-2">
      <span className="text-lg">🏆</span>

      <span className="text-sm font-bold text-orange-600">
        Level {profileUser.level}
      </span>
    </div>

    <span className="text-sm font-semibold text-gray-500">
      {profileUser.xp} XP
    </span>
  </div>

  <div className="w-full h-3 bg-orange-100 rounded-full overflow-hidden">
    <div
      className="h-full bg-orange-500 rounded-full transition-all duration-500"
      style={{
        width: `${profileUser.xp % 100}%`,
      }}
    />
  </div>

  <p className="text-xs text-gray-500 mt-2">
    {100 - (profileUser.xp % 100)} XP to next level
  </p>
</div>

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {stats.recipeCount}
              </p>

              <p className="text-sm text-gray-500">
                Recipes
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {stats.followersCount}
              </p>

              <p className="text-sm text-gray-500">
                Followers
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {stats.followingCount}
              </p>

              <p className="text-sm text-gray-500">
                Following
              </p>
            </div>

          </div>

        </div>


        {/* Achievements */}
<div className="mt-8">
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-2xl font-bold text-gray-900">
      🏆 Achievements
    </h2>

    <span className="text-sm text-gray-500">
      {profileUser.achievements?.length || 0} unlocked
    </span>
  </div>

  {profileUser.achievements?.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {profileUser.achievements.map((achievement) => {
        const details = achievementDetails[achievement];

        if (!details) return null;

        return (
          <div
            key={achievement}
            className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl shrink-0">
              {details.icon}
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                {details.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {details.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="bg-white rounded-2xl border border-orange-100 p-6 text-center">
      <p className="text-gray-500">
        No achievements unlocked yet. Keep cooking! 🍳
      </p>
    </div>
  )}
</div>





                 {/* User Recipes */}

        <div className="mt-10">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-bold text-gray-900">
              {profileUser.name}'s Recipes
            </h2>

            <span className="text-sm text-gray-500">
              {recipes.length} recipes
            </span>

          </div>

          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                />
              ))}

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-orange-100 p-10 text-center">

              <div className="text-5xl mb-3">
                🍳
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                No recipes yet
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                This chef hasn't shared any recipes yet.
              </p>

            </div>
          )}

        </div>



      </div>
    </div>
  );
}

export default Profile;