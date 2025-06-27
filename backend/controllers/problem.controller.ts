import { Request , Response } from "express";
import Problem from '../models/Problem.ts';
export const getAllProblems = async (req: Request, res: Response) => {
 try {
    const problems = await Problem.find()
      .sort({ createdAt: -1 })
      .limit(10); // Limit to 10 by default

    res.status(200).json(problems);
  } catch (err) {
    console.error('Error fetching problems:', err);
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
};

export const createProblem = async (req: Request, res: Response) => {
  try {
   const {
      title,
      description,
      difficulty,
      inputFormat,
      outputFormat,
      constraints,
      examples,
      hiddenTestCases,
    } = req.body;

    if (!title || !description || !difficulty || !inputFormat || !outputFormat || !examples) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProblem = await Problem.create({
      title,
      description,
      difficulty,
      inputFormat,
      outputFormat,
      constraints,
      examples,
      hiddenTestCases,
    });

    res.status(201).json({ message: 'Problem created successfully', problem: newProblem });
  } catch (err) {
    console.error('Error creating problem:', err);
    res.status(500).json({ error: 'Failed to create problem' });
  }
};
