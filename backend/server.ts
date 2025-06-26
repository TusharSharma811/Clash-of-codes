 
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db';

import authRoutes from './routes/auth';
import battleRoutes from './routes/battles';
import problemRoutes from './routes/problems';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/battles', battleRoutes);
app.use('/api/problems', problemRoutes);

io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));