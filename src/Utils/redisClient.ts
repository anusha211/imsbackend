// src/utils/redisClient.ts

import { createClient } from 'redis';

const redisClient = createClient({
 url:'redis://127.0.0.1:6379', // Adjust the Redis URL as needed


});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect().then(() => {
  console.log('Connected to Redis');
});

export default redisClient;
