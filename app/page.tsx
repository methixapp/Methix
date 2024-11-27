import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const userName = "Artist"; // Placeholder for dynamic user name
  const personalizedMessage = `Welcome to your creative space, ${userName}!`;

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col relative">
        {/* Subtle background soundwave */}
        <div className="absolute inset-0 bg-[url('/soundwave.jpg')] bg-cover bg-fixed opacity-20 z-0"></div>

        {/* Header */}
        <header className="p-6 flex items-center justify-between bg-gray-900 shadow-md bg-opacity-95 relative z-10">
          <div className="flex items-center">
            <Image
              src="/ajamlogo.jpg"
              alt="Methix Logo"
              width={60}
              height={60}
              className="mr-4 rounded-full shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Methix
              </h1>
              <p className="text-lg text-gray-300">Your AI Music Manager</p>
            </div>
          </div>
          <Link
            href="/chat"
            className="py-2 px-6 rounded-full text-sm font-medium text-white bg-gradient-to-r from-gray-200 to-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.5)",
            }}
          >
            Chat with Your AI Manager
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center relative z-10">
          {/* Personalized Message */}
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-100 to-white">
            {personalizedMessage}
          </h2>
          <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400">
            Empower Your Music Career
          </h2>
          <p className="text-xl mb-8 max-w-3xl text-gray-300 leading-relaxed">
            Methix is your personal AI manager, created to support and empower
            independent artists like you. Navigate the music industry with
            tailored guidance, collaboration opportunities, and tools designed to
            elevate your career.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <FeatureCard
              title="AI-Driven Career Advice"
              description="Get personalized career guidance tailored to your unique journey."
              icon="🎶"
              href="/chat"
            />
            <FeatureCard
              title="Collaboration Hub"
              description="Connect with fellow artists and industry professionals."
              icon="🎤"
              href="/connect-with-artists"
            />
            <FeatureCard
              title="Music Roadmap"
              description="Set, track, and achieve your music career milestones."
              icon="🎧"
              href="/career-roadmap"
            />
            <FeatureCard
              title="Artist Tools"
              description="Access curated tools, career guides, and mental health support."
              icon="🎹"
              href="/resources"
            />
          </div>

          {/* Call to Action */}
          <Link
            href="/signup"
            className="bg-gradient-to-r from-gray-200 to-gray-100 text-gray-900 font-bold py-3 px-6 rounded-full text-lg transition duration-300 hover:from-gray-300 hover:to-white hover:shadow-lg shadow-md"
            style={{
              boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.7)",
            }}
          >
            Start Your Journey
          </Link>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center bg-gray-800 text-gray-400">
          <p>&copy; 2024 Methix. Empowering independent artists.</p>
        </footer>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

function FeatureCard({ title, description, icon, href }: FeatureCardProps) {
  return (
    <Link href={href} className="block">
      <div className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col justify-between bg-gray-100 text-gray-900">
        <div>
          <div className="text-5xl mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
        <div className="mt-4 text-gray-700 font-semibold hover:text-black transition duration-300">
          Learn More →
        </div>
      </div>
    </Link>
  );
}
