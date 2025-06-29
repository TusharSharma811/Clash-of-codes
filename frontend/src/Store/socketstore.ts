// src/Store/socketStore.ts
import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketStore {
  socket: Socket | null;
  connectSocket: (url: string) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,

  connectSocket: (url: string) => {
    const existingSocket = useSocketStore.getState().socket;
    if (existingSocket && existingSocket.connected) return;

    const socket = io(url, {
      transports: ['websocket'],
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = useSocketStore.getState();
    socket?.disconnect();
    set({ socket: null });
  },
}));
