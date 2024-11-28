import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <p className="mb-6">Create an account to get started.</p>
        <Link href="/api/auth/signup">
          <a className="block bg-black text-white py-2 px-4 rounded text-center hover:bg-gray-800">
            Sign Up with Microsoft
          </a>
        </Link>
      </div>
    </div>
  );
}
