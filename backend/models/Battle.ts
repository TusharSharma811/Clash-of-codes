import { Schema, model, Document, Types } from 'mongoose';

export interface ISubmission {
  user: Types.ObjectId;
  code: string;
  language: string;
  passed: boolean;
  time: Date;
}

export interface IBattle extends Document {
  participants: Types.ObjectId[];
  problem: Types.ObjectId;
  status: 'waiting' | 'ongoing' | 'completed';
  winner: Types.ObjectId | null;
  submissions: ISubmission[];
}

const battleSchema = new Schema<IBattle>({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  problem: { type: Schema.Types.ObjectId, ref: 'Problem' },
  status: { type: String, enum: ['waiting', 'ongoing', 'completed'], default: 'waiting' },
  winner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  submissions: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      code: String,
      language: String,
      passed: Boolean,
      time: Date,
    }
  ]
}, { timestamps: true });

export default model<IBattle>('Battle', battleSchema);