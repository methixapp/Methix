'use client';

import React, { useState, useEffect } from 'react';
import { FiBarChart, FiMusic, FiUsers } from 'react-icons/fi'; // Example icons for placeholders
import Sidebar from '../components/Sidebar'; // Import collapsible sidebar

interface RoadmapStep {
  title: string;
  description: string;
  progress: number; // percentage
}

export default function Roadmap() {
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Track API errors

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      setError(null);

      try {
        const userMetrics = {
          followers: 1500,
          engagement: '12%',
          songsReleased: 3,
        };
        const ambitions = 'Grow fanbase to 10,000 followers and release an EP by June.';

        const response = await fetch('/api/career-roadmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userMetrics, ambitions }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch roadmap');
        }

        const data = await response.json();
        setSteps(data.steps || []);
      } catch (error) {
        console.error('Error fetching roadmap:', error);
        setError('Could not load your roadmap.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-purple-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <header className="text-center py-10 bg-gradient-to-r from-purple-500 via-pink-600 to-red-400 text-white shadow-lg">
          <h1
            className="text-5xl font-extrabold tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Your Visual Career Roadmap
          </h1>
          <p className="mt-4 text-lg font-medium text-white">
            Transform your ambitions into actionable milestones!
          </p>
        </header>

        <main className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading roadmap...</p>
          ) : error ? (
            <div className="text-center space-y-10">
              <p className="text-2xl text-purple-800 font-semibold">
                Welcome to your music career path!
              </p>
              <p className="text-lg text-gray-600">
                This is your space to visualize your goals, milestones, and progress. While we
                couldn’t load your roadmap, here’s a glimpse of how it works:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 bg-white rounded-lg shadow-xl border border-purple-200 flex flex-col items-center text-center">
                  <FiBarChart className="text-purple-500 text-6xl mb-4" />
                  <h2 className="text-xl font-semibold text-purple-800">Track Progress</h2>
                  <p className="text-gray-600">
                    Monitor your achievements with dynamic progress bars, from fanbase growth to
                    releases.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-xl border border-purple-200 flex flex-col items-center text-center">
                  <FiMusic className="text-purple-500 text-6xl mb-4" />
                  <h2 className="text-xl font-semibold text-purple-800">Plan Your Releases</h2>
                  <p className="text-gray-600">
                    Organize your singles, EPs, or albums with actionable steps tailored to your
                    timeline.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-xl border border-purple-200 flex flex-col items-center text-center">
                  <FiUsers className="text-purple-500 text-6xl mb-4" />
                  <h2 className="text-xl font-semibold text-purple-800">Grow Your Audience</h2>
                  <p className="text-gray-600">
                    Discover strategies for engaging fans and expanding your reach through meaningful
                    actions.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            steps.map((step, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <h2 className="text-lg font-semibold text-purple-800">{step.title}</h2>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="w-full bg-gray-300 rounded-full h-4">
                  <div
                    className="bg-purple-500 h-4 rounded-full"
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-sm text-gray-500">
                  {step.progress}% complete
                </p>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
