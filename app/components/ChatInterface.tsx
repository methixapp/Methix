'use client';

import React, { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { FiSend } from 'react-icons/fi';

interface AIResponse {
  response: string;
  additional_info?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string | AIResponse;
}

const Chat_interface: React.FC = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: 'assistant',
      content: {
        response: "👋 Welcome! I'm your AI Music Manager, ready to help you navigate your music career.",
        additional_info: "Feel free to ask about music production, marketing, distribution, or career advice."
      }
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: input };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...chatHistory,
            { role: 'user', content: input }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        role: 'assistant',
        content: {
          response: data.content || data.message?.content || "I apologize, but I couldn't process that request.",
          additional_info: data.additional_info
        }
      };

      setChatHistory(prev => [...prev, aiMessage]);
      setInput('');
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: {
          response: "I apologize, but I encountered an error. Please try again.",
          additional_info: "Error: " + (error instanceof Error ? error.message : 'Unknown error')
        }
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-6">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-b from-gray-900 to-gray-600 text-transparent bg-clip-text">
            Your AI Music Manager
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Get expert guidance for your music career, available 24/7
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex flex-col h-[85vh] bg-white rounded-2xl shadow-lg mx-auto max-w-4xl w-full border border-gray-200">
          {/* Chat Header */}
          <div className="px-8 py-6 border-b border-gray-100 bg-white rounded-t-2xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">AI Music Manager</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-600">Online and ready to assist</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-6 text-center px-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">🎵</span>
                </div>
                <div className="space-y-2 max-w-md">
                  <h3 className="text-xl font-semibold text-gray-900">Start Your Musical Journey</h3>
                  <p className="text-gray-600">
                    Ask me anything about music production, marketing, or career development. I'm here to help!
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                  {[
                    "How do I promote my music?",
                    "Tips for music production?",
                    "How to get more streams?",
                    "Career development advice?"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(suggestion)}
                      className="p-3 text-sm text-zinc-300 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 
                               transition-colors border border-zinc-700/50 hover:border-zinc-600/50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user' 
                      ? 'bg-zinc-700 text-white ml-4' 
                      : 'bg-zinc-800 text-zinc-100 mr-4'
                  } shadow-lg`}>
                    {typeof message.content === 'object' ? (
                      <div>
                        <p className="leading-relaxed">{message.content.response}</p>
                        {message.content.additional_info && (
                          <p className="mt-2 text-sm text-zinc-400 italic">
                            {message.content.additional_info}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="leading-relaxed">{message.content}</p>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-gray-100/30 rounded-b-2xl border-t border-gray-200/50">
            <div className="flex space-x-4 items-end max-w-4xl mx-auto">
              <textarea
                className="flex-1 p-4 bg-white text-gray-900 rounded-xl border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300
                         placeholder-gray-400 resize-none min-h-[50px] max-h-[200px]
                         shadow-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about your music career..."
                disabled={isLoading}
                rows={1}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="p-4 bg-gray-700/80 text-white rounded-xl hover:bg-gray-600/80 
                         focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:ring-offset-2 
                         focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200 ease-in-out"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiSend className="w-6 h-6" />
                )}
              </button>
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat_interface;
