'use client';

import React, { useState, useEffect } from 'react';
import { FiBarChart, FiMusic, FiUsers } from 'react-icons/fi'; // Example icons for placeholders
import Sidebar from '../components/Sidebar'; // Import collapsible sidebar

export default function Roadmap() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Track API errors

  useEffect(() => {
    // Simulate loading delay for placeholder
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Example: 1 second delay
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black font-sans -mt-8">
      {/* Background Piano Image */}
      <div
        className="absolute inset-0 bg-[url('/sticky-piano-keys.jpg')] bg-cover bg-center opacity-20 z-0"
        style={{ height: '190%' }}
      ></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col">
        {/* Header Section */}
        <header className="text-center py-10 bg-gray-50 shadow-lg relative z-10">
          <h1
            className="text-5xl font-extrabold tracking-wide text-gray-900"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Your Career Roadmap
          </h1>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Transform your ambitions into actionable milestones!
          </p>
          {/* Quote Section */}
          <div className="mt-8 text-lg italic font-light text-gray-700 px-8 max-w-4xl mx-auto">
            <p>
              &quot;Your music is your voice. Never stop sharing it with the world.&quot; &ndash; Quincy Jones
            </p>
          </div>
        </header>

        <main className="relative z-10 flex-1 px-6 py-8 space-y-6 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="text-center space-y-10">
              <p className="text-2xl text-gray-800 font-semibold">
                Welcome to your music career path!
              </p>
              <p className="text-lg text-gray-600">
                This is your space to visualize your goals, milestones, and progress. Here&rsquo;s a glimpse of how it works:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-300 flex flex-col items-center text-center">
                  <FiBarChart className="text-indigo-600 text-6xl mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800">Track Progress</h2>
                  <p className="text-gray-600">
                    Monitor your achievements with dynamic progress bars, from fanbase growth to releases.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-300 flex flex-col items-center text-center">
                  <FiMusic className="text-indigo-600 text-6xl mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800">Plan Your Releases</h2>
                  <p className="text-gray-600">
                    Organize your singles, EPs, or albums with actionable steps tailored to your timeline.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-300 flex flex-col items-center text-center">
                  <FiUsers className="text-indigo-600 text-6xl mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800">Grow Your Audience</h2>
                  <p className="text-gray-600">
                    Discover strategies for engaging fans and expanding your reach through meaningful actions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
