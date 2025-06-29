import { Server, Socket } from 'socket.io';

export default function registerEditorHandlers(io: Server, socket: Socket) {
  socket.on('codeChange', ({ code }) => {
    const room = Array.from(socket.rooms).find((r) => r !== socket.id);
    if (room) {
      socket.to(room).emit('opponentCodeChange', { code });
    }
  });
}
