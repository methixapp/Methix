'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMusic } from 'react-icons/fi'; // Music icon for prompts

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="h-screen w-screen bg-white flex flex-col">
      {/* Welcome Header */}
      <header className="text-center py-6">
        <h1
          className="text-5xl font-bold tracking-wide text-black"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Welcome to Methix
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Your personalized music assistant
        </p>
      </header>

      {/* Chat Content */}
      <main className="flex-1 flex flex-col justify-between px-6 py-4">
        {/* Chat Messages */}
        <div className="overflow-y-auto flex-1 bg-gray-100 rounded-lg shadow-inner p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] p-4 rounded-lg ${
                msg.role === 'user'
                  ? 'ml-auto bg-gray-300 text-black'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && <div className="text-gray-500 animate-pulse">Loading...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="bg-gray-50 mt-4 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Try asking...
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedPrompts.map((prompt, index) => (
              <li
                key={index}
                className="p-4 flex items-center gap-4 bg-gray-200 hover:bg-gray-300 rounded-lg shadow cursor-pointer transition"
                onClick={() => setInput(prompt)}
              >
                <FiMusic className="text-gray-600 text-2xl" />
                <span className="text-gray-800 font-medium">{prompt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Input Field */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 mt-4 bg-white rounded-lg shadow-md p-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How can I help?"
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
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
    </div>
  );
}
