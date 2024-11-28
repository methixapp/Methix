export default function ThankYouPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 max-w-lg w-full bg-white shadow-md rounded-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h1>
          <p className="text-gray-600">You have successfully signed out. We hope to see you again soon!</p>
          <a
            href="/"
            className="mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }
  