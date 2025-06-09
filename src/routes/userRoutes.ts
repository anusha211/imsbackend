import express from 'express';
import { getUserById, updateUser, getUsers, createUserWithInternship, getUserDetails } from '../controllers/userControllers';
import { validateRequest } from '../middleware/validaterequest';
import { createUserSchema, updateUserSchema } from '../validation/validation';
import { createInternship, deleteInternship, getInternship, getInternships, getInternshipWithUsers, updateInternship } from '../controllers/internshipControllers';
import { authenticateJWT } from '../middleware/authMiddleware';
import { checkPermissions } from '../middleware/permissionsMiddleware';
import { createUser, editUser,deleteUser } from '../controllers/adminControllers';

export const userRouter = express.Router();



// Internship Routes
userRouter.post('/internships', authenticateJWT,createInternship);
userRouter.get('/internships', authenticateJWT,getInternshipWithUsers);
userRouter.get('/internships/:id',authenticateJWT, getInternship);
userRouter.put('/internships/:id',authenticateJWT, updateInternship);
userRouter.delete('/internships/:id',authenticateJWT, deleteInternship);


userRouter.post('/', validateRequest(createUserSchema), createUser);
userRouter.post('/userwithinternship',createUser);
userRouter.get('/:id',authenticateJWT, getUserDetails);
userRouter.put('/:id',authenticateJWT, editUser);
userRouter.delete('/:id',authenticateJWT,checkPermissions(['DELETE_USER']),deleteUser);
userRouter.get('/',getUsers);
userRouter.post('/admincreate',createUser);
