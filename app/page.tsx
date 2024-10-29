import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <header className="p-6 flex items-center bg-white shadow-md">
        <Image
          src="/ajamlogo.jpg"
          alt="Methix Logo"
          width={60}
          height={60}
          className="mr-4"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Methix</h1>
          <p className="text-lg text-gray-600">Your AI Music Manager</p>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Empower Your Music Career</h2>
        <p className="text-xl mb-8 max-w-2xl text-gray-700">
          Methix is an AI-driven platform designed to serve as a virtual manager for independent artists. 
          Navigate the music industry with personalized guidance and powerful tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <FeatureCard 
            title="AI-Driven Career Advice" 
            description="Get personalized career guidance tailored to your unique journey."
            icon="🧠"
            href="/chat"
          />
          <FeatureCard 
            title="Collaboration Opportunities" 
            description="Connect with fellow artists and industry professionals."
            icon="🤝"
            href="/connect-with-artists"
          />
          <FeatureCard 
            title="Career Roadmap" 
            description="Set, track, and achieve your music career milestones."
            icon="🗺️"
            href="/career-roadmap"
          />
          <FeatureCard 
            title="Resources" 
            description="Access a curated library of tools, career guides, and mental health support tailored for artists."
            icon="📚"
            href="/resources"
          />
        </div>

        <Link href="/signup" className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
          Start Your Journey
        </Link>
      </main>

      <footer className="p-6 text-center bg-gray-200 text-gray-600">
        <p>&copy; 2024 Methix. Empowering independent artists.</p>
      </footer>
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
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
        <div>
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="mt-4 text-black font-semibold">Learn More →</div>
      </div>
    </Link>
  );
}
