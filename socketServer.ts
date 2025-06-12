// socketServer.ts
import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: Server | null = null;

export function initSocket(server: HTTPServer) {
  if (!io) {
    io = new Server(server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
      },
    });

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('chat message', (msg) => {
        io?.emit('chat message', msg);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  return io;
}
