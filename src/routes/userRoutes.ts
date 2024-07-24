import express from 'express';
import { createUser, getUserById, updateUser, deleteUser, getUsers } from '../controllers/userControllers';
import { validateRequest } from '../middleware/validaterequest';
import { createUserSchema, updateUserSchema } from '../validation/validation';
import { createInternship, deleteInternship, getInternship, getInternships, updateInternship } from '../controllers/internshipControllers';

export const userRouter = express.Router();



// Internship Routes
userRouter.post('/internships', createInternship);
userRouter.get('/internships', getInternships);
userRouter.get('/internships/:id', getInternship);
userRouter.put('/internships/:id', updateInternship);
userRouter.delete('/internships/:id', deleteInternship);


userRouter.post('/', validateRequest(createUserSchema), createUser);
userRouter.get('/:id', getUserById);
userRouter.put('/:id',validateRequest(updateUserSchema), updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.get('/', getUsers);
