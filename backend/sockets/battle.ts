 
import { Server } from 'socket.io';
import Battle from '../models/Battle.js';

export default function setupBattleSocket(server:any) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinBattle', ({ battleId, userId }) => {
      socket.join(battleId);
      io.to(battleId).emit('userJoined', userId);
    });

    socket.on('codeSubmitted', async ({ battleId, userId, result }) => {
      await Battle.findByIdAndUpdate(battleId, {
        $push: {
          submissions: { user: userId, ...result, time: new Date() }
        }
      });

      io.to(battleId).emit('submissionUpdate', { userId, result });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}
