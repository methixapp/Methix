import Link from 'next/link';

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <p className="mb-6">Sign in to access your personalized dashboard.</p>
        <Link href="/api/auth/signin">
          <a className="block bg-black text-white py-2 px-4 rounded text-center hover:bg-gray-800">
            Sign In with Microsoft
          </a>
        </Link>
      </div>
    </div>
  );
}
