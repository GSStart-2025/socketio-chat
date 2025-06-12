'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Call socket endpoint once
    fetch('/api/socket');

    const socketInstance = io({
      path: '/api/socket',
      transports: ['websocket'], // optional, but ensures only websockets
    });

    setSocket(socketInstance);
    socketInstance.on('chat message', (msg: string) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message && socket) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">💬 Web Chat</h1>
      <div className="mt-4 border p-4 h-64 overflow-y-scroll bg-gray-100">
        {chat.map((msg, i) => (
          <div key={i} className="text-sm mb-1">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="mt-2 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Type message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Send
        </button>
      </form>
    </main>
  );
}
