// pages/api/socket.ts
import type { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../types/next';
import { initSocket } from '../../socketServer';

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io...');
    initSocket(res.socket.server as any);
    res.socket.server.io = true;
  }

  res.end();
}
