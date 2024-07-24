import Joi from 'joi';

export const createInternshipSchema = Joi.object({
    mentorName: Joi.string().min(3).max(255).required(),
    joinedDate: Joi.date().required(),
    completedDate: Joi.date().optional(),
    isCertified: Joi.boolean().required(),
   
    
});

export const updateInternshipSchema = Joi.object({
    mentorName: Joi.string().min(3).max(255).optional(),
    joinedDate: Joi.date().optional(),
    completedDate: Joi.date().optional(),
    isCertified: Joi.boolean().optional(),

  
});
