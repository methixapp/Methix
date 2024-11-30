'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileEdit from '../components/ProfileEdit';
import { UserProfile } from '../models/UserProfile';
import Sidebar from '../components/Sidebar';

const EditProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/UserProfile');
      if (response.ok) {
        const profiles = await response.json();
        if (profiles.length > 0) {
          setProfile(profiles[0]); // Assuming the first profile is the logged-in user's
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
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        router.push('/profile'); // Navigate back to the profile page after saving
      } else {
        throw new Error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
          <ProfileEdit initialProfile={profile} onSave={handleSave} />
        </div>
      </main>
    </div>
  );
};

export default EditProfilePage;
