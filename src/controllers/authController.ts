// src/controllers/authController.ts

// Import necessary modules
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Internship } from '../models/Internship';
//import redisClient from '../Utils/redisClient';

// Constants for JWT secrets and expiration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret';
const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '7d';

// Get the repository for user entity
const userRepository = AppDataSource.getRepository(User);

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, age,internshipId } = req.body;

    // Check if the user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const internshipRepository = AppDataSource.getRepository(Internship);
    const internship = await internshipRepository.findOneBy({ id: internshipId });

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      age,
    });

    await userRepository.save(user);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Login user and issue JWT tokens
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate Access Token
    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    // Generate Refresh Token
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    // Save refresh token in Redis with an expiration
   // await redisClient.setEx(user.id.toString(), 7 * 24 * 60 * 60, refreshToken);

    // Return the tokens
    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Refresh the access token using the refresh token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    // Verify the refresh token
    const decoded: any = jwt.verify(token, REFRESH_TOKEN_SECRET);

    // Check if the refresh token exists in Redis
   // const storedToken = await redisClient.get(decoded.id.toString());

   // if (storedToken !== token) {
   //   return res.status(401).json({ message: 'Invalid refresh token' });
   // }

    // Generate a new access token
    const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// Logout user by invalidating the refresh token
export const logout = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    // Verify the refresh token
    const decoded: any = jwt.verify(token, REFRESH_TOKEN_SECRET);

    // Remove the refresh token from Redis
   // await redisClient.del(decoded.id.toString());

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
