// utils/matchmaker.ts
import redis from "../config/redis.ts"
import { Server, Socket } from "socket.io";

type PlayerData = {
  socketId: string;
  userId: string;
  username: string;
};

const QUEUE_PREFIX = "matchmaking:";

export async function enqueuePlayer(
  difficulty: string,
  player: PlayerData,
  io: Server
) {
  const queueKey = `${QUEUE_PREFIX}${difficulty}`;

  // Push to Redis queue

  if (!player || !player.socketId || !player.userId || !player.username) {
    console.error("Invalid player data:", player);
    return;
  }
  if (!io.sockets.sockets.has(player.socketId)) {
    console.error(`Socket ${player.socketId} not found in connected sockets`);
    return;
  }
  
  await redis.rpush(queueKey, JSON.stringify(player));

  const queueLength = await redis.llen(queueKey);
  console.log(`Queue length for ${queueKey}: ${queueLength}`);
  
  if (queueLength >= 2) {
    // Pop 2 players
    const playersData = await redis.lpop(queueKey, 2);
    if (!playersData || playersData.length < 2) return;
    
    const [player1Data, player2Data] = playersData;
    if (!player1Data || !player2Data) return;

    const player1: PlayerData = JSON.parse(player1Data);
    const player2: PlayerData = JSON.parse(player2Data);

    // Create a unique room
    const roomId = `room:${player1.socketId.slice(0, 5)}${player2.socketId.slice(0, 5)}`;
    
   

    // Join both to the room
    io.sockets.sockets.get(player1.socketId)?.join(roomId);
    io.sockets.sockets.get(player2.socketId)?.join(roomId);

    return {
      roomId,
      players: [player1, player2],
    };
  }
}

