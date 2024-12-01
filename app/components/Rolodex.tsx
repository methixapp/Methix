'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

interface Artist {
  id: string;
  image: string;
  bio: string;
}

const artists: Artist[] = [
  {
    id: '1',
    image: '/IMG_1867.jpg', // Replace with your image URLs
    bio: 'MusiCares is a charitable organization supporting music professionals by providing critical assistance for financial, medical, and personal emergencies, as well as mental health and wellness resources.',
  },
  {
    id: '2',
    image: '/IMG_1868.jpg',
    bio: 'The CookOut is an entertainment summit for creatives, hosted by multi-Grammy and Stellar Award nominee super-producer D. Bottz, offering attendees the opportunity to witness and participate in the process of creating and releasing a song alongside award-winning music industry professionals.',
  },
  {
    id: '3',
    image: '/IMG_1869.jpg',
    bio: 'Bottzworld Studios is a state-of-the-art recording and production facility founded by Grammy-nominated producer D. Bottz, offering cutting-edge resources for artists and creators to bring their musical visions to life.',
  },
];

const Rolodex: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
          <p className="text-xl font-medium">Explore unique profiles and get inspired!</p>
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
            <div className="relative w-36 h-36 mx-auto mb-4">
              <Image
                src={currentArtist.image}
                alt="Artist Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow"
              />
            </div>

            <p className="text-gray-500 mb-4">{currentArtist.bio}</p>

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

export default Rolodex;
