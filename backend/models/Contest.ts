import mongoose, { Document, Schema, Types, model } from 'mongoose';

export interface IContestSubmission {
  user: Types.ObjectId;
  problem: Types.ObjectId;
  code: string;
  language: string;
  passed: boolean;
  submittedAt: Date;
}

export interface IContestProblem {
  problem: Types.ObjectId;
  points: number;
}

export interface IContest extends Document {
  name: string;
  description?: string;
  creator: Types.ObjectId;
  problems: IContestProblem[];
  participants: Types.ObjectId[];
  startTime: Date;
  endTime: Date;
  submissions: IContestSubmission[];
  status: 'upcoming' | 'running' | 'ended';
  createdAt: Date;
  updatedAt: Date;
}

const contestSchema = new Schema<IContest>(
  {
    name: { type: String, required: true },
    description: { type: String },

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    problems: [
      {
        problem: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
        points: { type: Number, default: 100 },
      },
    ],

    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    submissions: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        problem: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
        code: { type: String, required: true },
        language: { type: String, required: true },
        passed: { type: Boolean, required: true },
        submittedAt: { type: Date, default: Date.now },
      },
    ],

    status: {
      type: String,
      enum: ['upcoming', 'running', 'ended'],
      default: 'upcoming',
    },
  },
  {
    timestamps: true,
  }
);

const Contest = model<IContest>('Contest', contestSchema);
export default Contest;
