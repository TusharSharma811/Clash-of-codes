// models/Battle.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBattle extends Document {
  roomId: string;
  players: {
    userId: string;
    username: string;
    score: number;
    status: 'pending' | 'won' | 'lost' | 'left';
  }[];
  questionId: string;
  startedAt: Date;
  endedAt?: Date;
  winnerId?: string;
}

const BattleSchema: Schema = new Schema({
  roomId: { type: String, required: true, unique: true },
  players: [
    {
      userId: { type: String, required: true },
      username: { type: String, required: true },
      score: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ['pending', 'won', 'lost', 'left'],
        default: 'pending',
      },
    },
  ],
  questionId: { type: String, required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  winnerId: { type: String },
});

export default mongoose.model<IBattle>('Battle', BattleSchema);
