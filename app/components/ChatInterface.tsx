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
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [welcomeMessage, setWelcomeMessage] = useState("Hi! Let's make music magic together."); // Default welcome message
  const [theme, setTheme] = useState("default"); // Theme selection
  const [showThemeModal, setShowThemeModal] = useState(false); // Modal visibility

  const themeBackgrounds: Record<string, string> = {
    default: "",
    vintage: "url('/vinyl.png')",
    stage: "url('/stage-lights.jpg')",
    acoustic: "url('/acoustic-vibes.jpg')",
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'prompts' }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch prompts');
        }

        const data = await response.json();
        setSuggestedPrompts(data.prompts || []);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };

    fetchPrompts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Failed to get response');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.content,
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
      className="h-screen w-screen flex flex-col"
      style={{
        backgroundImage: themeBackgrounds[theme],
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Welcome Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <h1
          className={`text-2xl font-semibold tracking-wide ${
            theme === "stage" ? "text-white" : "text-black"
          }`}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            wordWrap: "break-word",
            lineHeight: "1.4em",
            ...(theme === "acoustic" && { textAlign: "left", marginLeft: "50px" }),
          }}
        >
          {welcomeMessage}
        </h1>
        <button
          onClick={() => setShowThemeModal(true)}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Choose Theme
        </button>
      </header>

      {/* Chat Content */}
      <main className="flex-1 flex flex-col px-6 py-4">
        {/* Chat Messages */}
        <div
          className="overflow-y-auto flex-1 rounded-lg shadow-inner p-6 space-y-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] p-4 rounded-lg ${
                msg.role === 'user'
                  ? 'ml-auto bg-gray-300 text-black'
                  : 'bg-gray-200 text-black'
              }`}
              style={{
                backgroundColor: msg.role === "user" ? "rgba(220, 220, 220, 0.8)" : "rgba(200, 200, 200, 0.8)",
              }}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && <div className="text-gray-500 animate-pulse">Loading...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div
          className="flex justify-center mt-8 rounded-md shadow-md p-6"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency
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
                    backgroundColor: "rgba(200, 200, 200, 0.8)", // Slight transparency
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

        {/* Input Field */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 mt-4 rounded-lg shadow-md p-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
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
                { name: "Vintage Vinyl", value: "vintage", icon: "🎙️", image: "/vinyl.png" },
                { name: "Vibrant Stage Lights", value: "stage", icon: "🎤", image: "/stage-lights.jpg" },
                { name: "Calm Acoustic Vibes", value: "acoustic", icon: "🎸", image: "/acoustic-vibes.jpg" },
              ].map((themeOption) => (
                <li
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setShowThemeModal(false);
                  }}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src={themeOption.image}
                    alt={themeOption.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
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
