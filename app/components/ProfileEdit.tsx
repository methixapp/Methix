'use client'

import React, { useState, useRef } from 'react';
import { UserProfile } from '../models/UserProfile';

interface ProfileEditProps {
  initialProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ initialProfile, onSave }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [imagePreview, setImagePreview] = useState<string | null>(initialProfile.profileImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (fileInputRef.current?.files?.[0]) {
      const imageUrl = await uploadImage(fileInputRef.current.files[0]);
      if (imageUrl) {
        setProfile(prev => ({ ...prev, profileImage: imageUrl }));
      }
    }

    onSave(profile);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        console.error('Failed to upload image');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white">
      <div className="flex flex-col items-center border-2 border-gray-300 p-4 rounded-md">
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
          Profile Picture
        </label>
        <div className="w-32 h-32 mb-4 border border-gray-300 rounded-full overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        <label
          htmlFor="profileImage"
          className="cursor-pointer bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300 mt-2"
        >
          {imagePreview ? 'Change Image' : 'Upload Image'}
        </label>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={profile.genre}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="discordUsername" className="block text-sm font-medium text-gray-700">Discord Username</label>
        <input
          type="text"
          id="discordUsername"
          name="discordUsername"
          value={profile.discordUsername}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="discordServerId" className="block text-sm font-medium text-gray-700">Discord Server ID (optional)</label>
        <input
          type="text"
          id="discordServerId"
          name="discordServerId"
          value={profile.discordServerId || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={profile.bio || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
          rows={3}
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
      >
        Save Profile
      </button>
    </form>
  );
};

export default ProfileEdit;
