// src/Hooks/useSocketConnect.ts
import { useEffect } from 'react';
import { useSocketStore } from '@/Store/socketstore';

export const useSocketConnect = (url: string = "http://localhost:5000") => {
  const connectSocket = useSocketStore((state) => state.connectSocket);
  const disconnectSocket = useSocketStore((state) => state.disconnectSocket);

  useEffect(() => {
    connectSocket(url);

    // Only disconnect on full unmount (e.g., app shutdown)
    return () => {
      disconnectSocket();
    };
  }, [url, connectSocket, disconnectSocket]);
};
