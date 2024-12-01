'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Resource {
  title: string;
  description: string;
  link: string;
  category: string;
}

const CATEGORIES: string[] = ["Care", "Creative", "Cash", "Community"];

const resources: Resource[] = [
  // CARE category
  {
    title: "MusiCares Financial Assistance",
    description: "GRAMMY's charitable organization providing critical assistance for music people in times of need, including financial, medical, and personal emergencies.",
    link: "https://www.musicares.org/get-help",
    category: "Care",
  },
  {
    title: "MusiCares Wellness in Music",
    description: "Comprehensive support services including addiction recovery, preventive clinics, and emergency dental and medical programs for music industry professionals.",
    link: "https://www.musicares.org/programs/wellness-music",
    category: "Care",
  },
  {
    title: "Mental Health America (MHA)",
    description: "Comprehensive mental health support platform offering self-assessment tools, educational resources, and access to support communities for music industry professionals.",
    link: "https://mhanational.org/",
    category: "Care",
  },
  {
    title: "Backline Care",
    description: "Specialized mental health and wellness support network dedicated to music industry professionals, providing counseling services and wellness resources.",
    link: "https://backline.care/",
    category: "Care",
  },
  {
    title: "Headspace for Musicians",
    description: "Meditation and mindfulness platform with specialized content for creative professionals to manage stress, enhance focus, and maintain mental wellness.",
    link: "https://www.headspace.com/",
    category: "Care",
  },
  {
    title: "Musicians' Union Mental Health Support",
    description: "Professional organization providing targeted mental health resources and counseling services specifically for musicians and industry professionals.",
    link: "https://www.musiciansunion.org.uk/",
    category: "Care",
  },
  // CREATIVE category
  {
    title: "Pro Tools First",
    description: "Industry-standard DAW with a free version for beginners, including tutorials and getting started guides for music production.",
    link: "https://www.avid.com/pro-tools",
    category: "Creative",
  },
  {
    title: "GarageBand Resources",
    description: "Apple's comprehensive tutorials and resources for their beginner-friendly DAW, perfect for new producers on Mac and iOS.",
    link: "https://www.apple.com/mac/garageband/",
    category: "Creative",
  },
  {
    title: "Ableton Live Learning",
    description: "Official tutorials and resources for learning Ableton Live, including free lessons and production techniques.",
    link: "https://www.ableton.com/en/live/learn-live/",
    category: "Creative",
  },
  {
    title: "FL Studio Academy",
    description: "Comprehensive tutorials and guides for FL Studio users, from basics to advanced production techniques.",
    link: "https://www.image-line.com/fl-studio-learning/",
    category: "Creative",
  },
  {
    title: "Berklee Online Music Theory",
    description: "Comprehensive music theory courses from one of the world's most prestigious music schools.",
    link: "https://online.berklee.edu/courses/music-theory-101",
    category: "Creative",
  },
  {
    title: "Coursera Music Courses",
    description: "Wide range of music education courses from top universities, including theory, production, and business.",
    link: "https://www.coursera.org/browse/arts-and-humanities/music-and-art",
    category: "Creative",
  },
  {
    title: "Udemy Music Production",
    description: "Practical courses on music production, mixing, and mastering from industry professionals.",
    link: "https://www.udemy.com/topic/music-production/",
    category: "Creative",
  },
  {
    title: "Hooktheory",
    description: "Interactive tools and theory resources for understanding chord progressions and melody writing.",
    link: "https://www.hooktheory.com/",
    category: "Creative",
  },
  {
    title: "Soundfly's Songwriting Course",
    description: "Online course covering songwriting techniques, structure, and creative processes.",
    link: "https://soundfly.com/courses/songwriting-for-producers",
    category: "Creative",
  },
  // CASH category
  {
    title: "BMI's Royalty Guide",
    description: "Comprehensive resource for understanding music royalties, licensing, and copyright protection from one of the largest PROs.",
    link: "https://www.bmi.com/creators",
    category: "Cash",
  },
  {
    title: "CD Baby's Marketing Guide",
    description: "Expert marketing strategies and promotional tips from one of the largest independent music distributors.",
    link: "https://cdbaby.com/music-promotion",
    category: "Cash",
  },
  {
    title: "Sweet Relief Musicians Fund",
    description: "Financial assistance for musicians facing illness, disability, or age-related problems.",
    link: "https://www.sweetrelief.org/",
    category: "Cash",
  },
  // Add more Cash resources here...
];

const Sources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = selectedCategory
    ? resources.filter((resource) => resource.category === selectedCategory)
    : resources;

  return (
    <div className="p-8 max-w-7xl mx-auto relative" style={{ marginLeft: '60px' }}>
      <h1 className="text-5xl font-bold mb-3 tracking-tight">
        Welcome to Your Personalized Resource Home
      </h1>
      <p className="text-gray-600 text-lg mb-8 max-w-4xl">
        Discover handpicked tools and tips to help you grow and thrive in your music career.
      </p>

      {/* Category Buttons */}
      <div className="flex gap-6 mb-5">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`p-4 rounded-xl text-center transition-all duration-300 flex-1 
              ${selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
          >
            <h3 className="text-xl font-semibold">
              {category === "Community" ? (
                <Link href="/community">{category}</Link>
              ) : (
                category
              )}
            </h3>
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredResources.map((resource, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex flex-col h-full">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                {resource.category}
              </span>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">{resource.title}</h2>
              <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-900 font-medium hover:text-gray-700 transition-colors"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sources;
