export default function DashboardPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 max-w-lg w-full bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-600">
            Explore your personalized settings and manage your account here.
          </p>
          <ul className="mt-6 space-y-3">
            <li>
              <a
                href="/profile"
                className="block bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
              >
                View Profile
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
              >
                Account Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  