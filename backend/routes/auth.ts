 
import express, { Request, Response, NextFunction } from 'express';

import { register , login, getMe } from '../controllers/auth.controller.ts';
import {verifyJwt} from '../middleware/verifyJwt.ts';
const router = express.Router();

router.post('/register', (req: Request, res: Response) => {
  register(req, res);
});

router.post('/login', (req: Request, res: Response) => {
  login(req, res);
});

router.get('/me', verifyJwt, (req: Request, res: Response, next: NextFunction) => {
  getMe(req, res);
});

export default router;
