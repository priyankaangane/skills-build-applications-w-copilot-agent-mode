import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: () => new Date() },
});

export default mongoose.model<ITeam>('Team', teamSchema);
