'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaSignInAlt, FaUser } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const homeItem = { href: '/', label: 'Home' };
  const navItems = [
    { href: '/chat', label: 'Chat' },
    { href: '/career-roadmap', label: 'Career Roadmap' },
    { href: '/resources', label: 'Resources' },
    { href: '/connect-with-artists', label: 'Connect with Artists' },
  ];

  return (
    <aside className="w-72 min-w-72 max-w-72 bg-gray-900 text-gray-100 p-8 flex flex-col h-screen sticky top-0 shadow-lg">
      {/* Sidebar Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
          Methix
        </h1>
        <p className="text-sm text-gray-400">Your AI Music Manager</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-grow">
        <ul>
          <li className="mb-6">
            <Link
              href={homeItem.href}
              className={`flex items-center text-lg font-medium p-4 rounded-lg ${
                pathname === homeItem.href
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-inner'
                  : 'hover:bg-gray-700'
              }`}
            >
              <FaHome className="mr-3 text-xl" />
              {homeItem.label}
            </Link>
          </li>
          <li className="border-b border-gray-700 mb-6"></li>
          {navItems.map((item) => (
            <li key={item.href} className="mb-4">
              <Link
                href={item.href}
                className={`block text-lg font-medium p-4 rounded-lg ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-inner'
                    : 'hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile and Sign-In */}
      <div className="mt-auto">
        <Link
          href="/profile"
          className="flex items-center text-lg font-medium p-4 rounded-lg hover:bg-gray-700 mb-4"
        >
          <FaUser className="mr-3 text-xl" />
          Profile
        </Link>
        <Link
          href="/signin"
          className="flex items-center text-lg font-medium p-4 rounded-lg hover:bg-gray-700"
        >
          <FaSignInAlt className="mr-3 text-xl" />
          Sign In
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
