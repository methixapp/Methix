import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const chatPayload = {
        messages: [
          ...messages,
          { role: 'user', content: message }
        ]
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, 
        { role: 'user', content: message },
        { role: 'assistant', content: data.content }
      ]);
      setMessage('');

    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4 h-[500px] overflow-y-auto border rounded p-4">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`mb-4 p-2 rounded ${
              msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-gray-500">Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Send
        </button>
      </form>
    </div>
  );
} 