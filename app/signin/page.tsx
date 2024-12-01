'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleChatTransition = () => {
    setIsTransitioning(true); // Trigger ripple animation
    setTimeout(() => {
      router.push('/chat'); // Navigate to chat after animation
    }, 800); // Match the animation duration
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Sign in failed. Please try again.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'An error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {/* Ripple Animation */}
      {isTransitioning && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="ripple"></div>
        </div>
      )}

      <div className="p-6 max-w-md w-full bg-white shadow-md rounded-lg">
        <div className="text-center mb-6">
          <h1
            className="text-4xl font-extrabold tracking-wide text-black"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            METHIX
          </h1>
          <p className="mt-2 text-gray-600">Sign in to your personalized music manager.</p>
        </div>
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-gray-800 hover:text-gray-600">
              Create an account
            </Link>
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Or</p>
            <button
              onClick={handleChatTransition}
              className="mt-2 text-gray-800 hover:text-gray-600 underline"
            >
              Go Inside
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}