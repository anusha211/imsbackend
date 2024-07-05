import express from 'express';
import { createUser, getUserById, updateUserById, deleteUserById, listUsers } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', deleteUserById);
userRouter.get('/', listUsers);
