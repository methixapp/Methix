'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaHeart, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import { UserProfile } from '../models/UserProfile';

const ConnectArtists: React.FC = () => {
  const [artists, setArtists] = useState<UserProfile[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Fetch artists
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/UserProfile');
        if (response.ok) {
          const data: UserProfile[] = await response.json();
          setArtists(data);
        } else {
          throw new Error('Failed to fetch artists');
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  // Toggle favorite artists
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Navigation for artist cards
  const handleNextCard = () => {
    if (currentCardIndex < artists.length - 1) setCurrentCardIndex((prev) => prev + 1);
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) setCurrentCardIndex((prev) => prev - 1);
  };

  // Touch navigation for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNextCard();
    if (distance < -50) handlePreviousCard();
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle empty state
  if (artists.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-200 via-white to-gray-100">
        Loading artists...
      </div>
    );
  }

  const currentArtist = artists[currentCardIndex];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-200 via-white to-gray-100 relative">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 text-black">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Rolodex
          </h1>
          <p className="text-xl font-medium">Explore and connect with artists, producers, and more!</p>
        </header>

        {/* Card Display */}
        <div
          className="relative w-full max-w-md"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Card Button */}
          <button
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-gray-300 text-gray-600 rounded-full shadow-lg ${
              currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'
            }`}
          >
            <FaChevronLeft />
          </button>

          {/* Current Card */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={currentArtist.profileImage || '/placeholder-profile.png'}
                alt={currentArtist.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow"
              />
            </div>

            <h2 className="text-xl font-bold">{currentArtist.name}</h2>
            <p className="text-gray-600 mb-2">{currentArtist.genre}</p>
            <p className="text-gray-500 mb-4">{currentArtist.bio || 'No bio available.'}</p>

            {/* Uploaded Music */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Uploaded Music</h3>
              {currentArtist.uploadedMusic?.length ? (
                <ul className="space-y-1">
                  {currentArtist.uploadedMusic.map((music, index) => (
                    <li key={index}>
                      <a
                        href={music}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Track {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No music uploaded.</p>
              )}
            </div>

            {/* Social Media Links */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Social Media</h3>
              {currentArtist.socialMediaLinks ? (
                <div className="space-y-1">
                  {Object.entries(currentArtist.socialMediaLinks).map(([platform, link]) => (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-700"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No social media links.</p>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(currentArtist.id)}
              className={`p-3 rounded-full ${
                favorites.includes(currentArtist.id) ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
              } hover:bg-red-500 hover:text-white`}
            >
              <FaHeart />
            </button>
          </div>

          {/* Next Card Button */}
          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === artists.length - 1}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-gray-300 text-gray-600 rounded-full shadow-lg ${
              currentCardIndex === artists.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ConnectArtists;
