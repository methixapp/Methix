'use client'

import React, { useState } from 'react'

interface Resource {
  title: string;
  description: string;
  link: string;
  category: string;
}

interface CategoryInfo {
  name: string;
  description: string;
}

// Updated categories with descriptions
const CATEGORIES: CategoryInfo[] = [
  {
    name: "Care",
    description: "Mental and physical health resources to support your wellbeing as a music professional."
  },
  {
    name: "Creative",
    description: "Tools and resources for developing your craft, from production to songwriting and education."
  },
  {
    name: "Cash",
    description: "Financial resources, business guidance, and marketing tools to help sustain your music career."
  }
];

const resources: Resource[] = [
  // CARE category (mental and physical health resources)
  {
    title: "MusiCares Financial Assistance",
    description: "GRAMMY's charitable organization providing critical assistance for music people in times of need, including financial, medical, and personal emergencies.",
    link: "https://www.musicares.org/get-help",
    category: "Care"
  },
  {
    title: "MusiCares Wellness in Music",
    description: "Comprehensive support services including addiction recovery, preventive clinics, and emergency dental and medical programs for music industry professionals.",
    link: "https://www.musicares.org/programs/wellness-music",
    category: "Care"
  },
  {
    title: "Mental Health America (MHA)",
    description: "Comprehensive mental health support platform offering self-assessment tools, educational resources, and access to support communities for music industry professionals.",
    link: "https://mhanational.org/",
    category: "Care"
  },
  {
    title: "Backline Care",
    description: "Specialized mental health and wellness support network dedicated to music industry professionals, providing counseling services and wellness resources.",
    link: "https://backline.care/",
    category: "Care"
  },
  {
    title: "Headspace for Musicians",
    description: "Meditation and mindfulness platform with specialized content for creative professionals to manage stress, enhance focus, and maintain mental wellness.",
    link: "https://www.headspace.com/",
    category: "Care"
  },
  {
    title: "Musicians' Union Mental Health Support",
    description: "Professional organization providing targeted mental health resources and counseling services specifically for musicians and industry professionals.",
    link: "https://www.musiciansunion.org.uk/",
    category: "Care"
  },

  // CREATIVE category (all developmental and creative learning)
  {
    title: "Pro Tools First",
    description: "Industry-standard DAW with a free version for beginners, including tutorials and getting started guides for music production.",
    link: "https://www.avid.com/pro-tools",
    category: "Creative"
  },
  {
    title: "GarageBand Resources",
    description: "Apple's comprehensive tutorials and resources for their beginner-friendly DAW, perfect for new producers on Mac and iOS.",
    link: "https://www.apple.com/mac/garageband/",
    category: "Creative"
  },
  {
    title: "Ableton Live Learning",
    description: "Official tutorials and resources for learning Ableton Live, including free lessons and production techniques.",
    link: "https://www.ableton.com/en/live/learn-live/",
    category: "Creative"
  },
  {
    title: "FL Studio Academy",
    description: "Comprehensive tutorials and guides for FL Studio users, from basics to advanced production techniques.",
    link: "https://www.image-line.com/fl-studio-learning/",
    category: "Creative"
  },
  {
    title: "Berklee Online Music Theory",
    description: "Comprehensive music theory courses from one of the world's most prestigious music schools.",
    link: "https://online.berklee.edu/courses/music-theory-101",
    category: "Creative"
  },
  {
    title: "Coursera Music Courses",
    description: "Wide range of music education courses from top universities, including theory, production, and business.",
    link: "https://www.coursera.org/browse/arts-and-humanities/music-and-art",
    category: "Creative"
  },
  {
    title: "Udemy Music Production",
    description: "Practical courses on music production, mixing, and mastering from industry professionals.",
    link: "https://www.udemy.com/topic/music-production/",
    category: "Creative"
  },
  {
    title: "Hooktheory",
    description: "Interactive tools and theory resources for understanding chord progressions and melody writing.",
    link: "https://www.hooktheory.com/",
    category: "Creative"
  },
  {
    title: "Soundfly's Songwriting Course",
    description: "Online course covering songwriting techniques, structure, and creative processes.",
    link: "https://soundfly.com/courses/songwriting-for-producers",
    category: "Creative"
  },

  // CASH category (financial health resources)
  {
    title: "BMI's Royalty Guide",
    description: "Comprehensive resource for understanding music royalties, licensing, and copyright protection from one of the largest PROs.",
    link: "https://www.bmi.com/creators",
    category: "Cash"
  },
  // ... (continue with all business and marketing resources under "Cash")
  {
    title: "CD Baby's Marketing Guide",
    description: "Expert marketing strategies and promotional tips from one of the largest independent music distributors.",
    link: "https://cdbaby.com/music-promotion",
    category: "Cash"
  },
  // Add all other business and marketing resources here with category: "Cash"
  {
    title: "Music Industry Financial Relief Resources",
    description: "Comprehensive list of financial aid, grants, and relief programs specifically for music industry professionals.",
    link: "https://www.billboard.com/music/music-news/music-industry-resources-financial-help-9337908/",
    category: "Cash"
  },
  {
    title: "Sweet Relief Musicians Fund",
    description: "Financial assistance for musicians facing illness, disability, or age-related problems.",
    link: "https://www.sweetrelief.org/",
    category: "Cash"
  },
  {
    title: "The Blues Foundation HART Fund",
    description: "Helping blues musicians and their families in financial need due to health concerns.",
    link: "https://blues.org/hart-fund/",
    category: "Cash"
  },
  {
    title: "Jazz Foundation of America",
    description: "Emergency funding and assistance for jazz and blues musicians in crisis.",
    link: "https://jazzfoundation.org/",
    category: "Cash"
  },
  {
    title: "Music Maker Relief Foundation",
    description: "Support for traditional musicians rooted in Southern musical traditions who are in need.",
    link: "https://musicmaker.org/",
    category: "Cash"
  },
  {
    title: "Artists Rights Alliance",
    description: "Advocacy organization helping creators understand and navigate music industry economics.",
    link: "https://artistrightsalliance.org/",
    category: "Cash"
  },
  {
    title: "Future of Music Coalition",
    description: "Education, research and advocacy for fair compensation in the digital music era.",
    link: "https://futureofmusic.org/",
    category: "Cash"
  },
  {
    title: "Royalty Exchange",
    description: "Platform for buying and selling royalty rights, with educational resources about music as an asset.",
    link: "https://www.royaltyexchange.com/",
    category: "Cash"
  },
  {
    title: "Music Financial Planning",
    description: "Specialized financial planning resources and advice for music industry professionals.",
    link: "https://www.soundroyalties.com/resources",
    category: "Cash"
  },
  {
    title: "Indie Artist Resource",
    description: "Financial management tools and resources specifically for independent musicians.",
    link: "https://www.indieonthemove.com/resources",
    category: "Cash"
  },
  {
    title: "Music Industry Accounting",
    description: "Specialized accounting resources and guidance for music business finances.",
    link: "https://www.musicindustryhowto.com/music-accounting-101/",
    category: "Cash"
  },
  {
    title: "Music Industry Taxes Guide",
    description: "Comprehensive guide to tax considerations for musicians and music industry professionals.",
    link: "https://www.thebalancecareers.com/musician-s-guide-to-taxes-2460644",
    category: "Cash"
  },
  {
    title: "Charitable Organizations Database",
    description: "Comprehensive directory of organizations offering financial assistance to musicians.",
    link: "https://www.grammy.com/musicares/get-help",
    category: "Cash"
  },
  {
    title: "Music Industry Grants Directory",
    description: "Searchable database of grants and funding opportunities for musicians and industry professionals.",
    link: "https://www.grants.gov/",
    category: "Cash"
  },
  {
    title: "Musician's Business Insurance Guide",
    description: "Information about insurance options and protection for music professionals and their assets.",
    link: "https://www.musicproinsurance.com/",
    category: "Cash"
  }
]

const Sources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = selectedCategory
    ? resources.filter(resource => resource.category === selectedCategory)
    : resources;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-3 tracking-tight">Welcome to Your Personalized Resource Home </h1>
      <p className="text-gray-600 text-lg mb-8 max-w-2xl">Discover handpicked tools and tips to help you grow and thrive in your music career.</p>
      
      {/* Category Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {CATEGORIES.map(category => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`p-6 rounded-xl text-left transition-all duration-300 
              ${selectedCategory === category.name 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
          >
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className={`text-sm ${selectedCategory === category.name ? 'text-gray-300' : 'text-gray-600'}`}>
              {category.description}
            </p>
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
            ${!selectedCategory 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All Resources
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${selectedCategory === category.name 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sources
