import { Request, Response } from 'express';
import { User } from '../models/User';
import { createUserSchema, updateUserSchema } from '../validation';

let users: User[] = [
  { id: 1, name: 'Anusha Chalise', email: 'anusha@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 25 }
];

export const createUser = (req: Request, res: Response) => {
  const { name, email, age } = req.body;

  const { error } = createUserSchema.validate({ name, email, age });

  if (error) {
    // Different error messages based on conditions
    if (error.details.some((detail) => detail.type === 'string.base')) {
      return res.status(400).json({ error: 'Name must be a string' });
    }
    if (error.details.some((detail) => detail.type === 'string.email')) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (error.details.some((detail) => detail.type === 'number.base')) {
      return res.status(400).json({ error: 'Age must be a number' });
    }

    // Default error message
  //  return res.status(400).json({ error: 'Invalid data provided' });
  }

  const newUser: User = { id: users.length + 1, name, email, age };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const updateUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  const { error } = updateUserSchema.validate({ name, email, age });

  if (error) {
    // Different error messages based on conditions
    if (error.details.some((detail) => detail.type === 'string.base')) {
      return res.status(400).json({ error: 'Name must be a string' });
    }
    if (error.details.some((detail) => detail.type === 'string.email')) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (error.details.some((detail) => detail.type === 'number.base')) {
      return res.status(400).json({ error: 'Age must be a number' });
    }

    // Default error message
    return res.status(400).json({ error: 'Invalid data provided' });
  }

  const user = users.find(u => u.id === parseInt(id));
  if (user) {
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const deleteUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== parseInt(id));
  res.status(204).send('user successfully deleted');
};

export const listUsers = (req: Request, res: Response) => {
  res.json(users);
};
