// src/controllers/authController.ts

// Import necessary modules
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Internship } from '../models/Internship';
import { Role } from '../models/Role';
import nodemailer from 'nodemailer';
import esclient from '../Utils/elasticsearchClient';
//import redisClient from '../Utils/redisClient';

// Constants for JWT secrets and expiration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret';
const ACCESS_TOKEN_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '7d';

// Get the repository for user entity
const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);

//create function to index the user
async function indexUser(user: User) {
  await esclient.index({
    index: 'users',
    id: user.id.toString(),
    body: {
      name: user.name,
      email: user.email,
      age: user.age,
      role: user.role,
    },
  });
}

// Register a new user

export const register = async (req: Request, res: Response) => {
  
  try {
    const { name, email, password,age,internshipId, role_id } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);
    const internshipRepository = AppDataSource.getRepository(Internship);
    // Nodemailer transporter configuration
    const transporter = nodemailer.createTransport({
     service: 'Gmail', // or your email service
     secure:false,
     port:465,
     auth: {
     user: 'pikachupika347@gmail.com',
     pass: 'krsu gxaj ruvm feum',
      },
   });

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const role = await roleRepository.findOneBy({ id: 2 });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      age,
      role,
    });
    const saveduser= await userRepository.save(user);

   //index the user
   await indexUser(saveduser);

  // Send welcome email
        await transporter.sendMail({
          from: 'UBAims<pikachupika347@gmail.com>',
          to: email,
          subject: 'Welcome to Our Service',
          text: `Hello ${name},\n\nThank you for signing up! We're glad to have you.\n\nBest regards,\nYour Company`,
        });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


// Login user and issue JWT tokens
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password} = req.body;

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
    const userdata = await userRepository.findOne({
      where: { id:user.id },
      relations: ['role'],
    });
    console.log(userdata?.role.name);
    const rname1=userdata?.role.name;
    const newdata:JwtPayload={id:user.id,role:rname1};

    // Generate Access Token
    const accessToken = jwt.sign(newdata, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    // Generate Refresh Token
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    // Save refresh token in Redis with an expiration
   // await redisClient.setEx(user.id.toString(), 7 * 24 * 60 * 60, refreshToken);

    // Return the tokens
    return res.status(200).json({ accessToken, refreshToken,role:rname1});
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

const tokenBlacklist: Set<string> = new Set();
export const logout = async (req: Request, res: Response) => {
  
  try {
    const token = req.headers.authorization?.split(' ')[1];

    // Verify the refresh token
   // const decoded: any = jwt.verify(token, REFRESH_TOKEN_SECRET);

    // Remove the refresh token from Redis
   // await redisClient.del(decoded.id.toString());
     // Blacklist the JWT token
     if (!token) {
      // If token is missing in the request header
      return res.status(401).json({ message: 'Authorization token required' });
    }

   tokenBlacklist.add(token);

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Middleware to check if token is blacklisted
export const isTokenBlacklisted = (token: string): boolean => {
  return tokenBlacklist.has(token);
};