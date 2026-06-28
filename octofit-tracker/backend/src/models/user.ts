import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  team: string;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  team: { type: String, required: true },
  joinedAt: { type: Date, required: true, default: () => new Date() },
});

export default mongoose.model<IUser>('User', userSchema);
