'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMusic } from 'react-icons/fi'; // Music icon for prompts

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    "Who’s a good contact for Hip-Hop and R&B in the music industry?",
    "How do I get on Spotify playlists?",
    "How do I submit my music to the GRAMMYs?",
  ]);
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hi, Taylor. Welcome to our creative home. I’m your music manager. Let’s make things happen." // Demo Day Message
  );

  // Uncomment the following for dynamic welcome message fetching in the future
  /*
  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await fetch('/api/welcome-message', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch welcome message');
        }

        const data = await response.json();
        setWelcomeMessage(data.message || welcomeMessage);
      } catch (error) {
        console.error('Error fetching welcome message:', error);
      }
    };

    fetchWelcomeMessage();
  }, []);
  */

  const [theme, setTheme] = useState("default"); // Theme selection
  const [showThemeModal, setShowThemeModal] = useState(false); // Modal visibility

  const themeBackgrounds: Record<string, string> = {
    default: "", // Plain gradient background
    vintage: "url('/vinyl.png')",
    acoustic: "url('/acoustic-vibes.jpg')",
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      let responseContent;

      // Predefined responses for specific demo day prompts
      if (input === "Who’s a good contact for Hip-Hop and R&B in the music industry?") {
        responseContent =
          "Name: Walter J. Tucker\nTitle: Hip-Hop and R&B Partnerships Lead at Apple Music\n\nWhy He’s Important:\nWalter J. Tucker plays a vital role in helping artists gain visibility on Apple Music, particularly in the Hip-Hop and R&B genres. He can assist with play listing opportunities or connect you with colleagues for other genre-specific needs within the platform. His expertise and networking skills make him an essential contact for artists aiming to grow their audience.\n\nHow to Connect:\n1. Attend Networking Events:\n- Walter J. Tucker is the host of Being Indie is Major, a networking and showcase series for independent artists in Los Angeles, California.\n* Follow the Instagram page: @BeingIndieIsMajor\n* Stay updated on upcoming events and attend to introduce yourself or network with others in the music industry.\n2. Engage on Social Media:\n- Personal Instagram: @LiveTheBiz\n- Engage with his posts by liking, commenting, or sharing relevant content to build rapport.\n- Consider sending him a direct message (DM) with a clear and professional introduction, explaining how you admire his work and why you’d like to connect.\n3. Use Creative Ice Breakers:\n- Walter J. Tucker is a hat connoisseur, with a particular love for top hats. A thoughtful comment or casual conversation about hats could serve as an effective icebreaker.";
      } else if (input === "How do I get on Spotify playlists?") {
        responseContent =
          "Understanding Playlists and How to Get Featured\n\nThree Main Types of Playlists\n1. Editorial Playlists\n- Curated by in-house teams from platforms like Spotify, Apple Music, or Tidal.\n- Example: African Heat (Spotify's popular Afrobeats playlist).\n- How to Submit:\n  - Submit your song through Spotify for Artists at least one week before its release.\n  - Use the submission feature in your artist profile's backend to pitch to the editorial team.\n- Tips for Success:\n  - Build relationships with editorial curators.\n  - Focus on high-quality music and strong performance metrics (streams, saves, and engagement).\n2. Algorithmic Playlists\n- Data-driven playlists based on listeners’ preferences and engagement.\n- Examples: Discover Weekly or Release Radar on Spotify.\n- How to Get Featured:\n  - Encourage fans to save your songs and listen all the way through without skipping.\n  - Drive high engagement with your current audience to boost your song’s visibility.\n3. User-Generated Playlists\n- Curated by individual users, influencers, or music enthusiasts.\n- Examples: Playlists created by niche influencers or popular music bloggers.\n- How to Get Featured:\n  - Research influencers and playlist curators in your genre.\n  - Build relationships and target smaller to mid-sized playlists before aiming for larger ones.";
      } else if (input === "How do I submit my music to the GRAMMYs?") {
        responseContent =
          "GRAMMY Submission Guide for Artists\n\nKey Administrative Tasks:\n- Liner Notes: Always document your liner notes after recording a project. Include full credits for all contributors.\n- Metadata: Keep track of ISRC (International Standard Recording Code) and UPC (Universal Product Code) numbers, provided by distributors such as TuneCore or CD Baby.\n- Press Assets: Secure a high-quality press photo and document the photographer's name and contact information.\n\nSubmission Process:\n- Eligibility Check: Confirm your project aligns with GRAMMY eligibility guidelines.\n- Access to Submission Portal: Only Recording Academy members can access the portal.\n- If you’re not a member, connect with someone who is.\n\nHow to Connect with Arnaecia Alridge:\n- Who is Arnaecia Alridge? GRAMMY Board member and Chair of Education for the GRAMMY Texas Chapter.\n- Instagram: @arnaecia.";
      } else {
        // Generic API response for other inputs
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.details || 'Failed to get response');
        responseContent = data.content;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: responseContent,
        },
      ]);
    } catch (error) {
      console.error('Detailed error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${
            error instanceof Error ? error.message : 'Unknown error occurred'
          }`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
    className="min-h-screen w-screen flex flex-col"
    style={{
      background: theme === "default"
        ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(235, 235, 235, 0.85))"
        : `linear-gradient(to bottom, rgba(245, 245, 245, 0.95), rgba(225, 225, 225, 0.6)), ${themeBackgrounds[theme]}`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}
    >
      {/* Welcome Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <div
          className="rounded-lg px-4 py-2 bg-white shadow-md"
          style={{
            marginLeft: "50px",
            maxWidth: "calc(100% - 200px)",
          }}
        >
          <h1
            className="text-1.5xl font-semibold tracking-wide text-black"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              wordWrap: "break-word",
              lineHeight: "1.4em",
            }}
          >
            {welcomeMessage}
          </h1>
        </div>
        <button
          onClick={() => setShowThemeModal(true)}
          className="px-3 py-1 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Choose Theme
        </button>
      </header>

      {/* Chat Content */}
      <main className="flex-1 flex flex-col px-6 py-4">
        {messages.length > 0 && (
          <div
            className="overflow-y-auto flex-1 rounded-lg shadow-inner p-6 space-y-4"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[60%] p-4 rounded-lg ${
                  msg.role === 'user'
                    ? 'ml-auto bg-gray-200 text-black'
                    : 'bg-gray-100 text-black'
                }`}
                style={{
                  backgroundColor: msg.role === "user"
                    ? "rgba(240, 240, 240, 0.9)"
                    : "rgba(230, 230, 230, 0.9)",
                }}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && <div className="text-gray-500 animate-pulse">Loading...</div>}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Suggested Prompts */}
        {messages.filter((msg) => msg.role === "user").length === 0 && (
          <div
            className="flex justify-center mt-8 rounded-md shadow-md p-6"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <div className="w-full max-w-2xl">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
                Try asking...
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestedPrompts.map((prompt, index) => (
                  <li
                    key={index}
                    className="p-4 flex items-center gap-4 bg-gray-200 hover:bg-gray-300 rounded-lg shadow cursor-pointer transition"
                    style={{
                      backgroundColor: "rgba(220, 220, 220, 0.9)",
                    }}
                    onClick={() => setInput(prompt)}
                  >
                    <FiMusic className="text-gray-600 text-2xl" />
                    <span className="text-gray-800 font-medium">{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Input Field */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 mt-4 rounded-lg shadow-md p-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How can I help?"
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 text-black"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            Send
          </button>
        </form>
      </main>

      {/* Theme Selection Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-black">Select Your Music Style</h2>
            <ul className="space-y-3">
              {[
                { name: "Default", value: "default", icon: "🎨" },
                { name: "Vintage Vinyl", value: "vintage", icon: "🎙️" },
                { name: "Calm Acoustic Vibes", value: "acoustic", icon: "🎸" },
              ].map((themeOption) => (
                <li
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setShowThemeModal(false);
                  }}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-3 cursor-pointer"
                >
                  <span className="text-black">{themeOption.icon} {themeOption.name}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowThemeModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}