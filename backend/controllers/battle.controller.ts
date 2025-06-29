// controllers/battleController.ts
import { Request, Response } from 'express';
import Battle from '../models/Battle';

export const createBattle = async (req: Request, res: Response) => {
  try {
    const { roomId, players, questionId, startedAt } = req.body;

    const existing = await Battle.findOne({ roomId });
    if (existing) return res.status(409).json({ message: "Battle already exists" });

    const battle = await Battle.create({
      roomId,
      players,
      questionId,
      startedAt,
    });

    res.status(201).json({ message: "Battle created", battle });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Failed to create battle", error: err.message });
  }
};
