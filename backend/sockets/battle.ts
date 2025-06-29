import { Server, Socket } from 'socket.io';
import  Battle  from "../models/Battle.ts";
import Problem from "../models/Problem.ts";

type PlayerData = {
  socketId: string;
  userId: string;
  username: string;
};
export default function registerBattleHandlers(io: Server, socket: Socket) {
  socket.on('submitCode', ({ code, language }) => {
    // broadcast to opponent in room
    const room = Array.from(socket.rooms).find((r) => r !== socket.id);
    if (room) {
      io.to(room).emit('opponentSubmitting', { socketId: socket.id });
    }
  });

  socket.on('testCasePassed', ({ caseId }) => {
    const room = Array.from(socket.rooms).find((r) => r !== socket.id);
    if (room) {
      io.to(room).emit('opponentPassedCase', { caseId });
    }
  });

  
}


export async function getRandomQuestion(difficulty: string) {
  const count = await Problem.countDocuments({ difficulty });
  const rand = Math.floor(Math.random() * count);
  return await Problem.findOne({ difficulty }) ;
}
export const handleStartBattle = async (io : Server, roomId: string, player1 : PlayerData, player2 : PlayerData, difficulty: string) => {
  const question = await getRandomQuestion(difficulty);
  console.log(difficulty, question);
  
  console.log(`Starting battle in room ${roomId} with question: ${question?.title}`);
  
   io.to(player1.socketId).emit("startBattle", {
      roomId,
      players: [player1, player2],
      yourId: player1.userId,
      question
    });

    io.to(player2.socketId).emit("startBattle", {
      roomId,
      players: [player1, player2],
      yourId: player2.userId,
      question
    });
    
  const battle = await Battle.create({
    roomId,
    players: [
      { userId: player1.userId, username: player1.username, score: 0 },
      { userId: player2.userId, username: player2.username, score: 0 },
    ],
    questionId: question?._id,
    startedAt: new Date(),
  });

  // Emit to both players

   // Notify both sockets
   
};
