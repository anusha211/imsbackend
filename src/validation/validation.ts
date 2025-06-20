import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().integer().min(0).required(),
 
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password:Joi.string().min(6).optional(),
  age: Joi.number().integer().min(0).optional(),
  internshipId: Joi.number().integer().min(0).optional(),
});

