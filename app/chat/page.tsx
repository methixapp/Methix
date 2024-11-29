import React from 'react';
import ChatInterface from '../components/ChatInterface';
import Sidebar from '../components/Sidebar';

export default function ChatPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
}
