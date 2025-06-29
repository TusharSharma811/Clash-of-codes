
// utils/redis.ts
import Redis from "ioredis";

import dotenv from 'dotenv';
dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
   connectTimeout: 10000,
  
});
export default redis;