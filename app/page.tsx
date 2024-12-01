'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleSignInClick = () => {
    setIsAnimating(true); // Trigger animation
    setTimeout(() => {
      router.push('/signin'); // Navigate to sign-in after animation
    }, 2000); // Animation duration is 2 seconds
  };

  return (
    <div className="relative min-h-screen bg-white text-black font-sans -mt-8">
      {/* Background Vinyl Image */}
      <div
        className="absolute inset-0 bg-[url('/vinyl.png')] bg-cover bg-center opacity-40 z-0"
        style={{ height: '105%' }}
      ></div>

      {/* Header with A Jam Logo */}
      <div className="absolute top-12 left-10 z-10">
        <Image src="/AJam.png" alt="A Jam Logo" width={200} height={60} />
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center relative z-10 p-2 mt-1">
        {/* Methix Logo */}
        <Image
          src="/methixtransparent.png"
          alt="Methix Logo"
          width={400}
          height={400}
          className="mb-0 -mt-8" // Move logo slightly up
        />
        {/* Subheader */}
        <p className="text-6xl font-light -mt-36 mb-16 tracking-wide">
          Your Music Manager Reimagined
        </p>
        {/* CTA */}
        <div className="mt-10"> {/* Adjusted margin to move up */}
          <h1 className="text-3xl font-light mb-12 tracking-tight leading-tight max-w-5xl italic">
            Your Guide to the Inside Starts Now.
          </h1>
          <button
            onClick={handleSignInClick}
            className="bg-black text-white py-5 px-14 rounded-full text-3xl font-medium bg-opacity-100 hover:bg-opacity-60 transition duration-300"
          >
            Sign In
          </button>
        </div>
      </main>

      {/* Black/White/Gray Sound Waves Animation */}
      {isAnimating && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="relative flex space-x-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-48 w-3 rounded-full bg-gray-800 animate-music-wave"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s',
                  backgroundColor: i % 2 === 0 ? '#000' : '#6b7280', // Alternating black and gray
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
