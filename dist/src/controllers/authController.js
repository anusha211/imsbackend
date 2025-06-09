"use strict";
// src/controllers/authController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Internship_1 = require("../models/Internship");
//import redisClient from '../Utils/redisClient';
// Constants for JWT secrets and expiration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret';
const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '7d';
// Get the repository for user entity
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, age, internshipId } = req.body;
        // Check if the user already exists
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const internshipRepository = data_source_1.AppDataSource.getRepository(Internship_1.Internship);
        const internship = yield internshipRepository.findOneBy({ id: internshipId });
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new user
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
            age,
        });
        yield userRepository.save(user);
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.register = register;
// Login user and issue JWT tokens
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare the provided password with the stored hashed password
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate Access Token
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRATION,
        });
        // Generate Refresh Token
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRATION,
        });
        // Save refresh token in Redis with an expiration
        // await redisClient.setEx(user.id.toString(), 7 * 24 * 60 * 60, refreshToken);
        // Return the tokens
        return res.status(200).json({ accessToken, refreshToken });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.login = login;
// Refresh the access token using the refresh token
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
        // Check if the refresh token exists in Redis
        // const storedToken = await redisClient.get(decoded.id.toString());
        // if (storedToken !== token) {
        //   return res.status(401).json({ message: 'Invalid refresh token' });
        // }
        // Generate a new access token
        const newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id }, JWT_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRATION,
        });
        return res.status(200).json({ accessToken: newAccessToken });
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
});
exports.refreshToken = refreshToken;
// Logout user by invalidating the refresh token
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
        // Remove the refresh token from Redis
        // await redisClient.del(decoded.id.toString());
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.logout = logout;
