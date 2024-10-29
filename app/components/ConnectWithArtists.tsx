'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaDiscord } from 'react-icons/fa'
import { UserProfile } from '../models/UserProfile'

const ConnectArtists: React.FC = () => {
  const [artists, setArtists] = useState<UserProfile[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/UserProfile');
        if (response.ok) {
          const data = await response.json();
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

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Connect with Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-white p-6 rounded-lg shadow-md">
            {artist.profileImage && (
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <Image
                  src={artist.profileImage}
                  alt={artist.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold text-gray-800 text-center">{artist.name}</h2>
            <p className="text-gray-600 mb-2">Genre: {artist.genre}</p>
            <p className="text-gray-600 mb-2">Discord: {artist.discordUsername}</p>
            {artist.discordServerId && (
              <p className="text-gray-600 mb-2">Server ID: {artist.discordServerId}</p>
            )}
            {artist.bio && <p className="text-gray-600 mb-4">{artist.bio}</p>}
            <button 
              className="flex items-center justify-center w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
            >
              <FaDiscord className="mr-2" />
              Connect on Discord
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConnectArtists