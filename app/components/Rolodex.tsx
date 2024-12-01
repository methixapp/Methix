'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaHeart, FaChevronLeft, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';

interface Artist {
  id: string;
  image: string;
  bio: string;
}

const artists: Artist[] = [
  {
    id: '1',
    image: '/IMG_1867.jpg',
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
  {
    id: '4',
    image: '/IMG_1870.jpg',
    bio: 'Brittyvette is a GRAMMY-recognized music manager and industry professional specializing in artist development and career growth.',
  },
  {
    id: '5',
    image: '/IMG_1871.jpg',
    bio: 'Arnaecia Alridge is a seasoned music executive and former publicist to GRAMMY award-winning artists, recognized for her leadership roles within the Recording Academy Texas Chapter and as the founder of A Jam Records, a label committed to ethical practices in the music industry.',
  },
  {
    id: '6',
    image: '/IMG_1872.jpg',
    bio: 'Walter J. Tucker, Hip-Hop and R&B Partnerships Lead at Apple Music, leverages his expertise and network to support emerging artists by offering access to insider knowledge, networking opportunities, and industry resources.',
  },
  {
    id: '7',
    image: '/IMG_1873.jpg',
    bio: 'Being Indie Is Major is a platform celebrating and empowering independent artists by providing resources, insights, and community support to help them succeed on their own terms.',
  },
];

const Rolodex: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleNextCard = () => {
    if (currentCardIndex < artists.length - 1) setCurrentCardIndex((prev) => prev + 1);
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) setCurrentCardIndex((prev) => prev - 1);
  };

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const currentArtist = artists[currentCardIndex];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-200 via-white to-gray-100 relative">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 text-black">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="absolute top-4 left-4 bg-gray-300 text-gray-600 p-2 rounded-full shadow-lg hover:bg-gray-400"
        >
          <FaArrowLeft />
        </button>

        {/* Header */}
        <header className="text-center mb-8">
          <h1
            className="text-5xl font-extrabold mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Rolodex
          </h1>
          <p className="text-xl font-medium">Explore Profiles of Music Industry Experts and Learn how to Connect!</p>
        </header>

        {/* Card Display */}
        <div className="relative w-full max-w-md">
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
            <div className="relative w-full h-60 mx-auto mb-4">
              <Image
                src={currentArtist.image}
                alt="Artist Image"
                layout="fill"
                objectFit="cover"
                objectPosition="top" // Adjust cropping to focus on the top
                className="rounded-lg shadow"
              />
            </div>

            <p className="text-gray-500 mb-4">{currentArtist.bio}</p>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(currentArtist.id)}
              className={`p-3 rounded-full ${
                favorites.includes(currentArtist.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-300 text-gray-600'
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
