 
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import redis from './config/redis.ts';
import authRoutes from './routes/auth.ts';
import battleRoutes from './routes/battles.ts';
import problemRoutes from './routes/problems.ts';
import setupSocketHandlers from './sockets/index.ts';
import submissionRouter from './routes/submission.ts';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/battles', battleRoutes);
app.use('/api/problems', problemRoutes);
app.use("/api/code", submissionRouter);
setupSocketHandlers(io);

redis.on('connect', () => {
  console.log('Connected to Redis');
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDB()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));
  console.log(`Server running on port ${PORT}`)
});