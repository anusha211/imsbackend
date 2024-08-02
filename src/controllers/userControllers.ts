import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import { Internship } from '../models/Internship';
import { any } from 'joi';
import bcrypt from 'bcrypt';
import { Any } from 'typeorm';

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
    const internshipRepository=AppDataSource.getRepository(Internship);
  
    const { name, email, password,age, internshipId } = req.body;
    const user = await userRepository.findOne({
      where:{ id: parseInt(req.params.id) },
      relations:['internship'],
    });
    if (user) {
      const internshipnew = internshipId? await internshipRepository.findOne({ where: { id: internshipId } }) 
      : undefined;
      const updatedData:Partial<User> = {
        name,
        email,
        password: await bcrypt.hash(password,10),
        age,
        internship:internshipnew||user.internship,
      }
      userRepository.merge(user,updatedData );
      const updatedUser = await userRepository.save(user);
      res.status(200).json({updatedUser,message:'user updated'});
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


// Create a new user and associate with an internship
export const createUserWithInternship = async (req: Request, res: Response) => {
  const { name, email, age,password, internshipId } = req.body;

  try {
    const internshipRepository = AppDataSource.getRepository(Internship);
    const internship = await internshipRepository.findOneBy({ id: internshipId });

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({
      name,
      email,
      password:hashedPassword,
      age,
      internship, // Associate user with internship
    });

    await userRepository.save(newUser);

    return res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
