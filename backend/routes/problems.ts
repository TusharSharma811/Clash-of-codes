 
import express from 'express';
import { createProblem, getAllProblems } from '../controllers/problem.controller.ts';
const router = express.Router();

router.get('/', (req, res) => {
  getAllProblems(req, res);
});

router.post('/', (req, res) => {
  createProblem(req, res);
});

export default router;