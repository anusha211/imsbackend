"use strict";
// src/routes/authRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authrouter = (0, express_1.Router)();
// Register a new user
authrouter.post('/register', authController_1.register);
// Login user and return JWT tokens
authrouter.post('/login', authController_1.login);
// Refresh access token
authrouter.post('/refresh', authController_1.refreshToken);
// Logout user
authrouter.post('/logout', authController_1.logout);
exports.default = authrouter;
