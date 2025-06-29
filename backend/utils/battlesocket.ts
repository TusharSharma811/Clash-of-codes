import { Server, Socket } from "socket.io";
import { enqueuePlayer } from "./matcher.ts";

export default function battleSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinMatchmaking", async ({ userId, username, difficulty }) => {
      console.log(`${username} joined ${difficulty} queue`);
      await enqueuePlayer(difficulty, { socketId: socket.id, userId, username }, io);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}