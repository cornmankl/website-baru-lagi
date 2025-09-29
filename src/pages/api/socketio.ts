import { Server } from 'socket.io';
import { setupSocket } from '@/lib/socket';
import type { NextApiRequest, NextApiResponse } from 'next';

// Extend the NextApiResponse to include the socket server
interface SocketApiResponse extends NextApiResponse {
  socket: {
    server: {
      io?: Server;
    };
  };
}

const socketioHandler = (req: NextApiRequest, res: SocketApiResponse) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server as any, {
      path: '/api/socketio',
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    res.socket.server.io = io;
    setupSocket(io);
  }
  res.end();
};

export default socketioHandler;