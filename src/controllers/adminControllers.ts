// src/controllers/adminController.ts

import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { Role } from '../models/Role';
import { Internship } from '../models/Internship';
import esclient from '../Utils/elasticsearchClient';

//create function to index the user
async function indexUser(user: User) {
  await esclient.index({
    index: 'users',
    id: user.id.toString(),
    body: {
      name: user.name,
      email: user.email,
      age: user.age,
      internship:user.internship,
      role: user.role,
    },
  });
}

async function deleteIndexedUser(userId: number) {
  console.log('deleteindedxeduser function called!')
  try {
    await esclient.delete({
      index: 'users',
      id: userId.toString(),
    });
    console.log(`User with ID ${userId} deleted from Elasticsearch.`);
  } catch (error) {
    console.error(`Failed to delete user with ID ${userId} from Elasticsearch:`, error);
    throw error;
  }
}



export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password,age,internshipId, role_id } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);
    const internshipRepository = AppDataSource.getRepository(Internship);


    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const internship = await internshipRepository.findOneBy({ id: internshipId });
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    const role = await roleRepository.findOneBy({ id: role_id });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      age,
      internship,
      role,
    });

    const saveduser= await userRepository.save(user);
       //index the user
   await indexUser(saveduser);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { name, email, role_id } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const role = await roleRepository.findOneBy({ id: role_id });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role;

    await userRepository.save(user);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userID=user.id;
    
    console.log('/////now deleting from Database.');
    await userRepository.remove(user);

   // Delete the user from Elasticsearch
    console.log('User deleted from database, now deleting from Elasticsearch.');
    await deleteIndexedUser(userID);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const assignUserRole = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { roleId } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const role = await roleRepository.findOneBy({ id: roleId });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    user.role = role;
    await userRepository.save(user);

    res.status(200).json({ message: 'Role assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
