import { Schema, model, Document } from 'mongoose';

export interface ITestCase {
  input: string;
  output: string;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  testCases: ITestCase[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const problemSchema = new Schema<IProblem>({
  title: String,
  description: String,
  inputFormat: String,
  outputFormat: String,
  constraints: String,
  sampleInput: String,
  sampleOutput: String,
  testCases: [
    {
      input: String,
      output: String
    }
  ],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' }
});

export default model<IProblem>('Problem', problemSchema);