'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaSignInAlt, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();

  const homeItem = { href: '/', label: 'Home' };
  const navItems = [
    { href: '/chat', label: 'Chat' },
    { href: '/career-roadmap', label: 'Career Roadmap' },
    { href: '/resources', label: 'Resources' },
    { href: '/connect-with-artists', label: 'Connect with Artists' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 p-6 flex flex-col h-screen sticky top-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-100">Methix</h1>
      </div>
      <nav className="flex-grow">
        <ul>
          <li className="mb-6">
            <Link
              href={homeItem.href}
              className={`flex items-center p-2 rounded ${
                pathname === homeItem.href ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
            >
              <FaHome className="mr-2" />
              {homeItem.label}
            </Link>
          </li>
          <li className="border-b border-gray-700 mb-4"></li>
          {navItems.map((item) => (
            <li key={item.href} className="mb-4">
              <Link
                href={item.href}
                className={`block p-2 rounded ${
                  pathname === item.href ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <Link
          href="/profile"
          className="flex items-center p-2 rounded hover:bg-gray-800 mb-2"
        >
          <FaUser className="mr-2" />
          Profile
        </Link>
        <Link
          href="/signin"
          className="flex items-center p-2 rounded hover:bg-gray-800"
        >
          <FaSignInAlt className="mr-2" />
          Sign In
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
