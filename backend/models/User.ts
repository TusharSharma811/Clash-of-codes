import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  rating: number;
  battles: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rating: { type: Number, default: 1500 },
  battles: [{ type: Schema.Types.ObjectId, ref: 'Battle' }],
}, { timestamps: true });

export default model<IUser>('User', userSchema);