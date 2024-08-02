import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Internship } from '../models/Internship';
import { createInternshipSchema, updateInternshipSchema } from '../validation/internshipvalidation';

const internshipRepository = AppDataSource.getRepository(Internship);

export const createInternship = async (req: Request, res: Response) => {
    try {
        const { error } = createInternshipSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const internship = internshipRepository.create(req.body);
        await internshipRepository.save(internship);
        res.status(201).json(internship);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getInternships = async (req: Request, res: Response) => {
    console.log('getInternships endpoint hit'); // Debugging log
    try {
         const internshipRepository = AppDataSource.getRepository(Internship);
        const internships = await internshipRepository.find();
        res.json(internships);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getInternship = async (req: Request, res: Response) => {
    try {
        const internship = await internshipRepository.findOne({
            where: { id: parseInt(req.params.id, 10) }
        });

        if (!internship) return res.status(404).json({ message: 'Internship not found' });

        res.json(internship);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateInternship = async (req: Request, res: Response) => {
    try {
        const { error } = updateInternshipSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const internship = await internshipRepository.findOneBy({ id: parseInt(req.params.id, 10) });
        if (!internship) return res.status(404).json({ message: 'Internship not found' });

        internshipRepository.merge(internship, req.body);
        await internshipRepository.save(internship);
        res.json(internship);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteInternship = async (req: Request, res: Response) => {
    try {
        const internship = await internshipRepository.findOneBy({ id: parseInt(req.params.id, 10) });
        if (!internship) return res.status(404).json({ message: 'Internship not found' });

        await internshipRepository.remove(internship);
        res.json({ message: 'Internship deleted' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};


export const getInternshipWithUsers = async (req: Request, res: Response) => {
  
    try {
      // Find all internships with their associated users
      const internships = await internshipRepository.find({
        relations: ['users'],
      });
  
      return res.status(200).json(internships);
    } catch (error) {
      console.error('Error fetching internships with users:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
