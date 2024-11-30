'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '../models/UserProfile';
import Sidebar from '../components/Sidebar';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/UserProfile');
      if (response.ok) {
        const profiles = await response.json();
        if (profiles.length > 0) {
          setProfile(profiles[0]); // Assume the first profile is the user's
        } else {
          setProfile({
            id: '',
            name: 'New User',
            genre: '',
            discordUsername: '',
            bio: '',
            discordServerId: '',
            profileImage: '',
          });
        }
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to fetch profile. Please try again.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            {/* Profile Image */}
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300 shadow mb-4">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            {/* Profile Details */}
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">{profile.genre}</p>
            <p className="text-gray-500 mt-2">{profile.bio || 'No bio available.'}</p>
          </div>
          <hr className="my-6" />
          {/* Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold">Social Media Links</h2>
            <ul className="mt-2 space-y-2">
              {profile.socialMediaLinks &&
                Object.entries(profile.socialMediaLinks).map(([platform, url], index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium">{platform}:</span>
                    <a href={url} target="_blank" className="text-blue-500 hover:underline">
                      {url}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <hr className="my-6" />
          {/* Button to Edit Profile */}
          <div className="text-center">
            <button
              onClick={() => router.push('/edit-profile')}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
