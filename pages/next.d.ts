// types/next.d.ts
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

export type NextApiResponseServerIO = {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: boolean;
    };
  };
};
