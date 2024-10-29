'use client'

import { usePathname } from 'next/navigation'

const TopBar = () => {
  const pathname = usePathname()

  const pageNames: { [key: string]: string } = {
    '/': 'Home',
    '/chat': 'Chat',
    '/career-roadmap': 'Career Roadmap',
    '/resources': 'Resources',
    '/connect-with-artists': 'Connect with Artists',
    '/profile': 'Profile',
    '/signin': 'Sign In'
  }

  const screenName = pageNames[pathname] || 'Methix'  // Default to 'Methix' if path not found

  return (
    <header className="bg-white shadow-sm p-4">
      <h2 className="text-xl font-semibold text-text">{screenName}</h2>
    </header>
  )
}

export default TopBar
