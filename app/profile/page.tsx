'use client'

import React, { useState, useEffect } from 'react';
import ProfileEdit from '../components/ProfileEdit';
import { UserProfile } from '../models/UserProfile';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/UserProfile');
      if (response.ok) {
        const profiles = await response.json();
        if (profiles.length > 0) {
          setProfile(profiles[0]); // Assume the first profile is the user's
        } else {
          // If no profile exists, create a new one
          setProfile({
            id: '',
            name: '',
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

  const handleSave = async (updatedProfile: UserProfile) => {
    try {
      const method = updatedProfile.id ? 'PUT' : 'POST';
      const response = await fetch('/api/UserProfile', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });
      if (response.ok) {
        const savedProfile = await response.json();
        setProfile(savedProfile);
        alert('Profile updated successfully!');
        // Fetch the profile again to ensure we have the latest data, including the updated image
        await fetchProfile();
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
      <ProfileEdit initialProfile={profile} onSave={handleSave} />
    </div>
  );
};

export default ProfilePage;