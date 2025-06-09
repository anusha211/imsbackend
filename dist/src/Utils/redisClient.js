"use strict";
// src/utils/redisClient.ts
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: 'redis://127.0.0.1:6379', // Adjust the Redis URL as needed
});
redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect().then(() => {
    console.log('Connected to Redis');
});
exports.default = redisClient;
