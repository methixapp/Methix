'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUser,
  FaUserFriends,
  FaMapSigns,
  FaFolderOpen,
  FaTools,
  FaUserCircle,
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { href: '/chat', label: 'Manager', icon: <FaUser /> }, // Manager icon
    { href: '/career-roadmap', label: 'Roadmap', icon: <FaMapSigns /> }, // Roadmap icon
    { href: '/resources', label: 'Resources', icon: <FaFolderOpen /> }, // Resources icon
    { href: '/connect-with-artists', label: 'Rolodex', icon: <FaUserFriends /> }, // Rolodex icon
  ];

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 w-12 h-12 p-3 bg-gray-300 text-black rounded-full shadow-lg focus:outline-none flex items-center justify-center"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white text-black shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-40`}
      >
        {/* Sidebar Header */}
        <div className="p-6 text-center border-b border-gray-200">
          <h1 className="text-2xl font-bold tracking-wider">Methix</h1>
          <p className="text-sm text-gray-500">Your AI Music Manager</p>
        </div>

        {/* Navigation Items */}
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 p-4 text-lg font-medium rounded-lg ${
                    pathname === item.href
                      ? 'bg-gray-100 shadow-inner'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Links */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <Link
            href="/profile"
            className="flex items-center gap-4 p-4 text-lg font-medium rounded-lg hover:bg-gray-200"
          >
            <FaUserCircle />
            Profile
          </Link>
          <Link
            href="/signin"
            className="flex items-center gap-4 p-4 text-lg font-medium rounded-lg hover:bg-gray-200"
          >
            <FaSignInAlt />
            Sign In
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
