import { Server, Socket } from 'socket.io';
import registerMatchmakingHandlers from './matchmaking.ts';
import registerBattleHandlers from './battle.ts';
import registerEditorHandlers from './editor.ts';

export default function setupSocketHandlers(io: Server) {
  io.on('connect', (socket: Socket) => {
    console.log(`🔌 Connected: ${socket.id}`);

    // // Delegate to modules
    registerMatchmakingHandlers(io, socket);
    registerBattleHandlers(io, socket);
    registerEditorHandlers(io, socket);

    socket.on('disconnect', () => {
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });
}
