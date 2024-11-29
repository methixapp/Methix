'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaHome, FaUser, FaSignInAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { href: '/', label: 'Home', icon: <FaHome /> },
    { href: '/chat', label: 'Chat', icon: <FaHome /> },
    { href: '/career-roadmap', label: 'Career Roadmap', icon: <FaUser /> },
    { href: '/resources', label: 'Resources', icon: <FaUser /> },
    { href: '/connect-with-artists', label: 'Connect with Artists', icon: <FaUser /> },
  ];

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-full shadow-lg focus:outline-none"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-40`}
      >
        {/* Sidebar Header */}
        <div className="p-6 text-center border-b border-gray-700">
          <h1 className="text-2xl font-bold tracking-wider text-white">Methix</h1>
          <p className="text-sm text-gray-400">Your AI Music Manager</p>
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
                      ? 'bg-gray-700 shadow-inner'
                      : 'hover:bg-gray-800'
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
        <div className="mt-auto p-4 border-t border-gray-700">
          <Link
            href="/profile"
            className="flex items-center gap-4 p-4 text-lg font-medium rounded-lg hover:bg-gray-800"
          >
            <FaUser />
            Profile
          </Link>
          <Link
            href="/signin"
            className="flex items-center gap-4 p-4 text-lg font-medium rounded-lg hover:bg-gray-800"
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
