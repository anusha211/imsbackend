import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { name, email, password, age } = req.body;
    const newUser = userRepository.create({ name, email, password, age});
    const savedUser = await userRepository.save(newUser);
    res.status(201).json(savedUser);
  } catch (error: any) {  // Specify error type as 'any' or 'Error'
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  console.log('getusers endpoint hit'); // Debugging log
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (error: any) {  // Specify error type as 'any' or 'Error'
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {  // Specify error type as 'any' or 'Error'
    res.status(500).json({ message: error.message });
  }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { name, email, password } = req.body;
    const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
    if (user) {
      userRepository.merge(user, { name, email, password });
      const updatedUser = await userRepository.save(user);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {  // Specify error type as 'any' or 'Error'
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {  // Specify error type as 'any' or 'Error'
    res.status(500).json({ message: error.message });
  }
};
