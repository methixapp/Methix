import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-black font-sans -mt-8">
      {/* Background Vinyl Image */}
      <div className="absolute inset-0 bg-[url('/vinyl.png')] bg-cover bg-center opacity-40 z-0" style={{ height: "105%" }}></div>

      {/* Header with A Jam Logo */}
      <div className="absolute top-12 left-10 z-10">
        <Image
          src="/AJam.png"
          alt="A Jam Logo"
          width={200}
          height={60}
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center relative z-10 p-2 mt-1">
        {/* Methix Logo */}
        <Image
          src="/methixtransparent.png"
          alt="Methix Logo"
          width={400}
          height={400}
          className="mb-0"
        />
        {/* Subheader - elegant font directly below Methix logo */}
        <p className="text-6xl font-light -mt-28 mb-20 tracking-wide">
          Your Virtual Music Manager, Reimagined
        </p>
        {/* CTA */}
        <div className="mt-14">
          <h1 className="text-3xl font-light mb-16 tracking-tight leading-tight max-w-5xl italic">
            Your Guide to the Inside Starts Now. Unlock your Path.
          </h1>
          <Link
            href="/signin"
            className="bg-black text-white py-5 px-14 rounded-full text-3xl font-medium bg-opacity-100 hover:bg-opacity-60 transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
