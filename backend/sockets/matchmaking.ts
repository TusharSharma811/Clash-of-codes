import { Server, Socket } from 'socket.io';
import { enqueuePlayer } from '../utils/matcher.ts';
import { handleStartBattle } from './battle.ts';
export default function registerMatchmakingHandlers(io: Server, socket: Socket) {
  socket.on('joinMatchmaking', async ({ userId, username, difficulty }) => {
    console.log(`🔍 User ${username} (${userId}) joined matchmaking with difficulty ${difficulty}`);
    
    const result : any = await enqueuePlayer(difficulty, { socketId: socket.id, userId, username }, io);
    
    if (!result) {
      console.error("enqueuePlayer returned undefined");
      return;
    }

    const { roomId, players } = result;
    await handleStartBattle(io, roomId, players[0], players[1], difficulty);
  });
}