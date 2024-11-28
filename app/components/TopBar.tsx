'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const TopBar = () => {
  const pathname = usePathname();

  const pageNames: { [key: string]: string } = {
    '/': 'Home',
    '/chat': 'Chat',
    '/career-roadmap': 'Career Roadmap',
    '/resources': 'Resources',
    '/connect-with-artists': 'Connect with Artists',
    '/profile': 'Profile',
    '/signin': 'Sign In',
  };

  const screenName = pageNames[pathname] || 'Methix'; // Default to 'Methix' if path not found

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-sm">
      {/* Left: Navigation Links */}
      <div className="flex items-center">
        <Image
          src="/ajamlogo.jpg"
          alt="A Jam Logo"
          width={40}
          height={40}
          className="mr-4"
        />
        <nav className="flex gap-6">
          <Link href="/" className="text-lg font-semibold hover:underline">
            Home
          </Link>
          <Link href="/chat" className="text-lg font-semibold hover:underline">
            Chat
          </Link>
          <Link href="/career-roadmap" className="text-lg font-semibold hover:underline">
            Career Roadmap
          </Link>
          <Link href="/resources" className="text-lg font-semibold hover:underline">
            Resources
          </Link>
          <Link href="/connect-with-artists" className="text-lg font-semibold hover:underline">
            Connect
          </Link>
        </nav>
      </div>

      {/* Right: Sign In */}
      <Link
        href="/signin"
        className="text-lg font-semibold hover:underline"
      >
        Sign In
      </Link>
    </header>
  );
};

export default TopBar;
