'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { FaUserCircle, FaCamera, FaSyncAlt, FaMusic, FaTrash } from 'react-icons/fa';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import { UserProfile } from '../models/UserProfile';

interface ProfileEditProps {
  initialProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

const socialMediaOptions = ['Instagram', 'YouTube', 'Twitter', 'Facebook', 'TikTok', 'LinkedIn'];

const ProfileEdit: React.FC<ProfileEditProps> = ({ initialProfile, onSave }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [imagePreview, setImagePreview] = useState<string | null>(initialProfile.profileImage || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMusicFile, setNewMusicFile] = useState<File | null>(null);
  const [newSocialMedia, setNewSocialMedia] = useState<{ platform: string; url: string }>({
    platform: '',
    url: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
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

  const handleMusicUpload = async () => {
    if (newMusicFile) {
      const musicUrl = await uploadMusic(newMusicFile);
      if (musicUrl) {
        setProfile((prev) => ({
          ...prev,
          uploadedMusic: [...(prev.uploadedMusic || []), musicUrl],
        }));
        setNewMusicFile(null);
      }
    }
  };

  const handleSocialMediaAdd = () => {
    const { platform, url } = newSocialMedia;
    if (platform && url) {
      setProfile((prev) => ({
        ...prev,
        socialMediaLinks: {
          ...(prev.socialMediaLinks || {}),
          [platform]: url,
        },
      }));
      setNewSocialMedia({ platform: '', url: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (fileInputRef.current?.files?.[0]) {
      const imageUrl = await uploadImage(fileInputRef.current.files[0]);
      if (imageUrl) {
        setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
      }
    }

    await onSave(profile);
    setIsSubmitting(false);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.fileUrl;
      } else {
        console.error('Failed to upload image');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const uploadMusic = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.fileUrl;
      } else {
        console.error('Failed to upload music');
        return null;
      }
    } catch (error) {
      console.error('Error uploading music:', error);
      return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 space-y-6 mx-auto"
        >
          {/* Profile Picture */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300 shadow">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  layout="fill"
                  className="object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-300" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-white bg-gray-800 p-2 rounded-full shadow hover:bg-gray-700"
                >
                  <FaCamera />
                </button>
              </div>
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
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio || ''}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
              rows={4}
            ></textarea>
          </div>

          {/* Music Uploads */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Uploaded Music</label>
            <ul className="space-y-2">
              {profile.uploadedMusic?.map((musicUrl, index) => (
                <li key={index} className="flex items-center justify-between">
                  <a href={musicUrl} target="_blank" className="text-blue-500 hover:underline">
                    {musicUrl}
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      setProfile((prev) => ({
                        ...prev,
                        uploadedMusic: prev.uploadedMusic?.filter((_, i) => i !== index),
                      }))
                    }
                    className="text-red-500 hover:underline text-sm"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setNewMusicFile(e.target.files?.[0] || null)}
                className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                type="button"
                onClick={handleMusicUpload}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700"
              >
                Upload
              </button>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Social Media Links</label>
            <ul className="space-y-2">
              {profile.socialMediaLinks &&
                Object.entries(profile.socialMediaLinks).map(([platform, url], index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium">{platform}:</span>
                    <a href={url} target="_blank" className="text-blue-500 hover:underline">
                      {url}
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        setProfile((prev) => {
                          const newLinks = { ...prev.socialMediaLinks };
                          delete newLinks[platform];
                          return { ...prev, socialMediaLinks: newLinks };
                        })
                      }
                      className="text-red-500 hover:underline text-sm"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
            </ul>
            <div className="flex items-center space-x-2">
              <select
                value={newSocialMedia.platform}
                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, platform: e.target.value })}
                className="w-1/3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="" disabled>
                  Select platform
                </option>
                {socialMediaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="url"
                placeholder="URL"
                value={newSocialMedia.url}
                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, url: e.target.value })}
                className="w-2/3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                type="button"
                onClick={handleSocialMediaAdd}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white rounded-lg shadow ${
              isSubmitting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-700 transition'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <FaSyncAlt className="animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              'Save Profile'
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProfileEdit;
