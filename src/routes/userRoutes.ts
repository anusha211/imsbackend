import express from 'express';
import { createUser, getUserById, updateUser, deleteUser, getUsers, createUserWithInternship } from '../controllers/userControllers';
import { validateRequest } from '../middleware/validaterequest';
import { createUserSchema, updateUserSchema } from '../validation/validation';
import { createInternship, deleteInternship, getInternship, getInternships, getInternshipWithUsers, updateInternship } from '../controllers/internshipControllers';
import { authenticateJWT } from '../middleware/authMiddleware';

export const userRouter = express.Router();



// Internship Routes
userRouter.post('/internships', authenticateJWT,createInternship);
userRouter.get('/internships', authenticateJWT,getInternshipWithUsers);
userRouter.get('/internships/:id',authenticateJWT, getInternship);
userRouter.put('/internships/:id',authenticateJWT, updateInternship);
userRouter.delete('/internships/:id',authenticateJWT, deleteInternship);


userRouter.post('/', validateRequest(createUserSchema), createUser);
userRouter.post('/userwithinternship',authenticateJWT,createUserWithInternship);
userRouter.get('/:id',authenticateJWT, getUserById);
userRouter.put('/:id',authenticateJWT,validateRequest(updateUserSchema), updateUser);
userRouter.delete('/:id',authenticateJWT, deleteUser);
userRouter.get('/', authenticateJWT,getUsers);
