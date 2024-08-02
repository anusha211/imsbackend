
// src/routes/authRoutes.ts

import { Router } from 'express';
import { register, login, refreshToken, logout } from '../controllers/authController';

const authrouter = Router();

// Register a new user
authrouter.post('/register', register);

// Login user and return JWT tokens
authrouter.post('/login', login);

// Refresh access token
authrouter.post('/refresh', refreshToken);

// Logout user
authrouter.post('/logout', logout);

export default authrouter;
